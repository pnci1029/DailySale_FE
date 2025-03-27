import {Link as RouterLink, useNavigate} from 'react-router-dom';
import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../store/auth/authSlice';
import {AuthResponse, LoginCredentials} from '../../store/auth/types';
import {ValidateStatus} from '../../types/signup';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {Email, Google, Lock, Visibility, VisibilityOff,} from '@mui/icons-material';
import {motion} from 'framer-motion';
import koreerLogo from '../../assets/img/koreer_logo_cropped.png';
import {useAuthValidator} from '../../hooks/form/useAuthValidator';
import {AppDispatch} from '../../store/store';
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";

interface ErrorResponse {
  message: string;
}

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const {setAccessToken} = AuthProvider();
    const { setCookie} = useCookieFunctions();


  const {
    emailValidate,
    setEmailValidate,
    passwordValidate,
    setPasswordValidate,
    validate,
  } = useAuthValidator('signin', { email, password });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrorMessage('');

      if (!validate()) {
        setIsLoading(false);
        return;
      }

      try {
        const credentials: LoginCredentials = {
          user_email: email,
          password: password,
        };

        const result:AuthResponse = await dispatch(login(credentials)).unwrap();
          // setAccessToken(result.accessToken)
          setCookie('accessToken', result.accessToken)

        navigate('/');
      } catch (error: any) {
        setErrorMessage(error.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, email, password, navigate, validate]
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage('');
    if (e.target.value.length > 0) {
      setEmailValidate(ValidateStatus.NONE);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage('');
    if (e.target.value.length > 0) {
      setPasswordValidate(ValidateStatus.NONE);
    }
  };

  const handleGoogleLogin = () => {
    const redirectUri = `${process.env.REACT_APP_BASE_URL}/auth/google/callback`;
    const googleClientId = '969073700844-r0dbph7gk0e9aqm5868ums9jgddqgvg2.apps.googleusercontent.com';
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
  };

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
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={koreerLogo}
              alt="Koreer Logo"
              sx={{
                height: 40,
                width: 40,
                mr: 1,
              }}
            />
            <Typography
              variant="h4"
              component="span"
              sx={{
                fontWeight: 700,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Koreer
            </Typography>
          </Box>

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
              로그인
            </Typography>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
                {errorMessage}
              </Alert>
            )}

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="이메일"
                value={email}
                onChange={handleEmailChange}
                error={emailValidate === ValidateStatus.UNFILLED}
                helperText={emailValidate === ValidateStatus.UNFILLED ? "이메일을 입력해주세요" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="비밀번호"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                error={passwordValidate === ValidateStatus.UNFILLED}
                helperText={passwordValidate === ValidateStatus.UNFILLED ? "비밀번호를 입력해주세요" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? <CircularProgress size={24} /> : '로그인'}
              </Button>

              {/*<Box sx={{ mt: 2, textAlign: 'center' }}>*/}
              {/*  <Link*/}
              {/*    component={RouterLink}*/}
              {/*    to="/signup"*/}
              {/*    variant="body2"*/}
              {/*    sx={{ textDecoration: 'none' }}*/}
              {/*  >*/}
              {/*    계정이 없으신가요? 회원가입*/}
              {/*  </Link>*/}
              {/*</Box>*/}

              <Divider sx={{ my: 2 }}>또는</Divider>

              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={handleGoogleLogin}
                >
                  Google로 로그인
                </Button>
                {/*<Button*/}
                {/*  fullWidth*/}
                {/*  variant="outlined"*/}
                {/*  startIcon={<GitHub />}*/}
                {/*  onClick={() => /!* TODO: Implement GitHub login *!/}*/}
                {/*>*/}
                {/*  GitHub로 로그인*/}
                {/*</Button>*/}
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
}
