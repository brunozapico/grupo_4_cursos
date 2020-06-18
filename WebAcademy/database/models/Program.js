module.exports = (sequelize, dataTypes) => {
    let alias = 'Program';
    
    let cols = {
        id : {
            type :dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
        },
        days : {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        since_time : {
            type: dataTypes.TIME,
            allowNull: false,
        },
        up_to_time : {
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
        tableName: 'programs',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    
    const Program = sequelize.define(alias, cols, config);
    
    Program.associate = models => {
        Program.hasMany(models.Course, {
            as: 'courses', //singular porque tiene un id de programa unico
            foreignKey: 'program_id'
        });
    };
    
    return Program;
}