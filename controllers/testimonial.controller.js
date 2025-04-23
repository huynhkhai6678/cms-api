import db from '../models/index.js';


const getFrontTestimonial = async (req, res) => {
  const clinicId = req.params.clinicId;

  try {
    const testominials = await db.Testimonial.findAll({where: {
      clinic_id: clinicId,
    }});

    res.status(200).json({
      data: testominials
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  getFrontTestimonial 
}