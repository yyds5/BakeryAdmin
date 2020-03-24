const express = require("express");
const multer = require("multer");

const Product = require("../models/product");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
      name: req.body.name,
      imagePath: url + "/images/" + req.file.filename,
      price: req.body.price,
      detail: req.body.detail,
      isDonation: req.body.isDonation,
      isAlcohol: req.body.isAlcohol,
      quantity: req.body.quantity,
      category: req.body.category,
      isGift: req.body.isGift,
      itemComment: req.body.itemComment,
      sugarLevel:req.body.sugarLevel,
      calorieLevel: req.body.calorieLevel,
      fatLevel:req.body.fatLevel,
      allergyContent: req.body.allergyContent,
      visibility: req.body.visibility

    });
    product.save().then(createdProduct => {
      res.status(201).json({
        message: "Product added successfully",
        product: {
          ...createdProduct,
          id: createdProduct._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const product = new Product({
      _id: req.body.id,
      imagePath: imagePath,
      name: req.body.name,
      price: req.body.price,
      detail: req.body.detail,
      isDonation: req.body.isDonation,
      isAlcohol: req.body.isAlcohol,
      quantity: req.body.quantity,
      category: req.body.category,
      isGift: req.body.isGift,
      itemComment: req.body.itemComment,
      sugarLevel:req.body.sugarLevel,
      calorieLevel: req.body.calorieLevel,
      fatLevel:req.body.fatLevel,
      allergyContent: req.body.allergyContent,
      visibility: req.body.visibility

    });
    console.log(product);
    Product.updateOne({ _id: req.params.id }, product).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Products fetched successfully!",
      products: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "product not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "product deleted!" });
  });
});

module.exports = router;
