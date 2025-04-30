export default (sequelize, DataTypes) => {
    const Subscribe = sequelize.define('Subscribe', 
    {
        email : {
            type: DataTypes.STRING,
            allowNull: false
        },
        subscribe: {
            type: DataTypes.BOOLEAN,
            default: 1
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'subscribes',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Subscribe;
};