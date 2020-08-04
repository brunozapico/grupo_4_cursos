module.exports = (sequelize, dataTypes) => {
    let alias = 'CartCourse';

    let cols = {
        id : {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
    };

    let config = {
        tableName: 'cart_course',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const CartCourse = sequelize.define(alias, cols, config);

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