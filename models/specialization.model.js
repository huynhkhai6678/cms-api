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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Specialization;
};