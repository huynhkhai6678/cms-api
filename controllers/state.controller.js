import db from '../models/index.js';

const stateByCountry = async (req, res) => {
  const countryId = req.params.id;

  if (!countryId) {
    res.status(401).json({ error: 'Invalid request' });
  }

  try {
    const states = await db.State.findAll({where: {
      country_id: countryId,
    }});

    res.json({
      data: states
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

export default {
  stateByCountry
}