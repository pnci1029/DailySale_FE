import React from 'react';
import { PasswordField, PasswordFieldProps } from './PasswordField';

export interface PasswordConfirmFieldProps extends Omit<PasswordFieldProps, 'label'> {
  label?: string;
  password: string;
}

export const PasswordConfirmField: React.FC<PasswordConfirmFieldProps> = ({ 
  label = 'Confirm Password',
  password,
  value,
  onChange,
  ...props 
}) => {
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  React.useEffect(() => {
    if (value && password && value !== password) {
      setError(true);
      setHelperText('Passwords do not match');
    } else {
      setError(false);
      setHelperText('');
    }
  }, [value, password]);

  return (
    <PasswordField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};
