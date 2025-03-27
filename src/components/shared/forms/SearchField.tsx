import React from 'react';
import { TextField, TextFieldProps } from './TextField';
import { Search } from '@mui/icons-material';

export interface SearchFieldProps extends Omit<TextFieldProps, 'label' | 'type'> {
  label?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({ 
  label = 'Search',
  ...props 
}) => {
  return (
    <TextField
      label={label}
      type="search"
      InputProps={{
        startAdornment: <Search color="action" />,
        ...props.InputProps,
      }}
      {...props}
    />
  );
};
