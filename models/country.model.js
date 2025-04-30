export default (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'countries',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Country;
};