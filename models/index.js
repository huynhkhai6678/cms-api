import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';
import faqModel from './faq.model.js';
import sliderModel from './slider.model.js';
import serviceModel from './service.model.js';
import testimonialModel from './testimonial.model.js';
import addressModel from './address.model.js';
import countryModel from './country.model.js';
import stateModel from './state.model.js';
import cityModel from './city.model.js';
import settingModel from './setting.model.js';
import enquiryModel from './enquiry.model.js';
import patientModel from './patient.model.js';
import specializationModel from './specialization.model.js';
import subscribeModel from './subscribe.model.js';
import translationInvoiceModel from './translation-invoice.model.js';
import currencyModel from './currency.model.js';
import documentSettingModel from './document-setting.model.js';
import userModel from './user.model.js';
import clinicModel from './clinic.model.js';
import doctorModel from './doctor.model.js';
import roleModel from './role.model.js';
import permissionModel from './permission.model.js';

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
// db.User = userModel(sequelize, Sequelize.DataTypes);

db.Faq = faqModel(sequelize, Sequelize.DataTypes);
db.Slider = sliderModel(sequelize, Sequelize.DataTypes);
db.Service = serviceModel(sequelize, Sequelize.DataTypes);
db.Testimonial = testimonialModel(sequelize, Sequelize.DataTypes);
db.Address = addressModel(sequelize, Sequelize.DataTypes);
db.Country = countryModel(sequelize, Sequelize.DataTypes);
db.State = stateModel(sequelize, Sequelize.DataTypes);
db.City = cityModel(sequelize, Sequelize.DataTypes);
db.Setting = settingModel(sequelize, Sequelize.DataTypes);
db.Enquiry = enquiryModel(sequelize, Sequelize.DataTypes);
db.Patient = patientModel(sequelize, Sequelize.DataTypes);
db.Specialization = specializationModel(sequelize, Sequelize.DataTypes);
db.Subscribe = subscribeModel(sequelize, Sequelize.DataTypes);
db.TranslationInvoice = translationInvoiceModel(sequelize, Sequelize.DataTypes);
db.TranslationInvoiceService = translationInvoiceModel(sequelize, Sequelize.DataTypes);
db.Currency = currencyModel(sequelize, Sequelize.DataTypes);
db.DocumentSetting = documentSettingModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Clinic = clinicModel(sequelize, Sequelize.DataTypes);
db.Doctor = doctorModel(sequelize, Sequelize.DataTypes);
db.Role = roleModel(sequelize, Sequelize.DataTypes);
db.Permission = permissionModel(sequelize, Sequelize.DataTypes);

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js'
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;