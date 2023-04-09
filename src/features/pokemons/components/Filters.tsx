import React, { useCallback } from 'react';
import { Grid, Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterType from '../types';

type FiltersProps = {
  filters: FilterType[];
  activeFilters: FilterType[];
  onFilterChange: (filter: FilterType) => void;
};

const Filters = ({ filters, activeFilters, onFilterChange }: FiltersProps) => {
  const isActive = useCallback(
    (val: string) => activeFilters.find(({ value }) => value === val),
    [activeFilters]
  );

  const FiltersContainer = styled(Grid)(() => ({
    flexWrap: 'nowrap',
    overflow: 'hidden',
  }));

  if (!filters.length) return null;

  return (
    <FiltersContainer container alignItems="center" mt={2} justifyContent="space-between">
      <Typography mr={1} variant="body2">
        Filter by type:
      </Typography>
      <Box
        sx={{
          overflowX: 'scroll',
          display: 'flex',
          flex: 1,
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            background: 'transparent',
          },
        }}
      >
        {filters.map((filter) => (
          <Chip
            sx={{
              mr: 0.5,
            }}
            label={filter.name}
            onClick={() => onFilterChange(filter)}
            color={isActive(filter.value) ? 'primary' : 'default'}
            key={filter.value}
          />
        ))}
      </Box>
    </FiltersContainer>
  );
};

export default Filters;
