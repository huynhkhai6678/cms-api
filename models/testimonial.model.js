export default (sequelize, DataTypes) => {
    const Testimonial = sequelize.define('Testimonial', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
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
        tableName: 'front_patient_testimonials',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Testimonial;
};