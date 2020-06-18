module.exports = (sequelize, dataTypes) => {
    let alias = 'Tip';

    let cols = {
        id : {
            type :dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
        },
        title : {
            type: dataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        description : {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        icon : {
            type: dataTypes.STRING(100),
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
        tableName: 'tips',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Tip = sequelize.define(alias, cols, config);

    return Tip;
}