import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignUpValidator } from "./hooks/useSignUpValidator";
import { UserPostDTO, ValidateStatus } from "../../types/signup";
import { register } from "../../slice/signupSlice";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { SignUpIdField } from "./SignUpIdField";
import { SignUpPasswordField } from "./SignUpPasswordField";
import { SignUpPasswordConfirmField } from "./SignUpPasswordConfirmField";
import { SignUpNicknameField } from "./SignUpNicknameField";
import { SignUpNationField } from "./SignUpNationField";
import {ConfirmModal} from "../../components/modal/ConfirmModal";
import {ComponentHelmet} from "../../components/common/ComponentHelmet";

export function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  // Form fields
  const [nation, setNation] = useState('');
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const {
    validate,
    idValidate, setIdValidate,
    nationValidate, setNationValidate,
    nickNameValidate, setNickNameValidate,
    passwordValidate, setPasswordValidate,
    passwordCheckValidate, setPasswordCheckValidate
  } = useSignUpValidator({
    nation,
    id,
    nickName,
    password,
    passwordCheck,
  });

  const handleCancelButton = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    navigate('/signin');
  };

  const handleSignup = useCallback(async () => {
    try {
      const isSignupAble = validate();
      if (!isSignupAble) return;

      await dispatch(
          register({
            user_email: id,
            username: nickName,
            nation: nation,
            password: password
          } as UserPostDTO)
      ).then(() => {
        setSignUpSuccess((re) => !re)
      });

    } catch (e) {
      console.error('Signup error:', e);
    }
  }, [id, nation, nickName, password, dispatch, navigate, validate]);

  return (
    <Container component="main" maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            mt: 8,
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
              회원가입
            </Typography>

            <Stack spacing={3}>
              <SignUpNationField
                nation={nation}
                setNation={setNation}
                nationValidate={nationValidate}
                setNationValidate={setNationValidate}
              />

              <SignUpIdField
                id={id}
                setId={setId}
                idValidate={idValidate}
                setIdValidate={setIdValidate}
              />

              <SignUpNicknameField
                nickName={nickName}
                setNickName={setNickName}
                nickNameValidate={nickNameValidate}
                setNickNameValidate={setNickNameValidate}
              />

              <SignUpPasswordField
                password={password}
                setPassword={setPassword}
                passwordValidate={passwordValidate}
                setPasswordValidate={setPasswordValidate}
              />

              <SignUpPasswordConfirmField
                passwordCheck={passwordCheck}
                setPasswordCheck={setPasswordCheck}
                passwordCheckValidate={passwordCheckValidate}
                setPasswordCheckValidate={setPasswordCheckValidate}
              />

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCancelButton}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 1,
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  취소
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSignup}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2,
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  회원가입
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </motion.div>

      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle>회원가입 취소</DialogTitle>
        <DialogContent>
          <Typography>
            가입을 취소하시겠습니까? 작성중인 정보는 삭제됩니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>
            아니오
          </Button>
          <Button onClick={handleConfirmCancel} variant="contained" color="error">
            예
          </Button>
        </DialogActions>
      </Dialog>
      {signUpSuccess && (
          <ConfirmModal modalClose={setSignUpSuccess}/>
      )}
      <ComponentHelmet title={"Koreer - 회원가입"} />
    </Container>
  );
}
