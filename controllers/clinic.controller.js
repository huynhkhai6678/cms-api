import Clinic from "../models/ClinicModel.js";
import db from '../models/index.js';
import paginateAndSearch from '../utils/table.js';

async function getAllClinics(req, res) {

};

async function getClinicById(req, res) {
  try {
    const id = req.params.id;
    const result = await db.Clinic.findByPk(id, {
      include: [
        {
          model: db.Address,
          as: 'address'
        },
      ],
    });

    const countries = await db.Country.findAll();
    if (!result) {
      return res.json({
        clinic : null,
        countries,
        states : [],
        cities : []
      });
    }

    const plainResult = result.get({ plain: true });
    const states = await db.State.findAll({
      where : {
        country_id : plainResult.address.country_id
      }
    });
    const cities = await db.City.findAll({
      where : {
        state_id : plainResult.address.state_id
      }
    });

    const clinic = { 
      address1 : plainResult.address.address1,
      address2 : plainResult.address.address2,
      city_id : plainResult.address.city_id,
      country_id : plainResult.address.country_id,
      state_id : plainResult.address.state_id,
      postal_code : plainResult.address.postal_code,
      email : plainResult.email,
      landing_name : plainResult.landing_name,
      type : plainResult.type,
      name: plainResult.name,
      phone: plainResult.phone,
      region_code: plainResult.region_code
    }

    res.json({
      clinic,
      countries,
      states,
      cities
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function createClinic(req, res) {
  try {
    const clinicParams = { 
      name : req.body.name, 
      landing_name : req.body.landing_name, 
      type : req.body.type, 
      email : req.body.email, 
      phone : req.body.phone.e164Number.split(req.body.phone.dialCode)[1], 
      region_code : req.body.phone.dialCode.substring(1),
      social_link : req.body.social_link,
      country_id : req.body.country_id,
      address : { 
        address1: req.body.address1,
        country_id: req.body.country_id,
        address2: req.body.address2,
        state_id: req.body.state_id,
        city_id: req.body.city_id,
        postal_code: req.body.postal_code,
      }
    };

    await db.Clinic.create(clinicParams, {
      include: [
        {
          association: db.Clinic.associations.address
        }
      ]
    });
    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function updateClinic(req, res) {
  try {
    const id = req.params.id;
    const clinic = await db.Clinic.findOne({
      where: { id },
      include: [{ association: db.Clinic.associations.address }]
    });
    
    if (clinic) {
      const clinicParams = { 
        name : req.body.name, 
        landing_name : req.body.landing_name, 
        type : req.body.type, 
        email : req.body.email, 
        phone : req.body.phone.e164Number.split(req.body.phone.dialCode)[1], 
        region_code : req.body.phone.dialCode.substring(1),
        social_link : req.body.social_link,
        country_id : req.body.country_id,
      };
  
      const addressParams = { 
        address1: req.body.address1,
        country_id: req.body.country_id,
        address2: req.body.address2,
        state_id: req.body.state_id,
        city_id: req.body.city_id,
        postal_code: req.body.postal_code
      } 

      // Update clinic
      await clinic.update(clinicParams);
    
      // Update address
      if (clinic.address) {
        await clinic.address.update(addressParams);
      }
    }

    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function deleteClinic(req, res) {
  try {
    const id = req.params.id;
    const clinic = await db.Clinic.findOne({
      where: { id },
      include: [{ association: db.Clinic.associations.address }]
    });

    if (clinic) {
      if (clinic.address) {
        await clinic.address.destroy();
      }
    
      await clinic.destroy();
    }
    res.status(200).json({ message: 'Delete clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function getClinicList(req, res) {
  try {
    const result = await paginateAndSearch({
      model: db.Clinic,
      attributes : [
        'id',
        'name',
        'type',
        'type_text',
        'region_code',
        'phone',
        'created_at'
      ],
      searchFields: [
        'name',
        '$address.address1$',
        '$address.state.name$',
        'phone',
      ],
      filterFields: ['name', 'type'],
      include: [
        {
          model: db.Address,
          as: 'address',
          include: [
            {
              model: db.State,
              as: 'state',
            },
          ],
        },
      ],
      query: req.query,
      allowedOrderFields: ['name', 'address.address1', 'address.state.name', 'created_at'],
      defaultOrderField: 'created_at',
      defaultOrderDirection: 'DESC',
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
  getClinicList
}