module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCourse';

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
            unique: true
        },
        users_id : {
            type : dataTypes.INTEGER,
            allowNull: false,
        },
        courses_id : {
            type : dataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        update_at: {
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

    const UserCourse = sequelize.define(alias, cols, config);

    // TENGO DUDAS DE QUE EN REALIDAD LLEVE RELACION Y NO SEA LA QUE ESTA COMENTADA

    /*Course.associate = (models) => {
        Course.belongsToMany(models.User, {
            as: 'users', // por que son muchos cursos
            througth: 'user_course',
            foreignKey: 'course_id',
            otherKey: 'users_id'
    };*/

    UserCourse.associate = (models) => {
        UserCourse.belongsTo(models.Courses, {
            as: 'courses' , // por que son muchos cursos
            onDelete: "CASCADE",  // tengo dudas de la relacion y del uso, pero puede ser que sea asi 
            foreignKey: {
                allowNull: true
            }
        });
        UserCourse.belongsTo(models,Users, {
            as: 'users', // por que son muchos usuarios
            onDelete: "CASCADE",  // tengo dudas de la relacion y del uso, pero puede ser que sea asi 
            foreignKey: {
                allowNull: true
            }
        })
    }

    return UserCourse;
}
