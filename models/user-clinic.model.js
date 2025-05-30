export default (sequelize, DataTypes) => {
    const UserClinic = sequelize.define('UserClinic',
        {
            user_id: {
                type: DataTypes.BIGINT(20),
                allowNull: false
            },
            clinic_id: {
                type: DataTypes.BIGINT(20),
                allowNull: false
            },
        },
        {
            tableName: 'user_clinics',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    UserClinic.associate = (models) => {
        UserClinic.belongsTo(models.User, { foreignKey: 'user_id' });
        UserClinic.belongsTo(models.Clinic, { as: 'clinic', foreignKey: 'clinic_id' });
    };

    return UserClinic;
};