import Setting from "../models/SettingModel.js";
import Patient from "../models/PatientModel.js";
import Specialization from "../models/SpecializationModel.js";
import Service from "../models/ServiceModel.js";
import Doctor from "../models/DoctorModel.js";
import Faq from "../models/FaqModel.js";
import Clinic from "../models/clinicModel.js";
import Slider from "../models/SliderModel.js";


const getSettingByClinic = async (req, res) => {
  try {
    const [clinics] = await Clinic.getClinicByLandingName(req.query.name);

    if (!clinics.length) return res.status(404).json({ message: 'Invalid clinic' });

    const clinic = clinics[0];
    const [settings] = await Setting.getAllSettingByClinic(clinic.id);

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

    const [patientCount] = await Patient.countPatientByClinicId(clinicId);
    const [specializationCount] = await Specialization.countSpecializationByClinicId(clinicId);
    const [serviceCount] = await Service.countServiceByClinicId(clinicId);
    const [doctorCount] = await Doctor.countDoctorByClinicId(clinicId);

    res.json({
      data : {
        'patients': patientCount[0].patientCount,
        'specializations' : specializationCount[0].specializationCount,
        'services' : serviceCount[0].serviceCount,
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
    const [doctors] = await Service.getServiceByClinic(clinicId);

    res.json({
      data : doctors
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getFaqs = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const [faqs] = await Faq.getFaqForClinic(clinicId);

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
    const [slider] = await Slider.getSliderForClinic(clinicId);
    const [services] = await Service.getServiceByClinic(clinicId);

    res.json({
      slider : slider[0],
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