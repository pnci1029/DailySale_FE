import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  label: string;
  error?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'standard' | 'filled';
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error = false,
  helperText = '',
  variant = 'outlined',
  ...props
}) => {
  return (
    <MuiTextField
      label={label}
      error={error}
      helperText={helperText}
      variant={variant}
      fullWidth
      {...props}
    />
  );
};
