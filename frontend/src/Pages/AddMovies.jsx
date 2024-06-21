import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Rating,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { postData } from "../Redux/action";





const AddMovies = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    rating: 0,
    year: "",
    genre: "",
    status: false,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false); // for alert after we add the movie

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value === "watched",
    });
  };

  const handleClose = () => {

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(postData(formData));
    setLoading(false);
    setSnackbarOpen(true);
    setFormData({
      title: "",
      image: "",
      rating: 0,
      year: "",
      genre: "",
      status: false,
      description: "",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={6}>
      <Typography variant="h4" gutterBottom>
        Add New Movie
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
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="start" padding="5px">
              Image Url
            </Typography>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
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
                value={formData.status ? "watched" : "unwatched"}
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
              value={formData.rating}
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
              value={formData.year}
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
              value={formData.genre}
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
              value={formData.description}
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
              {loading ? <CircularProgress size={24} /> : "Add Movie"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Movie added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMovies;
