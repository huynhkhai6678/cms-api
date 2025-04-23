import FileUpload from "../utils/fileUpload.js";

import db from '../models/index.js';

const updataLanguage = async (req, res) => {
  const { id } = req.user.data;
  const { language }  = req.body;

  if (!language) {
    res.status(400).json({ error: 'Invalid request' });
  }

  try {
    await db.User.update({language}, { where : { id }});
    res.status(201).json({ message: 'Update user language successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

const updateTheme = async (req, res) => {
  const { id } = req.user.data;
  const { dark_mode }  = req.body;

  try {
    await db.User.update({dark_mode}, { where : { id }}) ;
    res.status(201).json({ message: 'Update user theme successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

const getProfile = async (req, res) => {
  let authUser = req.user.data;
  try {
    const user = await db.User.findByPk(authUser.id, 
      {
        include: [
          { 
            model: db.Address, 
            as: 'address',
            attributes: ['address1', 'address2', 'city_id', 'country_id', 'state_id']
          },
        ],
        attributes: ['first_name', 'last_name', 'email', 'time_zone', 'gender', 'contact', 'region_code', 'dob']
      },
    );

    if (!user) res.status(401).json({ error: 'Invalid request' });

    let countries = await db.Country.findAll({
      attributes : [['id', 'value'],['name', 'label']]
    });
    let cities = [];
    let states = [];

    if (res.address?.country_id) {
      states = await db.State.findAll({
        where : {
          country_id : res.address.country_id
        },
        attributes : [['id', 'value'],['name', 'label']]
      });
    }

    if (res.address?.state_id) {
      states = await db.City.findAll({
        where : {
          state_id : res.address.state_id
        },
        attributes : [['id', 'value'],['name', 'label']]
      });
    }

    res.status(200).json({ 
      data: {
        ...user.address?.dataValues,
        ...user.dataValues
      },
      countries,
      states,
      cities
  });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

const updateProfile = async (req, res) => {
  const upload = FileUpload.getUploadLocation('avatar', 'clinic-' + req.user.data.clinic_id + '-profile');
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send('File upload error.');
    }

    const { first_name, last_name } = req.body;

    console.log(req.body);

    res.status(201).json({ message: 'Update user theme successfully' });
  });
};

export default {
  updataLanguage,
  updateTheme,
  getProfile,
  updateProfile
}