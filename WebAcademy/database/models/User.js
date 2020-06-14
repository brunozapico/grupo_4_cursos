module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
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
        },
        created_at: {
            type: dataTypes.DATE,
        defaultValue: dataTypes.NOW
        },
        updated_ap: {
            type: dataTypes.DATE
        }
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
        User.hasMany(models.Course, {
            as: 'courses', //plural porque tiene muchos
        });
    }

    return User;
};