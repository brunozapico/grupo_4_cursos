module.exports = (sequelize, dataTypes) => {

    let alias = 'ShoppingCart';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        status: {
            type: dataTypes.BOOLEAN, // TINYINT(1)
            allowNull: false,
            defaultValue: 1,
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        
    };

    let config = {
        tableName:'shopping_cart',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };
    
    const ShoppingCart = sequelize.define(alias, cols, config);

    ShoppingCart.associate = models => {
        ShoppingCart.hasMany(models.CartCourse, {
            as: 'cart_courses',
            foreignKey: 'shopping_cart_id'
        });

        ShoppingCart.belongsTo(models.User, {
            as:'user',
            foreignKey: 'user_id'
        })
    };

    return ShoppingCart;
};