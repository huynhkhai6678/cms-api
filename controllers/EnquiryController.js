import Enquiry from "../models/EnquiryModel.js";

const createEnquiry = async (req, res) => {
  const { name, email, phone, subject, message, clinic_id } = req.body;
  try {
    await Enquiry.createEnquiry(name, email, phone, subject, message, clinic_id);
    res.status(201).json({ message: 'Clinic created successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  createEnquiry 
}