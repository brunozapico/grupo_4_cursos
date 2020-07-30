module.exports = (sequelize, dataTypes) => {

    let alias = 'Rol';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id_rol: {
            type: dataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
        },
    };

    let config = {
        tableName: 'rols',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id_rol'
        });
    }

    return Rol;
};