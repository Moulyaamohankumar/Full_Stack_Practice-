const {Router} = require('express');
const RestuarentModel = require('../Model/userModel'); 
const mongoose = require('mongoose')
const path = require('dotenv').config({
    path:'../Configure/.env'
});
const userRouter = Router(); 


userRouter.get('/',async(res,req)=>{
try{
    const productFind = await RestuarentModel.find();
    const ProductFindByiD = await RestuarentModel.map((products)=>{
        return{
            name:products.name,
            description : products.description,
            category :products.category,
            tags:products.tags,
            price:products.price,
            stock :products.stock,
            email:products.email,

        }

    })
    res.status(200).json({products:products})
}catch(err){
    console.log(error);
    res.status(500).json({message:'Internal Server error'});
}
})

userRouter.post('/',(res,req)=>{
    res.send('Product Route');

})

userRouter.post('/',async(res,req)=>{
    const{email,name,id,quantity} = req.body
    try{
        if(!email || !name || !id || !quantity){
            res.status(400).json({message:'Please fill out all the forms '})
        }
    const findProducTMail = await RestuarentModel.findOne({email:email})
        if(!findProducTMail){
            res.status(400).json({message:'Invalid Mail'})
        
    }if(!quantity || quantity<0){
        res.status(400).json({message:'Ivalid quantity details provided'})
    }
    const productIDFind = await RestuarentModel.findById(id) 
    if(!productIDFind){
        res.status(404).json({message:'Ivalod productID'})

    }
    const cartFind = await findProducTMail.cart.findbyIndex((i)=>{
        return i.id==id
    
    })
    if(cartFind>-1){
        findProducTMail.cart[cartFind].quantity +=quantity;
    }else{
        findProducTMail.cart.push({id,name,quantity})
    }
    }catch(err){
        console.log('Post error 2')
        res.status(500).json({message:'Internal server error'})
    }

})

userRouter.post('/',async(res,req)=>{
    const{id,name,email,quantity} = req.body;
    const seller = await RestuarentModel.findOne({email:email})
    try{
        if(!seller){
            res.status(404).json({message:'Seller not found'})
        }
        const newProduct = await RestuarentModel.create({
            name,
            id,
            email,
            quantity,
            description,
            stock,
            tags,
            category
        })
        res.status(201).json({message:'Seller is created Successfully'})
    }catch(err){
        console.log('Post error seller',err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

userRouter.put('/',async(res,req)=>{
    const id = req.id.params
    const {name , description , category , tags , stock,price} = req.body
    try{
    const existProduct = await RestuarentModel.findById(id)
    if(!existProduct){
        res.status(404).json({message:'This product does not exist'})
    }
    existProduct.name = name,
    existProduct.description = description,
    existProduct.category = category,
    existProduct.tags = tags,
    existProduct.price = price,
    existProduct.stock = stock
    await existProduct.save()
    res.status(201).json({message:'Product is updated successfully'})
}catch(err){
    console.log('Put error in Product Updation')
    res.status(500).json({message:"Internal Server Error"})
}

})
userRouter.delete('/:id',(res,req)=>{
    const {id} = req.params.id
    const FindId = RestuarentModel.filter(m=>m.id!==m.id)
    res.json(200).json({message:'Product deleted successfully'})

})

module.exports = userRouter;