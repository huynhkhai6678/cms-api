import Clinic from "../models/ClinicModel.js";

async function getAllClinics(req, res) {
  try {
    const [users] = await Clinic.getAllClinics();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function getClinicById(req, res) {
  try {

    const clinicId = 0;
    let clinic = null;
    if (clinicId) {
      const [clinic] = await Clinic.getClinicById(req.params.id);

      if(!clinic.length) {
        res.status(401).json({ error: 'Invalid request' });
      }
      clinic = clinic[0];
    }

    const [countries] = await Country.getAllCountry();
    
    res.json({
      clinic,
      countries : countries
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function createClinic(req, res) {
  const { name, email } = req.body;
  try {
    await Clinic.createClinic(name, email);
    res.status(201).json({ message: 'Clinic created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function deleteClinic(req, res) {
  try {
    await Clinic.deleteClinic(req.params.id);
    res.json({ message: 'Clinic deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function getClinicList(req, res) {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        let response = await Clinic.getClinicList(page, limit, search);
        res.json(response);
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