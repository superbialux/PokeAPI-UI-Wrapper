import React from 'react';
import Pokemons from 'features/pokemons/Pokemons';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Home = () => (
  <Box>
    <Pokemons />
    <Outlet />
  </Box>
);

export default Home;
