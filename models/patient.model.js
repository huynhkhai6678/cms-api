export default (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', 
    {
        patient_unique_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patient_mrn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        template_id: {
            type: DataTypes.BIGINT(20),
        },
        qr_code: {
            type: DataTypes.STRING,
            default: 1
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Patient;
};