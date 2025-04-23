export default (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            default: {
                type: DataTypes.BOOLEAN,
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
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            landing_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            region_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            social_link: {
                type: DataTypes.STRING,
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
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return Doctor;
};