import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../slice/signInSlice";
import {LoginDTO} from "../../types/signIn";
import {ValidateStatus} from "../../types/signup";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {Email, GitHub, Google, Lock, Visibility, VisibilityOff,} from '@mui/icons-material';
import {motion} from 'framer-motion';
import koreerLogo from '../../assets/img/koreer_logo_cropped.png';
import {LoginResponseDTO} from "../../slice/common";
import {useSignInValidator} from "../../components/signup/hooks/useSignInValidator";
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";

interface ErrorResponse{
    message: string;
}

export function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {validate, emailValidate, setEmailValidate, passwordValidate, setPasswordValidate} =
        useSignInValidator({email,password} );
    // const {setAccessToken} = AuthProvider();
    const { setCookie} = useCookieFunctions();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch<any>();

  // @ts-ignore
    const handleLogin = useCallback(async () => {
        const result = validate();
        if(!result) return ;

        const loginDTO:LoginDTO = {user_email: email, password: password}
        try {
            const result: LoginResponseDTO = await dispatch(login(loginDTO)).unwrap();
            setCookie('accessToken', result.accessToken)
            navigate('/')

            return result;
        } catch (error: any) {
            const convert = error as ErrorResponse;
            const parsedMessage = JSON.parse(convert.message);

            setErrorMessage(parsedMessage.message);
        }
        // eslint-disable-next-line
    }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("")
    if (e.target.value.length > 0) {
      setEmailValidate(ValidateStatus.NONE);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
      setErrorMessage("")
    if (e.target.value.length > 0) {
      setPasswordValidate(ValidateStatus.NONE);
    }
  };

  const handleGoogleLogin = () => {
      const redirectUri = `${process.env.REACT_APP_BASE_URL}/auth/google/callback`;
      const googleClientId = '969073700844-r0dbph7gk0e9aqm5868ums9jgddqgvg2.apps.googleusercontent.com'

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
  }

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
              <Alert severity="error" sx={{ mb: 2, whiteSpace:"pre-line"}}>
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

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{ textDecoration: 'none' }}
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                disabled={!validate || isLoading}
                sx={{
                  py: 1.5,
                  mt: 2,
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                  transition: 'all 0.2s',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  '로그인'
                )}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  또는
                </Typography>
                <Divider sx={{ flex: 1 }} />g
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 1,
                    },
                    transition: 'all 0.2s',
                  }}
                  onClick={handleGoogleLogin}
                >
                  Google로 로그인
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHub />}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 1,
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  GitHub로 로그인
                </Button>
              </Stack>
            </Stack>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                아직 계정이 없으신가요?{' '}
                <Link
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  회원가입
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </motion.div>
      <ComponentHelmet title={"Koreer - 로그인"} />
    </Container>
  );
}
