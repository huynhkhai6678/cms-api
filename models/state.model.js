export default (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country_id: {
            type: DataTypes.BIGINT(0),
            allowNull: false
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Country;
};