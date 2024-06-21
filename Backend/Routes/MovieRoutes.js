const express=require("express");
const {MoviesModel}=require("../models/MovieModel");

const moviesRouter=express.Router();

moviesRouter.get("/",async(req,res)=>{
    const data=await MoviesModel.find();
    res.send({data:data});
})

moviesRouter.post("/add",async(req,res)=>{
    const{title,image,year,genre,rating,description,status}=req.body;
    
    try {
        const moviesData=await MoviesModel.create({title,image,year,genre,rating,description,status});
    res.send({data:moviesData,message:"Data Added to the server"})
    } catch (error) {
        res.send({message:"Error while adding data"})
    }
    
})
module.exports={moviesRouter}