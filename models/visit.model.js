export default (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    visit_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visit_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    region_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    important_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    encounter_id: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    appointment_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    checkout_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinic_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    }
  }, {
    tableName: 'visits',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true, // Enables soft delete using deleted_at
    deletedAt: 'deleted_at',
  });

  // Optional: Define associations here if needed
  Visit.associate = (models) => {
    Visit.belongsTo(models.User, { foreignKey: 'doctor_id', as: 'doctor' });
    Visit.belongsTo(models.User, { foreignKey: 'patient_id', as: 'patient' });
    Visit.belongsTo(models.Clinic, { foreignKey: 'clinic_id', as: 'clinic' });
    Visit.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
  };

  return Visit;
};