import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const navItems = [
  { label: "Watched Movies", path: "/watched-movies" },
  { label: "Unwatched Movies", path: "/unwatched-movies" },
  { label: "Add movies", path: "/add-movies" }
];

function Navbar() {
  const [hamburger, setHamburger] = useState(null);

  const handleMenuOpen = (event) => {
    setHamburger(event.currentTarget);
  };

  const handleMenuClose = () => {
    setHamburger(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{backgroundImage:`url("../images/background.jpg")`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(25, 118, 210, 0.7)',
          opacity: '0.8'}}>
        <Toolbar>
          
            <Typography
              variant="h5"
              sx={{ flexGrow: 1, display: 'flex' }}
            >
             <Link to="/" style={{ textDecoration: 'none', color:"white" }}> Movies </Link>
            </Typography>
          
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={hamburger}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(hamburger)}
              onClose={handleMenuClose}
            >
              {navItems.map((item) => (
                <MenuItem key={item.label} onClick={handleMenuClose}>
                  <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.label} sx={{ color: '#fff' }}>
                <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
