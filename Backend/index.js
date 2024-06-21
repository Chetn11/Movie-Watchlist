const  express = require('express')
const app = express();
const cors=require("cors")
require("dotenv").config();
const {connection}=require("./connection/connection");
const {moviesRouter}=require("./Routes/MovieRoutes")


app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send({message:"Movies server",getAllMovies:"url/movies"});
})

app.use("/movies",moviesRouter)
app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to MongoDB.")
    } catch (error) {
        console.log(error)
        console.log("Error while Connecting to MongoDB.")
    }
})

