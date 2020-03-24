const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath:{ type: String, required: true },
  price:{ type: Number, required: true },
  detail:{ type: String, required: true },
  isDonation:{ type: String, required: true },
  isAlcohol:{ type: String, required: true },
  quantity:{ type: Number, required: true },
  category:{ type: String, required: true },
  isGift:{ type: String, required: true },
  itemComment:{ type: String, required: true },
  sugarLevel:{ type: Number, required: true },
  calorieLevel:{ type: Number, required: true },
  fatLevel:{ type: Number, required: true },
  allergyContent:{ type: String, required: true },
  visibility: { type: String, required: true }
});


module.exports = mongoose.model("Product", productSchema);
