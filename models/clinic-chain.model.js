export default (sequelize, DataTypes) => {
    const ClinicChain = sequelize.define('ClinicChain',
        {
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }
        },
        {
            tableName: 'clinic_chains',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    ClinicChain.associate = (models) => {
        ClinicChain.belongsToMany(models.Clinic, {
            through: models.ClinicChainGroup,
            foreignKey: 'clinic_chain_id',
            otherKey: 'clinic_id',
            as: 'clinics'
        });

        ClinicChain.hasOne(models.User, {
            foreignKey: 'clinic_chain_id',
        });
    };

    return ClinicChain;
};