'use strict'


module.exports = function (sequelize, DataTypes) {
    var recipients = sequelize.define("recipients", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        created_by:  DataTypes.NUMBER,
        updated_by:  DataTypes.NUMBER,
        updated_date: DataTypes.DATE ,
        list_id:Schema.Types.DataTypes.NUMBER ,
        list_is_active:DataTypes.BOOLEAN,
        list_name : DataTypes.STRING,
        recipient_count:DataTypes.NUMBER

    }, {

            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        })
        return recipients;
}






