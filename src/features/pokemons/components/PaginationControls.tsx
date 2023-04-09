import React, { useMemo, useEffect } from 'react';
import { Grid, Pagination, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dropdown from 'components/Dropdown';

const menuItems: { value: number; name: string }[] = [
  {
    value: 10,
    name: '10',
  },
  {
    value: 20,
    name: '20',
  },
  {
    value: 50,
    name: '50',
  },
];

type PaginationControlsProps = {
  count: number | undefined;
  page: number;
  num: number;
  onPageChange: (page: number) => void;
  onNumChange: (num: number) => void;
};

const PaginationControls = ({
  count,
  page,
  num,
  onPageChange,
  onNumChange,
}: PaginationControlsProps) => {
  const pageCount = useMemo(() => {
    if (!count) return 1;
    return Math.ceil(count / num);
  }, [count, num]);

  useEffect(() => {
    if (page > pageCount) {
      onPageChange(pageCount);
    }
    //  setPage(Math.ceil((page * pageCount) / (pageCount + 1)));
  }, [page, pageCount, onPageChange]);

  const ControlsContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }));

  const ResponsivePagination = styled(Pagination)(({ theme }) => ({
    py: 1,
    '& .MuiButtonBase-root': {
      [theme.breakpoints.down(400)]: {
        minWidth: 0,
      },
    },
  }));

  return (
    <ControlsContainer container alignItems="center" mt={1} mb={1} justifyContent="space-between">
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        <Typography mr={1} variant="body2">
          Pokemons per page
        </Typography>
        <Dropdown
          sx={{
            '& .MuiSelect-select': {
              p: 1,
            },
          }}
          onChange={(e) => onNumChange(e.target.value as number)}
          value={num}
          items={menuItems}
        />
      </Box>
      <ResponsivePagination onChange={(_, p) => onPageChange(p)} page={page} count={pageCount} />
    </ControlsContainer>
  );
};

export default PaginationControls;
