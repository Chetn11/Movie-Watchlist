import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getData, toggleData, deleteData } from "../Redux/action";
import ConfirmationPrompt from "./ConfirmationPrompt";
import ConfirmationBar from "./ConfirmationBar";
import { Link, useNavigate } from "react-router-dom";

function MovieCard({
  id,
  title,
  image,
  rating,
  year,
  genre,
  description,
  status,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const changeStatus = () => {
    setLoading(true);
    dispatch(toggleData(id, status));
    dispatch(getData());
    setLoading(false);
  };

  const handleDelete = () => {
    setDelLoading(true);
    dispatch(deleteData(id)).then(() => {
      dispatch(getData());
      setDelLoading(false);
      setOpenDialog(false);
      setSnackbarOpen(true); // Open snackbar after deletion
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setMovieToDelete(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMovieToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = () => {
    const movieData = {
      id,
      title,
      image,
      rating,
      year,
      genre,
      description,
      status,
    };
    localStorage.setItem("movieData", JSON.stringify(movieData));
    navigate(`/edit-movies/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          transform: "scale(1.05)",
          transition: "transform 0.2s ease-in-out",
          alignItems: "center",
        },
      }}
    >
      <CardMedia component="img" alt="Movie image" height="240" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "start", padding: "5px" }}
        >
          Year: {year}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "start", padding: "5px" }}
        >
          Genre: {genre}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "start", padding: "5px" }}
        >
          Ratings: {rating}
        </Typography>
      </CardContent>
      <CardActions sx={{ textAlign: "center" }}>
        <Button size="small" onClick={changeStatus} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} />
          ) : status ? (
            "Watched"
          ) : (
            "Unwatched"
          )}
        </Button>
        <Button size="small" onClick={handleEdit}>
          <EditIcon />
        </Button>
        <Button size="small" onClick={handleOpenDialog}>
          <DeleteIcon />
        </Button>
      </CardActions>

      <ConfirmationPrompt
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        loading={delLoading}
        change={movieToDelete}
        title="Delete"
      />

      <ConfirmationBar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Movie deleted successfully!"
        severity="success"
      />
    </Card>
  );
}

export default MovieCard;
