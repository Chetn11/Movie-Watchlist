import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../Redux/action';
import MovieCard from '../Components/MovieCard';

function HomePage() {
  const dispatch = useDispatch();
  const { movies } = useSelector((store) => store.reducer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getData()).then(() => setLoading(false));
  }, [dispatch]);

  return (
  
      <Box >
      <Box>
        <Typography variant='h3' paddingBottom="20px" sx={{ fontWeight: 'bold', fontStyle: 'oblique' }}>All Movies List</Typography>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} paddingLeft="80px">
          {movies?.map((ele, i) => (
            <Grid item xs={9} sm={6} md={4} lg={3} key={ele._id}>
              <MovieCard 
                title={ele.title} 
                image={ele.image} 
                rating={ele.rating} 
                year={ele.year} 
                genre={ele.genre} 
                status={ele.status} 
                description={ele.description} 
                id={ele._id}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    
  );
}

export default HomePage;
