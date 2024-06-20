import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import WatchedMovies from '../Pages/WatchedMovies'
import UnwatchedMovies from '../Pages/UnwatchedMovies'
import AddMovies from '../Pages/AddMovies'
import Navbar from '../Components/NavBar'
import { Box } from '@mui/material'

function AllRoutes() {
  return (
    <Box sx={{ mt: 10 }}>
        <Routes>
        
        <Route path="/" element={<HomePage/>}></Route>
        <Route path='/watched-movies' element={<WatchedMovies/>}></Route>
        <Route path='/unwatched-movies' element={<UnwatchedMovies/>}></Route>
        <Route path='/add-movies' element={<AddMovies/>}></Route>
    </Routes>
    </Box>
    
  )
}

export default AllRoutes