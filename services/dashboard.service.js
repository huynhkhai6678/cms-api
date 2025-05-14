import db from '../models/index.js';
import moment from 'moment';
import __ from "../utils/langHelper.js";
import i18next from 'i18next';

async function getUserCardData(user) {
    const doctorCount = await db.User.count({
        include: [
        {
            model: db.UserClinic,
            as: 'user_clinics',
            required: true,
            where: { clinic_id: user.clinic_id },
            include: [
            {
                model: db.Clinic,
                as: 'clinic',
                required: true
            }
            ]
        }],
        where: {
            type: db.User.DOCTOR,
            status: 1
        }
    });

    const patientCount = await db.User.count({
        include: [
        {
            model: db.UserClinic,
            as: 'user_clinics',
            required: true,
            where: { clinic_id: user.clinic_id },
            include: [
            {
                model: db.Clinic,
                as: 'clinic',
                required: true
            }
            ]
        }],
        where: {
            type: db.User.PATIENT,
        }
    });

    const appointmentCount = await db.Appointment.count({
        where: {
            clinic_id: user.clinic_id,
            date : moment().format('YYYY-MM-DD'),
            status: db.Appointment.BOOKED
        }
    });

    const registerCount = await db.User.count({
        include: [
        {
            model: db.UserClinic,
            as: 'user_clinics',
            required: true,
            where: { clinic_id: user.clinic_id },
            include: [
            {
                model: db.Clinic,
                as: 'clinic',
                required: true
            }
            ]
        }],
        where: {
            type: db.User.PATIENT,
            created_at: moment().format('YYYY-MM-DD')
        }
    });

    return {
        doctor_count : doctorCount,
        patient_count : patientCount,
        today_appointment_count : appointmentCount,
        total_registered_patient : registerCount
    };
};

async function getUpcommingAppointmentData(user) {
    let data = {};

    if (user.type === db.User.DOCTOR) {
        const upcomingAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                doctor_id: user.doctor.id,
                date : {
                    [db.Sequelize.Op.gte] : moment().format('YYYY-MM-DD')
                },
                status : {
                    [db.Sequelize.Op.ne] : db.Appointment.CANCELLED
                }
            }
        });

        const todayAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                doctor_id: user.doctor.id,
                date : moment().format('YYYY-MM-DD'),
                status : {
                    [db.Sequelize.Op.ne] : db.Appointment.CANCELLED
                }
            }
        });

        const totalAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                doctor_id: user.doctor.id,
                status : db.Appointment.BOOKED
            }
        });

        data = {
            upcoming_appointments : upcomingAppointmentCount,
            total_appointments : totalAppointmentCount,
            today_appointments : todayAppointmentCount
        }

    } else if (user.type === db.User.PATIENT) {
        const todayAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                doctor_id: user.patient.id,
                date : {
                    [db.Sequelize.Op.gt] : moment().format('YYYY-MM-DD')
                },
            }
        });

        const upcomingAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                doctor_id: user.patient.id,
                date : {
                    [db.Sequelize.Op.gt] : moment().format('YYYY-MM-DD')
                },
            }
        });

        const completedAppointment = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                patient_id: user.patient.id,
                date : moment().format('YYYY-MM-DD'),
                status : {
                    [db.Sequelize.Op.ne] : db.Appointment.CHECK_OUT
                }
            }
        });

        const totalAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                patient_id : user.patient.id
            }
        });

        data = {
            upcoming_appointments : upcomingAppointmentCount,
            today_appointments : todayAppointmentCount,
            completed_appointments : completedAppointment
        }

    } else {
        const upcomingAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
                date : {
                    [db.Sequelize.Op.gt] : moment().format('YYYY-MM-DD')
                },
            }
        });

        const totalAppointmentCount = await db.Appointment.count({
            where: {
                clinic_id: user.clinic_id,
            }
        });

        data = {
            upcoming_appointments : upcomingAppointmentCount,
            total_appointments : totalAppointmentCount
        }
    }
    return data;
};

async function getVisitCard(user) {
    if (user.type === db.User.PATIENT || user.type === db.User.DOCTOR) {
        return null;
    }

    const startDay = moment().startOf('day').toDate();
    const endDay = moment().endOf('day').toDate();
    const startMonth = moment().startOf('month').toDate();
    const endMonth = moment().endOf('month').toDate();
    const startYear = moment().startOf('year').toDate();
    const endYear = moment().endOf('year').toDate();

    const visits = await db.Visit.findAll({
        where : {
            clinic_id : user.clinic_id,
            created_at: {
                [db.Sequelize.Op.between]: [
                    startYear,
                    endYear
                ]
            }
        }
    });

    const today = visits.filter(v => {
        const created = moment(v.created_at);
        return created.isBetween(startDay, endDay, null, '[]');
    }).length;

    const thisMonth = visits.filter(v => {
        const created = moment(v.created_at);
        return created.isBetween(startMonth, endMonth, null, '[]');
    }).length;

    const thisYear = visits.length;

    return {
        today,
        this_month: thisMonth,
        this_year: thisYear
    };
};

async function getAdminRevenueData(user, req) {
    const yearStart = moment().startOf('year').format('YYYY-MM-DD');
    const yearEnd = moment().endOf('year').format('YYYY-MM-DD');

    const { serviceId = '', clinicId = '' } = req.body || {};
    let filters = `t.status = 1 AND t.created_at BETWEEN '${yearStart}' AND '${yearEnd}'`;

    if (serviceId) {
        filters += ` AND a.service_id = ${serviceId}`;
    }

    if (clinicId) {
        filters += ` AND t.clinic_id = ${clinicId}`;
    }

    const query = `
        SELECT 
        MONTH(t.created_at) as month, 
        SUM(t.amount) as total
        FROM transactions t
        LEFT JOIN appointments a ON t.appointment_id = a.id
        LEFT JOIN services s ON a.service_id = s.id
        WHERE ${filters}
        GROUP BY MONTH(t.created_at)
    `;

    const results = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });

    const months = {
        1: __('months.jan'),
        2: __('months.feb'),
        3: __('months.mar'),
        4: __('months.apr'),
        5: __('months.may'),
        6: __('months.jun'),
        7: __('months.jul'),
        8: __('months.aug'),
        9: __('months.sep'),
        10: __('months.oct'),
        11: __('months.nov'),
        12: __('months.dec'),
    };

    const revenue = {};
    Object.values(months).forEach(name => (revenue[name] = 0));

    results.forEach(row => {
        const name = months[row.month];
        revenue[name] = parseFloat(row.total);
    });
    return revenue;
};

export default {
  getUserCardData,
  getUpcommingAppointmentData,
  getVisitCard,
  getAdminRevenueData
}