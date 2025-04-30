export default (sequelize, DataTypes) => {
    const Currency = sequelize.define('Currency', 
    {
        currency_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency_icon: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currency_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'currencies',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Currency;
};