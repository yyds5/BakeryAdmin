var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://yuhe:yuan@bakery-tijpa.mongodb.net/Bakery?retryWrites=true&w=majority',['Products']);



//Get all products
router.get('/products', function(req, res, next){
    db.Products.find(function(err, products){
        if(err){
            res.send(err);
        }else{
        res.json(products);
    }
});
})

//get single product
router.get('/product/:id', function(req, res, next){
    db.Products.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, product){
        if(err){
            res.send(err);
        }else{
        res.json(product);
    }
});
})

//save product
router.post('/product',function(req,res,next){
    var product = req.body;
    if(!product.Name){
        res.status(400);
        res.json({
            "error":"BAD DATA"
        });
    }else{
            db.products.save(product,function(err, product){
                if(err){
                    res.send(err);
                }res.json(product);
            })
        }
    })

//delete product
router.delete('product/:id',function(req,res,next){
    db.products.remove({_id: mongojs.ObjectId(req.params.id)},function(err,product){
        if(err){
            res.send(err);
        }res.json(product)
    })
})

//Update product
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updateProduct = {};
    if(product.Name){
        updateProduct.Name = task.Name;
    }
    if(!updateProduct){
        res.status(400);
        res.json({'error':"BAD DATA"})
    }else{
        db.products.update({_id:mongojs.ObjectId(req.params.id)},updateProduct,{}
        )
    }
})


module.exports = router;