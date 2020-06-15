module.exports = (sequelize, dataTypes) => {
    let alias = 'CartCourse';

    let cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
            unique: true
        },
        course_id: {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'Course',
                key: 'id'
            }
        },
        shopping_cart_id: {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'ShoppingCart',
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
        tableName: 'cart_course',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const CartCourse = sequelize.define(alias, cols, config);

     // TENGO DUDAS DE QUE EN REALIDAD LLEVE RELACION Y NO SEA LA QUE ESTA COMENTADA

    /*Course.associate = (models) => {
        Course.belongsToMany(models.ShoppingCart, {
            as: 'shopping_carts', // por que son muchos cursos
            througth: 'cart_courses',
            foreignKey: 'course_id',
            otherKey: 'shshopping_cart_id'
    }; */

    CartCourse.associate = (models) => {
        CartCourse.belongsTo(models.Course, {
            as: 'courses',
            // onDelete: "CASCADE",  // tengo dudas de la relacion y del uso, pero puede ser que sea asi 
            foreignKey: 'course_id'
        });
        CartCourse.belongsTo(models.ShoppingCart, {
            as: 'shopping_cart',
            // onDelete: "CASCADE",  // tengo dudas de la relacion y del uso, pero puede ser que sea asi 
            foreignKey: 'shopping_cart_id'
        });
    };

    return CartCourse;
}