export default (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id : {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            },
            experience: {
                type: DataTypes.DOUBLE,
            },
            twitter_url: {
                type: DataTypes.STRING,
            },
            linkedin_url: {
                type: DataTypes.STRING,
            },
            instagram_url: {
                type: DataTypes.STRING,
            }
        },
        {
            tableName: 'doctors',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.User, { foreignKey: 'user_id' });
        Doctor.hasMany(models.DoctorSpecialization, { foreignKey: 'doctor_id'});
        Doctor.hasMany(models.Appointment, { foreignKey: 'doctor_id' });
    };

    return Doctor;
};