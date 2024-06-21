import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateData, getData } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import ConfirmationBar from "../Components/ConfirmationBar";

function EditMovie() {
  const [movieData, setMovieData] = useState({
    title: "",
    image: "",
    rating: "",
    year: "",
    genre: "",
    description: "",
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovieData = localStorage.getItem("movieData");
    if (storedMovieData) {
      setMovieData(JSON.parse(storedMovieData));
    }
  }, []);

  const handleRatingChange = (event, newValue) => {
    setMovieData({
      ...movieData,
      rating: newValue,
    });
  };

  const handleStatusChange = (e) => {
    setMovieData({
      ...movieData,
      status: e.target.value === "watched",
    });
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateData(movieData.id, movieData)).then(() => {
      dispatch(getData());
      setLoading(false);
      setSnackbarOpen(true);
      localStorage.removeItem("movieData");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={6}>
      <Typography variant="h4" gutterBottom>
        Edit Movie
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 600 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Title
            </Typography>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Image URL
            </Typography>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={movieData.image}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant="h6" textAlign="start" padding="5px">
                Select Status
              </Typography>
              <Select
                name="status"
                value={movieData.status ? "watched" : "unwatched"}
                onChange={handleStatusChange}
                required
              >
                <MenuItem value="watched">Watched</MenuItem>
                <MenuItem value="unwatched">Unwatched</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Ratings
            </Typography>
            <Rating
              name="rating"
              value={movieData.rating}
              onChange={handleRatingChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Year
            </Typography>
            <TextField
              fullWidth
              label="Year"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Genre
            </Typography>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Description
            </Typography>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={movieData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Movie"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <ConfirmationBar
        open={snackbarOpen}
        onClose={handleClose}
        message="Movie updated successfully!"
        severity="success"
      />
    </Box>
  );
}

export default EditMovie;
