module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCourse';

    let cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
        },
        users_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        courses_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'Course',
                key: 'id'
            }
        },
        // created_at: {
        //     type: dataTypes.DATE,
        //     defaultValue: dataTypes.NOW
        // },
        // update_at: {
        //     type: dataTypes.DATE
        // }         
    };

    let config = {
        tableName: 'user_course',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const UserCourse = sequelize.define(alias, cols, config);

    UserCourse.associate = (models) => {
        UserCourse.belongsTo(models.Course, {
            as: 'courses' , // por que son muchos cursos
            foreignKey: 'courses_id'
        });
        UserCourse.belongsTo(models.User, {
            as: 'users', // por que son muchos usuarios
            foreignKey: 'user_id'
        });
    }

    return UserCourse;
}
