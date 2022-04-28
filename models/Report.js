//import the MongoDB module 
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//import dotenv module
require('dotenv').config();

//connect the cluster to the schema
mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true });

let Report = new Schema({
    cmdtyName:{type: String, required: true},
    cmdtyID:{type: String, required: true},
    marketID:{type: String, required: true},
    marketName:{type: String, required: true},
    users: [{type: String}],
    priceUnit: {type: String, required: true},
    price: {type: Number, required: true},
},
{timestamps: true}
);



//create a mongodb model with the name 'User' and Schema User
let report = mongoose.model('Report', Report);

//export the model to use it in main files
module.exports = report;