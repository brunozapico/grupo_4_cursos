module.exports = (sequelize, dataTypes) => {

    let alias = 'Course';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER.UNSIGNED, // en la tabla pide mediumint
            allowNull: false
        },
        starts_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        ends_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        vacancies: {
            type: dataTypes.INTEGER.UNSIGNED, //tinyInt
            allowNull: false
        },
        outstanding: {
            type: dataTypes.BOOLEAN, //tinyInt
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
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Category',
                key: 'id'
            }
        },
        professor_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Professor',
                key: 'id'
            }
        },
        // created_at: {
        //     type: dataTypes.DATE,
        //     defaultValue: dataTypes.NOW
        // },
        // updated_at: {
        //     type: dataTypes.DATE
        // }
    };

    let config = {
        tableName: 'courses',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Course = sequelize.define(alias, cols, config);

    Course.associate = (models) => {
        Course.belongsToMany(models.User, {
            as: 'users', //plural porque tiene muchos
            through: 'user_course',
            foreignKey: 'courses_id',
            otherKey: 'user_id'
        });
        Course.belongsTo(models.Category, {
            as: 'category', //singular porque tiene una
            foreignKey: 'category_id',
        });
        Course.hasMany(models.Program, {
            as: 'programs', //singular porque tiene uno
        });
        Course.belongsTo(models.Professor, {
            as: 'professor', //singular porque tiene uno
            foreignKey: 'professor_id',
        });
    };

    return Course;
};