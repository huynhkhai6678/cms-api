import db from '../models/index.js';
import dashboardService from '../services/dashboard.service.js';

async function index(req, res) {
  try {
    const user = await db.User.findByPk(req.user.data.id, {
      include : [
        {
          model: db.Doctor,
          as: 'doctor',
        },
        {
          model: db.Patient,
          as: 'patient',
        }
      ]
    });

    const user_card = await dashboardService.getUserCardData(user);
    const appointment_card = await dashboardService.getUpcommingAppointmentData(user);
    const visit_card = await dashboardService.getVisitCard(user);

    res.json({
      data: {
        user_card,
        appointment_card,
        visit_card
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function adminRevenue(req, res) {
  try {
    const user = await db.User.findByPk(req.user.data.id, {
      include : [
        {
          model: db.Doctor,
          as: 'doctor',
        },
        {
          model: db.Patient,
          as: 'patient',
        }
      ]
    });

    const data = await dashboardService.getAdminRevenueData(user, req);
    
    res.json({
      data: data,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  index,
  adminRevenue
}