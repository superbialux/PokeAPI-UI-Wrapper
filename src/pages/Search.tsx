import { ChevronLeft } from '@mui/icons-material';
import { Box, Grid, Typography, Link } from '@mui/material';
import PokemonCard from 'features/pokemons/components/PokemonCard';
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setHasFailed(false);
  }, []);

  const name = searchParams.get('name');

  if (!name) return <Typography>Specify your search query</Typography>;

  return (
    <Box>
      <Link component={RouterLink} to="/">
        <Grid mt={1} container justifyContent="start">
          <ChevronLeft sx={{ mr: 1 }} />
          <Typography>Home</Typography>
        </Grid>
      </Link>
      <Typography mt={0.5} mb={2} variant="h5">
        {hasFailed ? 'Nothing found' : 'Search Results'}
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4} item key={name}>
          <PokemonCard
            name={name}
            onSuccess={() => setHasFailed(false)}
            onFail={() => setHasFailed(true)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
