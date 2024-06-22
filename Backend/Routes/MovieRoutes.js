const express=require("express");
const {MoviesModel}=require("../models/MovieModel");

const moviesRouter=express.Router();

moviesRouter.get("/",async(req,res)=>{
    const data=await MoviesModel.find();
    res.send({data:data});
})

// Get movie by ID
moviesRouter.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const movie = await MoviesModel.findById(movieId);
        if (movie) {
            res.send({ data: movie });
        } else {
            res.send({ message: "Movie not found" });
        }
    } catch (error) {
        res.send({ message: "Error retrieving movie" });
    }
});


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
moviesRouter.patch("/edit/:movieId", async(req,res)=>{
    const movieId=req.params.movieId;
    const payload=req.body
     await MoviesModel.findOneAndUpdate({_id:movieId},payload);
    res.send({message:`Data is updated`})
    
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

// Add a review to a movie
moviesRouter.post("/add-review/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const { reviewer, comment } = req.body;
    const newReview = { reviewer, comment };

    try {
        const movie = await MoviesModel.findById(movieId);
        if (movie) {
            movie.reviews.push(newReview);
            await movie.save();
            res.send({ data: movie, message: "Review added successfully" });
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error while adding review" });
    }
});


module.exports={moviesRouter}