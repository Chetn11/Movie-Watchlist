const  express = require('express')
const app = express();
const cors=require("cors")
require("dotenv").config();
const {connection}=require("./connection/connection");
const {moviesRouter}=require("./Routes/MovieRoutes")


app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send({message:"Movies server",getAllMovies:"url/movies",add:"url/movies/add",update:"url/movies/edit/:id",delete:"url/movies/delete/:id"});
})

app.use("/movies",moviesRouter)
app.listen(8000, async()=>{
    try {
        await connection;
        console.log("Connected to MongoDB.")
    } catch (error) {
        console.log(error)
        console.log("Error while Connecting to MongoDB.")
    }
})

