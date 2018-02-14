// var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

// var daily_send_schema = new mongoose.Schema({
//    id: {type : Number},
//    created_by: {type : Number},
//    updated_by: {type : Number},
//    updated_date:{type : Date ,default: Date.now()},
//    sunday:{type : Boolean},
//    monday:{type : Boolean},
//    tuesday:{type : Boolean},
//    wednesday:{type : Boolean},
//    thursday:{type : Boolean},
//    friday:{type : Boolean},
//    saturday:{type : Boolean}
  
// },{
//     versionKey: false // You should be aware of the outcome after set to false
// });
// autoIncrement.initialize(mongoose);
// daily_send_schema.plugin(autoIncrement.plugin,{ model: 'daily_send', startAt: 1 });
// module.exports = mongoose.model('daily_send', daily_send_schema);
