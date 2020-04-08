const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  status:{type:String},
    subtotal:{type:Number},
    tax:{type:Number},
    total:{type:Number},
    date:{type:Date},
    orderProducts:[{
    Id:{type:String},
    productName:{type:String},
    isDonation:{type:String},
    isGift:{type:String},
    comment:{type:String},
    price:{type:Number},
    quantity:{type:Number}

    }],
    paymentMethod:{type:String},
    customerFullName:{type:String},
    phone:{type:String},
    email:{type:String},
    shippingAddress:{type:String},
    deliveryNote:{type:String},
    city:{type:String},
    province:{type:String},
    postalCode:{type:String},
    shippingDetail:{type:String}

},{

    collection: 'orders'
})


module.exports = mongoose.model("Order", orderSchema);
