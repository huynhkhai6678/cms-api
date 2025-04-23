export default (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(191),
                allowNull: false,
                unique: true,
            },
            contact: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dob: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gender: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            language: {
                type: DataTypes.STRING,
                defaultValue: 'en',
            },
            email_verified_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            blood_group: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            G6PD: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            allergy: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            food_allergy: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            region_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            marital_status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            race: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ethnicity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nationality: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            religion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            remember_token: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            email_notification: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            time_zone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dark_mode: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            important_notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            clinic_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
            },
            show_all_data: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            clinic_chain_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    User.associate = (models) => {
        User.hasOne(models.Address, {
          foreignKey: 'owner_id',
          constraints: false,
          as: 'address',
          scope: {
            owner_type: 'App\\Models\\User'
          }
        });
    };

    return User;
};