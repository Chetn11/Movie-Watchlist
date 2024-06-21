const mongoose=require("mongoose");

const movieSchema=new mongoose.Schema({
    title:{type:String, require:true},
    image:{type:String, require:true},
    year:{type:Number,require:true},
    genre:{type:String, require:true},
    rating:{type:Number, require:true},
    description:{type:String, require:true},
    status:{type:Boolean,require:true}
});
const MoviesModel=mongoose.model("movie",movieSchema);
module.exports={MoviesModel}