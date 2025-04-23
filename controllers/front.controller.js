import Doctor from "../models/DoctorModel.js";
import Clinic from "../models/ClinicModel.js";

import db from '../models/index.js';


const getSettingByClinic = async (req, res) => {
  try {
    const [clinics] = await Clinic.getClinicByLandingName(req.query.name);

    if (!clinics.length) return res.status(404).json({ message: 'Invalid clinic' });

    const clinic = clinics[0];
    const settings = await db.Setting.findAll({where: {
      clinic_id: clinic.id,
    }});

    let data = {};
    settings.forEach(setting => {
      data[setting.key] = setting.value;
    });
    data['clinic_id'] = clinic.id;

    res.json({
      data: data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServiceCounter = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;

    const patientCount = await db.User.count({
      where: {
        type: 3,
        clinic_id: clinicId
      },
    });

    const specializationCount = await db.Specialization.count({
      where: {
        clinic_id: clinicId
      },
    });

    const serviceCount = await db.Service.count({
      where: {
        status: 1,
        clinic_id: clinicId
      },
    });

    const [doctorCount] = await Doctor.countDoctorByClinicId(clinicId);

    res.json({
      data : {
        'patients': patientCount,
        'specializations' : specializationCount,
        'services' : serviceCount,
        'doctors' : doctorCount[0].doctorCount
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const [doctors] = await Doctor.getFrontDoctorByClinicId(clinicId);

    res.json({
      data : doctors
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getTopDoctors = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const [doctors] = await Doctor.getFrontDoctorByClinicId(clinicId);

    res.json({
      data : doctors
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const services = await db.Service.findAll({where: {
      clinic_id: clinicId,
    }});

    res.json({
      data : services
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getFaqs = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const faqs = await db.Faq.findAll({where: {
      clinic_id: clinicId,
    }});

    res.json({
      data : faqs
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLanding = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const slider = await db.Slider.findOne({where: {
      clinic_id: clinicId,
    }});
    const services = await db.Slider.findAll({where: {
      clinic_id: clinicId,
    }});

    res.json({
      slider : slider,
      services : services
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getSettingByClinic,
  getServiceCounter,
  getTopDoctors,
  getDoctors,
  getServices,
  getFaqs,
  getLanding
}