module.exports = (sequelize, dataTypes) => {
    let alias = 'CartCourse';

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
            unique: true
        },
        course_id: {
            type : dataTypes.INTEGER,
            allowNull: false,
        },
        shopping_cart_id: {
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
        CartCourse.belongsToMany(models.Courses, {
            as: 'courses', // por que son muchos cursos
            onDelete: "CASCADE",  // tengo dudas de la relacion y del uso, pero puede ser que sea asi 
            foreignKey: {
                allowNull: true
            }
        });
        CartCourse.belongsToMany(models,ShoppingCart, {
            as: 'shopping_cart', // por que son muchos shopping cart
            onDelete: "CASCADE",  // tengo dudas de la relacion y del uso, pero puede ser que sea asi 
            foreignKey: {
                allowNull: true
            }
        })
    };

    return CartCourse;
}