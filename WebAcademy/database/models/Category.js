module.exports = (sequelize, dataTypes) => {

    let alias = 'Category';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        icon: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(255),
            allowNull: false,
        }
    };

    let config = {
        tableName:'categories',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };
    
    const Category = sequelize.define(alias, cols, config);

    Category.associate = models => {
        Category.hasMany(models.Course, {
            as: 'courses',
            // foreignKey: 'category_id'
        });
    };

    return Category;
};