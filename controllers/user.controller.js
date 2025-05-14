import db from '../models/index.js';
import paginateAndSearch from '../utils/table.js';
import { hashData } from '../utils/hashHelper.js';
import moment from 'moment';

async function get(req, res) {
  try {
    const id = req.params.id;
    const result = await db.User.findByPk(id, {
      include: [
        {
          model: db.Clinic,
          as : 'clinics',
          through: {attributes: []}
        },
      ],
    });

    const clinics = await db.Clinic.findAll();
    const clinicChains = await db.ClinicChain.findAll({
      include: [
        {
          model: db.Clinic,
          as : 'clinics',
          through: {attributes: []}
        },
      ],
    });

    if (!result) {
      return res.json({
        data : null,
        clinics,
        clinic_chains : clinicChains
      });
    }

    const plainResult = result.get({ plain: true });
    res.json({
      data: {
        first_name : plainResult.first_name,
        last_name : plainResult.last_name,
        contact : plainResult.contact,
        region_code : plainResult.region_code,
        email : plainResult.email,
        clinic_chain_id : plainResult.clinic_chain_id,
        clinic_ids : plainResult.clinics.map(clinic => { return clinic.id })
      },
      clinics,
      clinic_chains : clinicChains
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function create(req, res) {
  try {
    const { first_name, last_name, phone, email, password, clinic_chain_id, clinic_ids } = req.body;

    const count = await db.User.count({
      where : {
        email
      }
    });

    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate email' });;
    }

    let pass = await hashData(password);
    const user = await db.User.create({ 
      first_name,
      last_name,
      contact : phone.e164Number.split(req.body.phone.dialCode)[1], 
      region_code : phone.dialCode.substring(1),
      email,
      password,
      clinic_chain_id,
      clinic_id : clinic_ids[0],
      password : pass,
      type: 1,
      email_verified_at : moment().format('YYYY-MM-DD HH:mm:ss')
    });

    await user.setClinics(clinic_ids);
    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = req.params.id;
    const { first_name, last_name, phone, email, password, clinic_chain_id, clinic_ids } = req.body;

    const count = await db.User.count({
      where : {
        email,
        id : {
          [db.Sequelize.Op.ne] : id
        }
      }
    });
    
    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate email' });;
    }

    const user = await db.User.findOne({
      where: { id }
    });

    let pass = await hashData(password);
    if (user) {
      await user.update({ 
        first_name,
        last_name,
        contact : phone.e164Number.split(req.body.phone.dialCode)[1], 
        region_code : phone.dialCode.substring(1),
        email,
        password,
        clinic_chain_id,
        clinic_id : clinic_ids[0],
        password : pass,
      });
      await user.setClinics(clinic_ids);
    }

    res.status(201).json({ message: 'Update clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const user = await db.User.findOne({
      where: { id },
    });

    if (user) {
      await user.setClinics([]);
      await user.destroy();
    }

    res.status(200).json({ message: 'Delete clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function index(req, res) {
  try {
    const result = await paginateAndSearch({
      model: db.User,
      attributes : [
        'id',
        'first_name',
        'last_name',
        'email',
        'created_at',
        'contact',
        'region_code',
        [
          db.Sequelize.literal(`(
            SELECT COUNT(*)
            FROM user_clinics AS c
            WHERE c.user_id = User.id
          )`),
          'total_clinic'
        ]
      ],
      searchFields: [
        'first_name',
        'last_name',
        'email',
        'contact',
        '$clinic_chain.name$',
      ],
      filterFields: ['type', 'clinic_id'],
      include: [
        {
          model: db.ClinicChain,
          as : 'clinic_chain',
          attributes : ['name']
        },
      ],
      query: {
        type: 1,
        clinic_id : { [db.Sequelize.Op.ne]: 1 },
        ...req.query
      },
      allowedOrderFields: ['first_name', 'last_name', 'email', 'contact', 'total_clinic', '$clinic_chain.name$'],
      defaultOrderField: 'created_at',
      defaultOrderDirection: 'DESC',
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  get,
  create,
  update,
  destroy,
  index
}