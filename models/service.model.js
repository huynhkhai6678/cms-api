export default (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', 
    {
        category_id : {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        charges: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            default: 1
        },
        status: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            default: 1
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            default: 1
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'services',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Service;
};