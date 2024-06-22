import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, CircularProgress, useMediaQuery, TextField, Button, Divider, Avatar, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleData, postReview } from '../Redux/action';

function MovieDetails() {
  const [loading, setLoading] = useState(true);
  const [showReviewFields, setShowReviewFields] = useState(false);
  const [reviews, setReviews] = useState({
    reviewer: "",
    comment: ""
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const dispatch = useDispatch();
  const { movies } = useSelector((store) => store.reducer);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { id } = useParams(); 

  useEffect(() => {
    dispatch(getSingleData(id))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const handleReviewButtonClick = () => {
    setShowReviewFields(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviews(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    dispatch(postReview(reviews, id))
      .then(() => {
        setShowReviewFields(false);
        setReviews({ reviewer: "", comment: "" });
        setSubmittingReview(false);
        window.location.reload(); 
      })
      .catch((error) => {
        console.error('Error adding review:', error);
        setSubmittingReview(false);
      });
  };

  if (loading || !movies) {
    return (
      <Box
        sx={{
          display: 'flex',
          marginTop: "200px",
          justifyContent: 'center',
          height: '200px',
        }}
      >
        <CircularProgress sx={{ width: "150px", height: "150px" }} />
      </Box>
    );
  }

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
          backgroundImage: `url(${movies.image})`,
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
              alt={movies.title}
              image={movies.image}
              sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ padding: "5px" }}>
                {movies.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "start", padding: "5px" }}>
                Year : {movies.year}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "start", padding: "5px" }}>
                Genre : {movies.genre}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "start", padding: "5px" }}>
                Rating : {movies.rating}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "start", padding: "5px" }} paragraph>
                {movies.description}
              </Typography>
              <Button onClick={handleReviewButtonClick} variant="contained" color="primary">
                Add Review
              </Button>
              {showReviewFields && (
                <Box sx={{ marginTop: "10px" }}>
                  <TextField
                    label="Reviewer Name"
                    value={reviews.reviewer}
                    onChange={handleChange}
                    name="reviewer"
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Comment"
                    value={reviews.comment}
                    onChange={handleChange}
                    name="comment"
                    multiline
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                  <Button onClick={handleAddReview} variant="contained" color="primary">
                    {submittingReview ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Add Review"
                    )}
                  </Button>
                </Box>
              )}
              <CardContent style={{ padding:5}}>
                <Typography variant="h6" sx={{ textAlign: "start", padding: "5px" }}>
                  Reviews:
                </Typography>
                {movies.reviews.map((review, index) => (
                  <Paper sx={{ padding: "20px 20px",backgroundColor:'rgba(255, 255, 255, 0.1)' }} key={index}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar alt="profile" src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{review.reviewer}</h4>
                        <p style={{ textAlign: "left" }}>
                          {review.comment}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                          posted : {review.date}
                        </p>
                      </Grid>
                    </Grid>
                    <Divider variant="fullWidth" />
                  </Paper>
                ))}
              </CardContent>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default MovieDetails;
