import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, useMediaQuery } from '@mui/material';

function MovieDetails() {
  const [movie, setMovie] = useState({
    title: "",
    image: "",
    rating: "",
    year: "",
    genre: "",
    description: "",
    status: false,
  });

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const storedMovieData = localStorage.getItem("movieData");
    if (storedMovieData) {
      setMovie(JSON.parse(storedMovieData));
    }
  }, []);

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: -1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${movie.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
      />
      <Card sx={{ position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)', zIndex: 2, height: isSmallScreen ? "80%" : "70%", width: isSmallScreen ? "90%" : "60%", overflow: 'auto' }}>
        <Grid container spacing={isSmallScreen ? 1 : 2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt={movie.title}
              image={movie.image}
              sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ padding: "5px" }}>
                {movie.title}
              </Typography>
              <Typography variant="h6"  sx={{ textAlign: "start", padding: "5px" }}>
                Year : {movie.year}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "start", padding: "5px" }}>
                Genre : {movie.genre}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "start", padding: "5px" }}>
                Rating : {movie.rating}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "start", padding: "5px" }} paragraph>
                {movie.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default MovieDetails;
