import React from 'react';
import { Autocomplete, TextField as MuiTextField } from '@mui/material';
import { Public } from '@mui/icons-material';
import { countries } from '../../../constants/countries';

export interface NationFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
}

export const NationField: React.FC<NationFieldProps> = ({
  value,
  onChange,
  error = false,
  helperText = '',
  label = 'Nation',
}) => {
  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue || '')}
      options={countries}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            startAdornment: <Public color="action" />,
          }}
        />
      )}
    />
  );
};
