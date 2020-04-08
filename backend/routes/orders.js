const express = require("express");
const multer = require("multer");

const Order = require("../models/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


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
  checkAuth,
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const order = new Order({
      status: req.body.status,
      shippingDetail: req.body.shippingDetail,
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      total: req.body.total,
      date: req.body.date,
      orderProducts: req.body.orderProducts,
      paymentMethod: req.body.paymentMethod,
      customerFullName: req.body.customerFullName,
      phone: req.body.phone,
      email: req.body.email,
      shippingAddress: req.body.shippingAddress,
      deliveryNote: req.body.deliveryNote,
      city: req.body.city,
      province: req.body.province,
      postalCode: req.body.postalCode,
    });
    order.save().then(createOrder => {
      res.status(201).json({
        message: "Order added successfully",
        order: {
          ...createOrder,
          id: createdOrder._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const order = new Order({
      _id: req.body.id,
      status: req.body.status,
      shippingDetail: req.body.shippingDetail,
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      total: req.body.total,
      date: req.body.date,
      orderProducts: req.body.orderProducts,
      paymentMethod: req.body.paymentMethod,
      customerFullName: req.body.customerFullName,
      phone: req.body.phone,
      email: req.body.email,
      shippingAddress: req.body.shippingAddress,
      deliveryNote: req.body.deliveryNote,
      city: req.body.city,
      province: req.body.province,
      postalCode: req.body.postalCode,
    });
    console.log(order);
    Order.updateOne({ _id: req.params.id }, order).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Order.find().then(documents => {
    res.status(200).json({
      message: "Orders fetched successfully!",

      orders: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Order.findById(req.params.id).then(order => {
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "order not found!" });
    }
  });
});

// //get one base on the id
// router.get("/:id", (req, res, next) => {
//   Order.findOne({order_id:req.params.id}).then(order => {
//     if (order) {
//       res.status(200).json(order);
//     } else {
//       res.status(404).json({ message: "order not found!" });
//     }
//   });
// });

module.exports = router;
