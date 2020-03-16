var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var orders_schema = new mongoose.Schema({
    "Name":String
  }, { collection : 'Orders' })
  var orders_data = mongoose.model('orders_data', orders_schema);

router.get('/order',function(req,res,next){
    orders_data.find(function(err,data){
        res.json(orders_data)
    })
})




// Make this available to our other files
module.exports = orders_data;