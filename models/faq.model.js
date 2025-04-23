export default (sequelize, DataTypes) => {
    const Faq = sequelize.define('Faq', 
    {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
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

    return Faq;
};