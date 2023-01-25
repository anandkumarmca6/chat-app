import React from 'react';
import { Stack, TextField } from '@mui/material';

const Search = () => {
  return (
    <Stack>
      <TextField
        label='Search input'
        InputProps={{
          type: 'search',
        }}
      />
    </Stack>
  );
};

export default Search;
