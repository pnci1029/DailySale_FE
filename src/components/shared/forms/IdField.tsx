import React from 'react';
import { TextField, TextFieldProps } from './TextField';
import { Person } from '@mui/icons-material';

export interface IdFieldProps extends Omit<TextFieldProps, 'label' | 'type'> {
  label?: string;
}

export const IdField: React.FC<IdFieldProps> = ({ 
  label = 'ID',
  ...props 
}) => {
  return (
    <TextField
      label={label}
      type="text"
      autoComplete="username"
      InputProps={{
        startAdornment: <Person color="action" />,
        ...props.InputProps,
      }}
      {...props}
    />
  );
};
