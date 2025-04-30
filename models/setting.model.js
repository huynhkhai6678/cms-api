export default (sequelize, DataTypes) => {
    const Setting = sequelize.define('Setting', 
    {
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        clinic_id: {
            type: DataTypes.BIGINT(0),
            allowNull: true
        },
    },
    {
        tableName: 'settings',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Setting;
};