export default (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', 
    {
        owner_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true
        },
        owner_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true
        },
        state_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true
        },
        city_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        other_region_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        other_contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        other_address1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        other_address2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        other_country_id: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 1
        }
    },
    {
        tableName: 'addresses',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Address.associate = (models) => {
        Address.belongsTo(models.Clinic, { 
            foreignKey: 'owner_id',
            as: 'clinic'
        });

        Address.belongsTo(models.State, {
            foreignKey: 'state_id',
            as: 'state'
        });
    };

    return Address;
};