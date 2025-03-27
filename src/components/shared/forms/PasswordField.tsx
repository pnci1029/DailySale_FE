import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, TextFieldProps } from './TextField';

export interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {
  showPasswordToggle?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  showPasswordToggle = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: showPasswordToggle ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};
