import React, { useState, useMemo, useCallback } from 'react';
import {
  Card,
  CardActionArea,
  Grid,
  Typography,
  Skeleton,
  Tooltip,
  Box,
  GridProps,
  Chip,
} from '@mui/material';
import { useGetPokemonByNameQuery } from 'features/pokeapi/pokeapiSlice';
import { keyToName } from 'utils/string';
import { Favorite, OfflineBolt, Shield } from '@mui/icons-material';
import { blue, red, green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import FilterType from '../types';

const PokemonCard = ({
  name,
  onSuccess,
  onFail,
  gridProps,
  types,
}: {
  name: string;
  onSuccess?: () => void;
  onFail?: () => void;
  gridProps?: GridProps;
  types?: FilterType[];
}) => {
  const { data, isFetching, isSuccess } = useGetPokemonByNameQuery({ name });
  const [imgHasLoaded, setImgLoaded] = useState(false);

  const isOfActiveType = useMemo(() => {
    if (!types) return true;
    if (!data) return false; // for skeleton to appear

    const isActive = data.types.every(({ type }) => types.find(({ value }) => type.name === value));

    return isActive;
  }, [types, data]);

  const getStat = useCallback(
    (key: string) => {
      if (!data) return 'Unknown';
      const st = data?.stats?.find(({ stat }) => stat.name === key);
      if (!st) return 'Unknown';
      return st.base_stat;
    },
    [data]
  );

  if (isFetching) return <Skeleton variant="rectangular" height={165} />;

  if (!isSuccess) {
    if (onFail) onFail();
    return null;
  }

  if (onSuccess) onSuccess();

  if (!isOfActiveType) return null;

  return (
    <Grid {...gridProps}>
      <Card>
        <CardActionArea sx={{ minHeight: 165 }} component={Link} to={`/${name}`}>
          <Grid container>
            <Grid
              xs={5}
              item
              container
              justifyContent="center"
              sx={{ position: 'relative' }}
              alignItems="center"
            >
              {imgHasLoaded || !data.sprites.front_default ? null : (
                <Skeleton
                  sx={{ width: '100%', height: '100%', position: 'absolute' }}
                  variant="rectangular"
                />
              )}
              {data.sprites.front_default ? (
                <Box
                  component="img"
                  onLoad={() => setImgLoaded(true)}
                  alt={name}
                  src={data.sprites.front_default}
                  sx={{ height: '100%' }}
                />
              ) : (
                <Typography>No Image</Typography>
              )}
            </Grid>
            <Grid xs={7} item p={2}>
              <Tooltip title={keyToName(name)} placement="top">
                <Typography noWrap variant="body1" sx={{ fontWeight: 'bold' }} component="h2">
                  {keyToName(name)}
                </Typography>
              </Tooltip>
              <Box mt={1}>
                {data.types.map(({ type }) => (
                  <Chip size="small" sx={{ mr: 1 }} color="primary" label={keyToName(type.name)} />
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-evenly" p={1}>
            {[
              {
                key: 'attack',
                title: 'Attack',
                icon: OfflineBolt,
                color: blue[500],
              },
              {
                key: 'defense',
                title: 'Defense',
                icon: Shield,
                color: green[400],
              },
              {
                key: 'hp',
                title: 'Health',
                icon: Favorite,
                color: red[500],
              },
            ].map(({ key, title, icon: Icon, color }) => (
              <Grid spacing={1} container alignItems="center" sx={{ width: 'auto' }} item key={key}>
                <Grid item>
                  <Icon sx={{ color }} />
                </Grid>
                <Grid item>
                  <Typography sx={{ color }} variant="h6">
                    {getStat(key)}
                  </Typography>
                  <Typography
                    mt={-0.8}
                    sx={{ display: 'block', color, textTransform: 'uppercase' }}
                    variant="caption"
                  >
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
