import Clinic from "../models/ClinicModel.js";
import db from '../models/index.js';
import paginateAndSearch from '../utils/table.js';

async function getAllClinics(req, res) {
 
};

async function getClinicById(req, res) {
  
};

async function createClinic(req, res) {
  
};

async function deleteClinic(req, res) {
 
};

async function getClinicList(req, res) {
    try {
        const result = await paginateAndSearch({
          model: db.Clinic,
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
  deleteClinic,
  getClinicList
}