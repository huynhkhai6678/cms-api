export default (sequelize, DataTypes) => {
    const Role = sequelize.define('Role',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(191),
                allowNull: false,
            },
            display_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            is_default: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            guard_name: {
                type: DataTypes.STRING(191),
                allowNull: false,
                defaultValue: 'web'
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            clinic_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
            },
        },
        {
            tableName: 'roles',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    Role.associate = (models) => {
        Role.belongsToMany(models.Permission, {
            through: models.RoleHasPermission,
            foreignKey: 'role_id',
            otherKey: 'permission_id',
            as: 'permissions'
        });
    };

    return Role;
};