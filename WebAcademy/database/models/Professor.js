module.exports = (sequelize, dataTypes) => {

    let alias = 'Professor';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        profession: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };

    let config = {
        tableName:'professors',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };
    
    const Professor = sequelize.define(alias, cols, config);

    Professor.associate = models => {
        Professor.hasMany(models.Course, {
            as: 'courses',
            foreignKey: 'professor_id'
        });
    };

    return Professor;
};