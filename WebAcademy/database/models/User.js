module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(255),
            unique: true,
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    };

    let config = {
        tableName: 'users',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsToMany(models.Course, {
            as: 'courses',
            through: 'user_course',
            foreignKey: 'user_id',
            otherKey: 'courses_id'
        });

        User.hasMany(models.ShoppingCart, {
            as: 'shopping_carts',
            foreignKey: 'user_id'
        });

        User.hasMany(models.Rol, {
            as: 'rol',
            foreignKey: 'user_id_rol'
        });
    };

    return User;
};