export default (sequelize, DataTypes) => {
    const Clinic = sequelize.define('Clinic',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
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
            },
            code: {
                type: DataTypes.STRING(255),
                allowNull: false,
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
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return Clinic;
};