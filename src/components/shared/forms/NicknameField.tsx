import React from 'react';
import { TextField, TextFieldProps } from './TextField';
import { Face } from '@mui/icons-material';

export interface NicknameFieldProps extends Omit<TextFieldProps, 'label' | 'type'> {
  label?: string;
}

export const NicknameField: React.FC<NicknameFieldProps> = ({ 
  label = 'Nickname',
  ...props 
}) => {
  return (
    <TextField
      label={label}
      type="text"
      InputProps={{
        startAdornment: <Face color="action" />,
        ...props.InputProps,
      }}
      {...props}
    />
  );
};
