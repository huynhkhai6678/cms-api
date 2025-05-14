export default (sequelize, DataTypes) => {
    const RoleHasPermission = sequelize.define('RoleHasPermission', {
      role_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
      },
    }, {
      timestamps: false,
      tableName: 'role_has_permissions',
    });
  
    return RoleHasPermission;

  };