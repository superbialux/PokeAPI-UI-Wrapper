import React from 'react';
import { Search } from '@mui/icons-material';
import { Box, Input, InputProps } from '@mui/material';

const SearchBox = ({ placeholder, onChange, value, ...props }: InputProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      '& .MuiInputBase-input': {
        color: '#fff',
      },
      '& .MuiInputBase-root': {
        flex: 1,
        '&:before, &:after, &:hover:not(.Mui-disabled, .Mui-error):before': {
          borderColor: '#fff',
        },
      },
    }}
  >
    <Search sx={{ mr: 0.5 }} />
    <Input id="search" value={value} placeholder={placeholder} onChange={onChange} {...props} />
  </Box>
);

export default SearchBox;
