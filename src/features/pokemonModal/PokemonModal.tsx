import styled from '@emotion/styled';
import { Modal, Typography, Card, CardContent, CardMedia, Chip, Box } from '@mui/material';
import { useGetPokemonByNameQuery } from 'features/pokeapi/pokeapiSlice';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { keyToName } from 'utils/string';

const PokemonModal = () => {
  const { pokemon } = useParams();

  const { data, isFetching, isSuccess } = useGetPokemonByNameQuery({
    name: pokemon ?? 'no-pokemon',
  });
  const navigate = useNavigate();

  if (!pokemon) return null;
  if (isFetching) return null;

  if (!isSuccess) return null;

  const ModalContainer = styled(Card)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: 500,
  }));

  return (
    <Modal open onClose={() => navigate('/')}>
      <ModalContainer>
        {data.sprites.front_default ? (
          <CardMedia
            sx={{ objectFit: 'contain' }}
            component="img"
            height="140"
            image={data.sprites.front_default}
            alt={`${pokemon}-front`}
          />
        ) : null}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {keyToName(pokemon)}
          </Typography>
          <Box mb={2}>
            {data.types.map(({ type }) => (
              <Chip sx={{ mr: 1 }} color="primary" label={keyToName(type.name)} />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Abilities:{' '}
            </Box>
            {data.abilities.map(({ ability }) => keyToName(ability.name)).join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Base Experience:{' '}
            </Box>
            {data.base_experience}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Weight:{' '}
            </Box>
            {data.weight}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Height:{' '}
            </Box>
            {data.height}
          </Typography>
        </CardContent>
      </ModalContainer>
    </Modal>
  );
};

export default PokemonModal;
