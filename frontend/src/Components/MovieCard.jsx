import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';

function MovieCard({title,image,rating,year,genre,description,status,id}) {
    // console.log(title,image,rating,year,genre,description,status);
  return (
    <Card sx={{ maxWidth: 345, '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
              transform: 'scale(1.05)', 
              transition: 'transform 0.2s ease-in-out',
              alignItems: 'center'}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={image}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:"start", padding:"5px"}}>
          Year : {year}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:"start", padding:"5px"}}>
          Genre : {genre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:"start", padding:"5px"}}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:"start", padding:"5px"}}>
          Ratings : {rating} 
        </Typography>

      </CardContent>
      <CardActions>
        {status?<Button size="small">Watched</Button>:<Button size="small">Unwatched</Button>}
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}

export default MovieCard