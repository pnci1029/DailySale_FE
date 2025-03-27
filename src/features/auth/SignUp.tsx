import React, { useState, useCallback } from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import { useAuthValidator } from '../../hooks/form/useAuthValidator';
import { UserPostDTO, ValidateStatus } from '../../types/signup';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/auth/authSlice';
import { motion } from 'framer-motion';
import { IdField } from '../../components/shared/forms/IdField';
import { PasswordField } from '../../components/shared/forms/PasswordField';
import { NicknameField } from '../../components/shared/forms/NicknameField';
import { PasswordConfirmField } from '../../components/shared/forms/PasswordConfirmField';
import { ConfirmModal } from '../../components/shared/modals/ConfirmModal';
import { AppDispatch } from '../../store/store';

export function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nation, setNation] = useState("korea");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    emailValidate,
    setEmailValidate,
    passwordValidate,
    setPasswordValidate,
    nationValidate,
    setNationValidate,
    nickNameValidate,
    setNickNameValidate,
    passwordCheckValidate,
    setPasswordCheckValidate,
    validate,
    resetValidation,
  } = useAuthValidator('signup', {
    email: id,
    password,
    passwordCheck,
    nation,
    nickName,
  });

  const handleSignUp = useCallback(async () => {
    if (!validate()) {
      return;
    }

    try {
      await dispatch(signup({
        user_email: id,
        username: nickName,
        password: password,
        nation: nation
      })).unwrap();
      
      setSignUpSuccess(true);
      resetValidation();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    }
  }, [dispatch, id, nickName, password, nation, validate, resetValidation]);

  const handleOpenDialog = () => setOpenCancelDialog(true);
  const handleCloseDialog = () => setOpenCancelDialog(false);
  const handleConfirmCancel = () => {
    handleCloseDialog();
    resetValidation();
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    if (e.target.value.length >= 4 && e.target.value.length <= 16 && setNickNameValidate) {
      setNickNameValidate(ValidateStatus.NONE);
    }
  };

  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    if (e.target.value === password && setPasswordCheckValidate) {
      setPasswordCheckValidate(ValidateStatus.NONE);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          mt: 3,
        }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center" gutterBottom>
              회원가입
            </Typography>

            <Stack spacing={2}>
              <IdField
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  if (e.target.value.length > 0 && setEmailValidate) {
                    setEmailValidate(ValidateStatus.NONE);
                  }
                }}
                error={emailValidate !== ValidateStatus.NONE}
                helperText={emailValidate !== ValidateStatus.NONE ? "이메일을 다시 확인해주세요." : ""}
              />

              <NicknameField
                value={nickName}
                onChange={handleNickNameChange}
                error={nickNameValidate !== ValidateStatus.NONE}
                helperText={nickNameValidate !== ValidateStatus.NONE ? "닉네임은 4~16자로 입력해주세요." : ""}
              />

              <PasswordField
                label="비밀번호"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length >= 4 && setPasswordValidate) {
                    setPasswordValidate(ValidateStatus.NONE);
                  }
                }}
                error={passwordValidate !== ValidateStatus.NONE}
                helperText={passwordValidate !== ValidateStatus.NONE ? "비밀번호는 4자 이상이어야 합니다." : ""}
              />

              <PasswordConfirmField
                value={passwordCheck}
                onChange={handlePasswordCheckChange}
                error={passwordCheckValidate !== ValidateStatus.NONE}
                helperText={
                  passwordCheckValidate === ValidateStatus.INVALID
                    ? "비밀번호가 일치하지 않습니다."
                    : passwordCheckValidate === ValidateStatus.BELOW_REQUIRED_LENGTH
                    ? "비밀번호는 4자 이상이어야 합니다."
                    : ""
                }
                password={password}
              />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleOpenDialog}
              >
                취소
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSignUp}
                disabled={
                  emailValidate !== ValidateStatus.NONE ||
                  nickNameValidate !== ValidateStatus.NONE ||
                  passwordValidate !== ValidateStatus.NONE ||
                  passwordCheckValidate !== ValidateStatus.NONE
                }
              >
                가입하기
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>

      <ConfirmModal
        open={openCancelDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancel}
        title="회원가입 취소"
        content="회원가입을 취소하시겠습니까? 입력하신 정보는 저장되지 않습니다."
      />
    </Box>
  );
}
