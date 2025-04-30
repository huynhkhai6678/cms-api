import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';
import fs  from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: true,
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


const files = fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.model.js')
  );
});

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  const fileUrl = pathToFileURL(fullPath).href;
  const modelModule = await import(fileUrl);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;