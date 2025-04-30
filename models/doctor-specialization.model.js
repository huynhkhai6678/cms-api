export default (sequelize, DataTypes) => {
    const DoctorSpecialization = sequelize.define('DoctorSpecialization',
        {
            doctor_id: {
                type: DataTypes.BIGINT(20),
                allowNull: false
            },
            specialization_id: {
                type: DataTypes.BIGINT(20),
                allowNull: false
            },
        },
        {
            tableName: 'doctor_specialization',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    DoctorSpecialization.associate = (models) => {
        DoctorSpecialization.belongsTo(models.Doctor, { foreignKey: 'doctor_id'});
        DoctorSpecialization.belongsTo(models.Specialization, { foreignKey: 'specialization_id'});
    };

    return DoctorSpecialization;
};