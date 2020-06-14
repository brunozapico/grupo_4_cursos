module.exports = (sequelize, dataTypes) => {
    let alias = 'Program';

    let cols = {
        id : {
            type :dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
        },
        starts_at : {
            type: dataTypes.DATE,
            allowNull: false,
        },
        ends_at : {
            type: dataTypes.DATE,
            allowNull: false,
        },
        days : {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        since : {
            type: dataTypes.TIME,
            allowNull: false,
        },
        up_to : {
            type: dataTypes.TIME,
            allowNull: false,
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
        tableName: 'program',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Program = sequelize.define(alias, cols, config);

    Program.associate = models => {
        Program.hasMany(models.Course, {
            as: 'courses',
            foreignKey: 'program_id'
        });
    };


    return Program;
}