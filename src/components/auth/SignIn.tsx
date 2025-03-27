import {Link as RouterLink} from 'react-router-dom';
import React, {useCallback, useState} from 'react';
import {Alert, Box, Button, CircularProgress, Container, Paper, Stack, Typography,} from '@mui/material';
import {Google} from '@mui/icons-material';
import {motion} from 'framer-motion';
import dailySaleLogo from '../../assets/img/daily_sale_logo.png';


export function SignIn() {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = useCallback(() => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const redirectUri = `${process.env.REACT_APP_BASE_URL}/auth/google/callback`;
            const googleClientId = '969073700844-r0dbph7gk0e9aqm5868ums9jgddqgvg2.apps.googleusercontent.com';
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
        } catch (error: any) {
            setErrorMessage(error.message || '로그인에 실패했습니다');
            setIsLoading(false);
        }
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #FFFCF2 0%, #FFF4D2 100%)',
                py: 4
            }}
        >
            <Container component="main" maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
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
                                mb: 4,
                            }}
                        >
                            <Box
                                component="img"
                                src={dailySaleLogo}
                                alt="Daily Sale Logo"
                                sx={{
                                    height: 50,
                                    width: 50,
                                    mr: 1.5,
                                }}
                            />
                            <Typography
                                variant="h4"
                                component="span"
                                sx={{
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Daily Sale
                            </Typography>
                        </Box>

                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                width: '100%',
                                borderRadius: 4,
                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 205, 0, 0.3)',
                                boxShadow: '0 8px 20px rgba(242, 151, 39, 0.15)',
                            }}
                        >
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                                fontWeight={600}
                                sx={{
                                    color: '#F29727',
                                    mb: 4
                                }}
                            >
                                로그인
                            </Typography>

                            {errorMessage && (
                                <Alert severity="error" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
                                    {errorMessage}
                                </Alert>
                            )}

                            <Stack spacing={3}>
                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Daily Sale의 할인 정보를 받아보시려면 로그인해주세요
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<Google />}
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    sx={{
                                        py: 1.5,
                                        background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                        color: 'white',
                                        boxShadow: '0 4px 10px rgba(242, 151, 39, 0.2)',
                                        borderRadius: 2,
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #E18617 30%, #EFBD00 90%)',
                                            boxShadow: '0 6px 12px rgba(242, 151, 39, 0.3)',
                                            transform: 'translateY(-2px)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Google로 로그인'}
                                </Button>
                            </Stack>

                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    로그인하시면 매일 새로운 할인 정보를 받아보실 수 있습니다
                                </Typography>
                            </Box>
                        </Paper>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                © {new Date().getFullYear()} Daily Sale. All rights reserved.
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}