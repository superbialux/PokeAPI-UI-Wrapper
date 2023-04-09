import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';
import { Outlet, createSearchParams, useNavigate } from 'react-router-dom';
import SearchBox from 'components/SearchBox';
import ScrollToTop from 'components/ScrollToTop';
import { toSearchable } from 'utils/string';

const Layout = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!query) return;
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({ name: toSearchable(query) })}`,
      });
      setQuery('');
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, navigate]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={4}>
              <SearchBox
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 0.5, mb: 4 }}>
        <Outlet />
      </Container>
      <ScrollToTop />
    </Box>
  );
};

export default Layout;
