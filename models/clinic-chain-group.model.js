export default (sequelize, DataTypes) => {
    const ClinicChainGroup = sequelize.define('ClinicChainGroup',
        {
            clinic_chain_id: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            },
            clinic_id: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            }
        },
        {
            tableName: 'clinic_chain_groups',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    ClinicChainGroup.associate = (models) => {
        
    };

    return ClinicChainGroup;
};