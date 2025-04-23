import db from '../models/index.js';

const getCityByState = async (req, res) => {
  const stateId = req.params.id;
  if (!stateId) {
    res.status(401).json({ error: 'Invalid request' });
  }

  try {
    const cities = await db.City.findAll({where: {
      state_id: stateId,
    }});
    
    res.json({
      data: cities
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

export default {
  getCityByState,
}