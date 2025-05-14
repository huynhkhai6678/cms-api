export default (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission',
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
        },
        {
            tableName: 'permissions',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    Permission.associate = (models) => {
        // Permission.belongsToMany(models.Role, {
        //     through: {
        //         model: 'role_has_permissions',
        //         timestamps: false,
        //     },
        //     foreignKey: 'permission_id',
        //     otherKey: 'role_id',
        // });
    };

    

    return Permission;
};