import React from 'react';
import {InputAdornment, TextField,} from '@mui/material';
import {Email} from '@mui/icons-material';
import {ValidateStatus} from '../../types/signup';

interface Args {
  id: string;
  setId: (id: string) => void;
  idValidate: ValidateStatus;
  setIdValidate: React.Dispatch<React.SetStateAction<ValidateStatus>>;
}

export function SignUpIdField({
  id,
  setId,
  idValidate,
  setIdValidate,
}: Args) {

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIdValidate(ValidateStatus.UNFILLED);
    setIdValidate(ValidateStatus.NONE);
  };

  const isError = idValidate !== ValidateStatus.NONE && id !== '';

  return (
    <TextField
      fullWidth
      label="이메일"
      variant="outlined"
      value={id}
      onChange={handleIdChange}
      error={isError}
      helperText={idValidate === ValidateStatus.NONE ? "" : "이메일을 다시 확인해주세요."}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
    />
  );
}
