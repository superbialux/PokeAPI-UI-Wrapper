import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, NotFound, Search } from 'pages';
import Layout from 'layouts/Layout';
import PokemonModal from 'features/pokemonModal/PokemonModal';

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />}>
        <Route path="/:pokemon" element={<PokemonModal />} />
      </Route>
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Router;
