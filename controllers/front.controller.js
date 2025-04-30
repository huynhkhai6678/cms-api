import db from '../models/index.js';
import sequelize from 'sequelize';

const getSettingByClinic = async (req, res) => {
  try {
    const clinic = await db.Clinic.findOne({
      where : {
        'landing_name' :  req.query.name
      }
    });

    if (!clinic) return res.status(404).json({ message: 'Invalid clinic' });

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

    // const [doctorCount] = await Doctor.countDoctorByClinicId(clinicId);
    const doctorCount = await db.Doctor.count({
      include: [
        {
          model: db.User,
          required: true,
          include: [
            {
              model: db.UserClinic,
              where: { clinic_id: clinicId },
              required: true
            }
          ]
        }
    ]});

    res.json({
      data : {
        'patients': patientCount,
        'specializations' : specializationCount,
        'services' : serviceCount,
        'doctors' : doctorCount
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const doctors = await db.Doctor.findAll({
      include: [
        {
          model: db.User,
          where: {
            status: 1
          },
          include: [
            {
              model: db.UserClinic,
              where: { clinic_id: clinicId },
              required: true
            }
          ]
        },
        {
          model: db.DoctorSpecialization,
          include: [
            {
              model: db.Specialization
            }
          ]
        }
      ]
    });

    const result = doctors.map(doctor => {
      const user = doctor.User;
      const minSpecialization = doctor.DoctorSpecializations.reduce((min, ds) => {
        if (!min || ds.Specialization.id < min.id) return ds.Specialization;
        return min;
      }, null);
    
      return {
        user_id: user.id,
        doctor_id: doctor.id,
        name: `${user.first_name} ${user.last_name}`,
        specialization: minSpecialization?.name,
        avatar: 'web/media/avatars/male.png' // You can replace this with media file if exists
      };
    });

    res.json({
      data : result
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTopDoctors = async (req, res) => {
  try {
    const clinicId = req.params.clinicId;

    const topDoctors = await db.Doctor.findAll({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Appointments.id')), 'appointmentCount']
        ]
      },
      include: [
        {
          model: db.User,
          where: {
            status: 1
          },
          include: [
            {
              model: db.UserClinic,
              where: { clinic_id: clinicId },
              required: true
            }
          ]
        },
        {
          model: db.DoctorSpecialization,
          include: [
            {
              model: db.Specialization
            }
          ]
        },
        {
          model: db.Appointment,
          attributes: [],
        }
      ],
      group: ['Doctor.id'],
      order: [[sequelize.literal('appointmentCount'), 'DESC']],
      limit: 3,
      subQuery: false,
    });

    const result = topDoctors.map(doctor => {
      const user = doctor.User;
      const minSpecialization = doctor.DoctorSpecializations.reduce((min, ds) => {
        if (!min || ds.Specialization.id < min.id) return ds.Specialization;
        return min;
      }, null);
    
      return {
        user_id: user.id,
        doctor_id: doctor.id,
        name: `${user.first_name} ${user.last_name}`,
        specialization: minSpecialization?.name,
        avatar: 'web/media/avatars/male.png' // To do add file
      };
    });

    res.json({
      data : result
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

const getAllDoctor = async (req, res) => {

}

export default {
  getSettingByClinic,
  getServiceCounter,
  getTopDoctors,
  getDoctors,
  getServices,
  getFaqs,
  getLanding
}