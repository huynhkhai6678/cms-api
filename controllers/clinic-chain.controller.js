import db from '../models/index.js';
import paginateAndSearch from '../utils/table.js';

async function get(req, res) {
  try {
    const id = req.params.id;
    const result = await db.ClinicChain.findByPk(id, {
      include: [
        {
          model: db.Clinic,
          as : 'clinics',
          through: {attributes: []}
        },
      ],
    });

    const clinics = await db.Clinic.findAll();

    if (!result) {
      return res.json({
        data : null,
        clinics,
      });
    }

    const plainResult = result.get({ plain: true });

    res.json({
      data: {
        name : plainResult.name,
        clinic_ids : plainResult.clinics.map(clinic => { return clinic.id })
      },
      clinics,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function create(req, res) {
  try {
    const { name, clinic_ids } = req.body;
    const count = await db.ClinicChainGroup.count({
      where : { 
        clinic_id : clinic_ids
      }
    });

    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate clinic id' });;
    }

    const clinicChain = await db.ClinicChain.create({ name });
    await clinicChain.setClinics(clinic_ids);
    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = req.params.id;
    const { name, clinic_ids } = req.body;

    const count = await db.ClinicChainGroup.count({
      where : {
        clinic_chain_id :  {
          [db.Sequelize.Op.ne] : id
        },
        clinic_id : clinic_ids
      }
    });

    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate clinic id' });;
    }

    const clinicChain = await db.ClinicChain.findOne({
      where: { id }
    });

    if (clinicChain) {
      await clinicChain.update({name});
      await clinicChain.setClinics(clinic_ids);
    }

    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const clinicChain = await db.ClinicChain.findOne({
      where: { id },
    });

    if (clinicChain) {
      await clinicChain.destroy();
      await clinicChain.setClinics([]);
    }

    res.status(200).json({ message: 'Delete clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function index(req, res) {
  try {
    const result = await paginateAndSearch({
      model: db.ClinicChain,
      attributes : [
        'id',
        'name',
        'created_at'
      ],
      searchFields: [
        'name',
      ],
      filterFields: ['name'],
      include: [
        {
          model: db.Clinic,
          as : 'clinics',
          through: {attributes: []}
        },
      ],
      query: req.query,
      allowedOrderFields: ['name'],
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