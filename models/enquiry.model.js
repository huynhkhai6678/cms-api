export default (sequelize, DataTypes) => {
    const Enquiry = sequelize.define('Enquiry', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        view: {
            type: DataTypes.BOOLEAN,
            default: 0
        },
        region_code: {
            type: DataTypes.TEXT,
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'enquiries',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Enquiry;
};