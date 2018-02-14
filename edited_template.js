'use strict'


module.exports = function (sequelize, DataTypes) {
    var Campaign_template = sequelize.define("Campaign_template", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        created_by:DataTypes.NUMBER,
        updated_by:  DataTypes.NUMBER ,
        updated_date:  DataTypes.DATE ,
        campaign_id:  DataTypes.STRING ,
        edited_html:  DataTypes.STRING 
    }, {

            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        })
    return Campaign_template;
}






