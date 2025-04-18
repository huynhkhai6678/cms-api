import Testimonial from "../models/TestimonialModel.js";

const getFrontTestimonial = async (req, res) => {
  const clinicId = req.params.clinicId;

  try {
    const [testominials] = await Testimonial.getTestimonialByClinic(clinicId);

    res.status(200).json({
      data: testominials,
      message: 'Get data successfully' 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  getFrontTestimonial 
}