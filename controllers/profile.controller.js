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
        attributes: ['first_name', 'last_name', 'email', 'time_zone', 'gender', 'contact', 'region_code', 'dob', 'blood_group']
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
        contact: `${user.contact}`,
        region_code: `${user.region_code}`,
        dob: user.dob,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        blood_group: parseInt(user.blood_group),
        time_zone: parseInt(user.time_zone),
        address1: user.address?.address1,
        address2: user.address?.address2,
        country_id: user.address?.country_id,
        state_id: user.address?.state_id,
        city_id: user.address?.city_id,
        postal_code: user.address?.postal_code,
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
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).send('File upload error.');
    }

    let user = await db.User.findByPk(req.user.data.id);
    const { first_name, last_name, email, region_code, contact, time_zone, dob, blood_group, gender } = req.body;
    const { address1, address2, country_id, state_id, city_id, postal_code } = req.body;

    const userParams = { first_name, last_name, email, time_zone, dob, blood_group, gender, region_code, contact };
    const addressParams = { address1, address2, country_id, state_id, city_id, postal_code };


    console.log(userParams);
    user.set(userParams);
    user.save();

    console.log(user.Address);


    res.status(201).json({ message: 'Update user theme successfully' });
  });
};

export default {
  updataLanguage,
  updateTheme,
  getProfile,
  updateProfile
}