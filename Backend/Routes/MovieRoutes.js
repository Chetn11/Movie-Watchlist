const express=require("express");
const {MoviesModel}=require("../models/MovieModel");

const moviesRouter=express.Router();

moviesRouter.get("/",async(req,res)=>{
    const data=await MoviesModel.find();
    res.send({data:data});
})


// creating Data
moviesRouter.post("/add",async(req,res)=>{
    const{title,image,year,genre,rating,description,status}=req.body;
    
    try {
        const moviesData=await MoviesModel.create({title,image,year,genre,rating,description,status});
    res.send({data:moviesData,message:`${moviesData.title} is added`})
    } catch (error) {
        res.send({message:"Error while adding data"})
    }
    
})

// Edit Data
moviesRouter.post("/edit/:movieId", async(req,res)=>{
    const movieId=req.params.movieId;
    const payload=req.body
    try {
        const movieData=await MoviesModel.findOneAndUpdate({_id:movieId},payload);
        res.send({data:movieData,message:`${moviesData.title} is updated`})
    } catch (error) {
        res.send({message:"Error while Editing data"})
    }
})

// delete Data
moviesRouter.delete("/delete/:movieId", async(req,res)=>{
    const movieId=req.params.movieId;
    try {
        const movieData=await MoviesModel.findOneAndDelete({_id:movieId});
        res.send({message:`${movieData.title} is deleted`})
    } catch (error) {
        res.send({message:"Error while Deleting data"})
    }
})
module.exports={moviesRouter}