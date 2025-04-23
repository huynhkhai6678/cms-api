export default (sequelize, DataTypes) => {
    const City = sequelize.define('City', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state_id: {
            type: DataTypes.BIGINT(0),
            allowNull: true
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return City;
};