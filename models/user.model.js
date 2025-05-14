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
                defaultValue: '',
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
                defaultValue: '',
            },
            ethnicity: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
            },
            id_type: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
            },
            id_number: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
            },
            nationality: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
            },
            religion: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
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
                defaultValue: true,
            },
            clinic_chain_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
        },
        {
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    User.ADMIN = 1;
    User.DOCTOR = 2;
    User.PATIENT = 3;
    User.STAFF = 4;
    User.SUPER_ADMIN = 5;

    User.associate = (models) => {
        User.hasOne(models.Address, {
          foreignKey: 'owner_id',
          constraints: false,
          as: 'address',
          scope: {
            owner_type: 'App\\Models\\User'
          }
        });

        User.belongsTo(models.ClinicChain, { 
            foreignKey: 'clinic_chain_id',
            as : 'clinic_chain'
        });

        User.hasMany(models.UserClinic, { 
            foreignKey: 'user_id',
            as : 'user_clinics'
        });

        User.hasOne(models.Doctor, { 
            foreignKey: 'user_id',
            as : 'doctor'
        });

        User.hasOne(models.Patient, { 
            foreignKey: 'user_id',
            as : 'patient'
        });

        User.belongsToMany(models.Clinic, {
            through: models.UserClinic,
            foreignKey: 'user_id',
            otherKey: 'clinic_id',
            as: 'clinics'
        });
    };

    return User;
};