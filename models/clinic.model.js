export default (sequelize, DataTypes) => {
    const CATEGORY_GENERAL = 1;
    const CATEGORY_DENTAL = 2;
    const CATEGORY_SPECIALIST = 3;

    const CATEGORIES = {
        [CATEGORY_GENERAL]: 'General Practice',
        [CATEGORY_DENTAL]: 'Dental',
        [CATEGORY_SPECIALIST]: 'Specialist',
    };

    const Clinic = sequelize.define('Clinic',
        {
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            default: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue : false,
            },
            code: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue : '',
            },
            landing_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            region_code: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            social_link: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            country_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            type: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            type_text: {
                type: DataTypes.VIRTUAL,
                get() {
                  return CATEGORIES[this.getDataValue('type')];
                }
            }
        },
        {
            tableName: 'clinics',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    Clinic.associate = (models) => {
        Clinic.hasOne(models.Address, {
            foreignKey: 'owner_id',
            constraints: false,
            as: 'address',
            scope: {
              owner_type: 'App\\Models\\Clinic'
            }
        });
        Clinic.belongsToMany(models.ClinicChain, {
            through: models.ClinicChainGroup,
            foreignKey: 'clinic_id',
            otherKey: 'clinic_chain_id',
        });
    };

    return Clinic;
};