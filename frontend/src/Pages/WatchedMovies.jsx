import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/action";
import MovieCard from "../Components/MovieCard";

function WatchedMovies() {
  const dispatch = useDispatch();
  const { movies } = useSelector((store) => store.reducer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getData()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <Box textAlign="center" justifyContent="center">
      <Box>
        <Typography variant="h3" paddingBottom="20px">
          Watched Movies
        </Typography>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} paddingLeft="80px">
          {movies
            ?.filter((ele) => ele.status === true)
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
      )}
    </Box>
  );
}

export default WatchedMovies;
