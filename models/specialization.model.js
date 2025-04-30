export default (sequelize, DataTypes) => {
    const Specialization = sequelize.define('Specialization', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'specializations',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Specialization.associate = (models) => {
        Specialization.hasMany(models.DoctorSpecialization, { foreignKey: 'specialization_id'});
    };

    return Specialization;
};