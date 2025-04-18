import Subscribe from "../models/SubscribeModel.js";

const createSubcriber = async (req, res) => {
  const { email, clinic_id } = req.body;
  try {
    await Subscribe.createSubscribe(email, clinic_id);
    res.status(201).json({ message: 'Subscribe created successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {
  createSubcriber 
}