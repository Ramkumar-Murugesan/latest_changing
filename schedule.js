// var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
// var Schema = mongoose.Schema;

// var schedule_schema = new mongoose.Schema({
//    id: {type : Number},
//    created_by: {type : Number},
//    updated_by: {type : Number},
//    updated_date:{type : Date ,default: Date.now()},
//    hour:{type : Number},
//    daily_send:{type:Schema.Types.Number , ref:'daily_send'},
//    weekly_send_day:{type: String},
//    monthly_send_date : {type:Number},


// },{
//     versionKey: false // You should be aware of the outcome after set to false
// });
// autoIncrement.initialize(mongoose);
// schedule_schema.plugin(autoIncrement.plugin,{ model: 'schedule', startAt: 1 });
// module.exports = mongoose.model('schedule', schedule_schema);
