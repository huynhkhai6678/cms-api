import Clinic from "../models/clinicModel.js";

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
    const [user] = await Clinic.getClinicById(req.params.id);
    if (user.length === 0) return res.status(404).json({ message: 'Clinic not found' });
    res.json(user[0]);
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