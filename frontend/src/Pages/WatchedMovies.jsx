import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/action";
import MovieCard from "../Components/MovieCard";


function WatchedMovies() {
  const dispatch = useDispatch();
  const { isLoading, isError, movies } = useSelector((store) => store.reducer);
  // console.log(movies)

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  return (
    <Box textAlign="center" justifyContent="center">
      <Box>
        <Typography variant="h3" paddingBottom="20px">
          Watched Movies
        </Typography>
      </Box>
      <Grid container spacing={2} paddingLeft="80px">
        {movies
          ?.filter((ele, i) => {
            return ele.status === true;
          })
          .map((ele) => (
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
    </Box>
  );
}

export default WatchedMovies