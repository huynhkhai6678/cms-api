export default (sequelize, DataTypes) => {
    const Slider = sequelize.define('Slider', 
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 1
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

    return Slider;
};