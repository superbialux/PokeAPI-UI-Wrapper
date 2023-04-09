import React, { useState, useMemo, useEffect } from 'react';
import { useGetPokemonTypesQuery, useGetPokemonsQuery } from 'features/pokeapi/pokeapiSlice';
import { Grid, Skeleton } from '@mui/material';
import { keyToName } from 'utils/string';
import PokemonCard from './components/PokemonCard';
import PaginationControls from './components/PaginationControls';
import Filters from './components/Filters';
import FilterType from './types';

const Pokemons = () => {
  const [num, setNum] = useState(10);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const { data, isFetching, isSuccess } = useGetPokemonsQuery({ num, page });
  const { data: types } = useGetPokemonTypesQuery();

  const items = useMemo(() => {
    if (!types) return [];
    return types.map(({ name }) => ({ value: name, name: keyToName(name) }));
  }, [types]);

  useEffect(() => {
    setFilters(items);
  }, [items]);

  return (
    <>
      <Filters
        filters={items}
        activeFilters={filters}
        onFilterChange={(f) => {
          if (filters.find(({ value }) => value === f.value)) {
            setFilters(filters.filter(({ value }) => value !== f.value));
            return;
          }
          setFilters([...filters, f]);
        }}
      />
      <PaginationControls
        count={data?.count}
        page={page}
        num={num}
        onPageChange={(p) => setPage(p)}
        onNumChange={(val) => setNum(val)}
      />
      <Grid container spacing={2}>
        {isFetching || !isSuccess
          ? Array.from({ length: 20 }, (_, i) => (
              <Grid key={i} xs={12} sm={6} md={4} item>
                <Skeleton variant="rectangular" height={165} />
              </Grid>
            ))
          : data.results.map((pk) => (
              <PokemonCard
                types={filters}
                gridProps={{ item: true, xs: 12, sm: 6, md: 4 }}
                key={pk.name}
                name={pk.name}
              />
            ))}
      </Grid>
    </>
  );
};

export default Pokemons;
