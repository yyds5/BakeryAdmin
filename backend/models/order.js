const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order_id: { type: String, required: true },
  shipping_id: { type: String, required: false },
  status: { type: String, required: true },
  customer_id: { type: String, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: String},
  orderProductId:  { type: Array },
  orderProductName: { type: Array},
  orderProductIsDonation: { type: Array},
  orderProductIsGift: { type: Array},
  orderProductComment: { type: Array},
  orderProductQuantity: { type: Array},
  orderProductPrice:{ type: Array}
})

module.exports = mongoose.model("Order", orderSchema);
