module.exports = (sequelize, dataTypes) => {

    let alias = 'Course';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        price: {
            type: dataTypes.INTEGER.UNSIGNED, // en la tabla pide mediumint
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
            //unique: true, //el avatar de users es unique , pero este no.
        },
        vacancies: {
            type: dataTypes.INTEGER.UNSIGNED, //tinyInt
            allowNull: false
        },
        outstanding: {
            type: dataTypes.INTEGER.UNSIGNED, //tinyInt
            allowNull: false,
            defaultValue: 0
        },
        description_short: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        description_full: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        categorie_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        schedule_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        professor_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        updated_at: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: 'courses',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const User = sequelize.define(alias, cols, config);

    Course.associate = (models) => {
        Course.belongsToMany(models.User, {
            as: 'users', //plural porque tiene muchos
            througth: 'user_course',
            foreignKey: 'user_id',
            otherKey: 'course_id'
        });
        Course.belongsTo(models.Category, {
            as: 'category', //singular porque tiene una
            foreignKey: 'category_id',
        });
        Course.belongsTo(models.Schedule, {
            as: 'schedule', //singular porque tiene uno
            foreignKey: 'schedule_id',
        });
        Course.belongsTo(models.Professor, {
            as: 'professor', //singular porque tiene uno
            foreignKey: 'professor_id',
        });
    };

    return User;
};