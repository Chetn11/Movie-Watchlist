import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = ["Movie List", "Watched Movies", "Add movies"];

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
      <AppBar component="nav" sx={{backgroundImage:`url("../images/background.jpg")`,backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(25, 118, 210, 0.2)'}}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, display: 'flex', color:"white" }}
          >
            Movies
          </Typography>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton
              edge="start"
              color="white"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              hamburger={hamburger}
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
                <MenuItem key={item} onClick={handleMenuClose}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block',  } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
