export default (sequelize, DataTypes) => {
    const State = sequelize.define('State', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'states',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    State.associate = (models) => {
        State.hasMany(models.Address, { foreignKey: 'state_id' });
    };

    return State;
};