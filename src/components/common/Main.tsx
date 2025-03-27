import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, Paper, Snackbar, TextField, Typography,} from '@mui/material';
import {motion} from 'framer-motion';
import {styled} from '@mui/material/styles';
import dailySaleLogo from '../../assets/img/daily_sale_logo.png';
import {CloudBackground} from './CloudBackground';
import {ParticleBackground} from './ParticleBackground';
import {Discount, LocalOffer, NotificationsActive, PriceCheck, ShoppingCart} from '@mui/icons-material';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {ChatBot} from "../../components/common/main/ChatBot";

interface FormData {
    email: string;
    topics: string;
}

// Styled Components
const Logo = styled('img')`
    width: 180px;
    height: auto;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 8px rgba(242, 151, 39, 0.3));
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05) rotate(2deg);
        filter: drop-shadow(0 6px 12px rgba(242, 151, 39, 0.4));
    }
`;

const StyledPaper = styled(Paper)`
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
    z-index: 3;
    padding: 3rem;
    border-radius: 20px;
    border: 2px solid rgba(242, 151, 39, 0.4);
    box-shadow: 0 8px 25px rgba(242, 151, 39, 0.2);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(242, 151, 39, 0.25);
        border: 2px solid rgba(242, 151, 39, 0.6);
    }
`;

const FeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(242, 151, 39, 0.2)',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '5px',
        background: 'linear-gradient(90deg, #F29727, #FFCD00)',
    },
    '&:hover': {
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: '0 15px 30px rgba(242, 151, 39, 0.2)',
        '& .MuiSvgIcon-root': {
            transform: 'scale(1.1) rotate(5deg)',
        }
    }
}));

export default function Main() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        topics: 'daily-sale',
    });
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // 이전 오류 초기화

        // 이메일 유효성 검사
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // 이메일 검증
        if (!formData.email.trim()) {
            setError("이메일을 입력해주세요.");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setError("올바른 이메일 형식이 아닙니다.");
            return;
        }

        try {
            // 서버 요청 데이터 준비
            const requestData = {
                user_email: formData.email,
            };

            // 구독 API 호출
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/subscriber/subscribers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // 응답 오류 처리
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '구독 신청에 실패했습니다.');
            }

            // 성공 처리
            setFormData(prev => ({
                ...prev,
                email: '' // 이메일 입력란 초기화
            }));
            setOpenSnackbar(true);

        } catch (error) {
            // 오류 처리
            const errorMessage = error instanceof Error ? error.message : '구독 신청 중 오류가 발생했습니다.';
            setError(errorMessage);
            console.error('구독 오류:', error);
        }
    };

    const features = [
        {
            icon: <Discount sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "오늘의 특가 세일",
            description: "매일 업데이트되는 다양한 카테고리의 최저가 특가 정보"
        },
        {
            icon: <ShoppingCart sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "쇼핑몰 쿠폰 정보",
            description: "주요 쇼핑몰의 할인 쿠폰 및 프로모션 코드 안내"
        },
        {
            icon: <LocalOffer sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "카테고리별 할인",
            description: "식품, 생활용품, 가전제품 등 분야별 맞춤 할인 정보"
        },
        {
            icon: <NotificationsActive sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "타임세일 알림",
            description: "놓치면 후회하는 파격 타임세일 실시간 알림 서비스"
        },
        {
            icon: <PriceCheck sx={{ fontSize: 40, color: '#F29727' }}/>,
            title: "가격 비교 분석",
            description: "동일 상품의 플랫폼별 가격 비교로 현명한 소비 안내"
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            background: 'linear-gradient(135deg, #FFF4D2 0%, #FFE8B3 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <ParticleBackground />
            <CloudBackground />

            {/* 추가 애니메이션 요소들 */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}>
                {/* 떨어지는 할인 태그 애니메이션 */}
                {Array.from({ length: 15 }).map((_, index) => (
                    <Box
                        key={`discount-tag-${index}`}
                        sx={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `-100px`,
                            color: index % 3 === 0 ? '#F29727' : index % 3 === 1 ? '#FFCD00' : '#FFA41B',
                            fontSize: `${Math.random() * 30 + 20}px`,
                            opacity: 0.6,
                            transform: `rotate(${Math.random() * 60 - 30}deg)`,
                            animation: `fall ${Math.random() * 20 + 10}s linear ${Math.random() * 10}s infinite`,
                            '@keyframes fall': {
                                '0%': {
                                    transform: `translateY(0) rotate(${Math.random() * 60 - 30}deg)`,
                                    opacity: 0
                                },
                                '10%': {
                                    opacity: 0.6
                                },
                                '90%': {
                                    opacity: 0.6
                                },
                                '100%': {
                                    transform: `translateY(${window.innerHeight + 200}px) rotate(${Math.random() * 360}deg)`,
                                    opacity: 0
                                }
                            }
                        }}
                    >
                        {index % 5 === 0 ? '🏷️' : index % 5 === 1 ? '💰' : index % 5 === 2 ? '🛒' : index % 5 === 3 ? '🔖' : '💯'}
                    </Box>
                ))}

                {/* 반짝이는 별 효과 */}
                {Array.from({ length: 20 }).map((_, index) => (
                    <Box
                        key={`star-${index}`}
                        sx={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 3}px`,
                            height: `${Math.random() * 10 + 3}px`,
                            borderRadius: '50%',
                            backgroundColor: index % 2 === 0 ? '#FFCD00' : '#F29727',
                            animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out ${Math.random() * 2}s infinite alternate`,
                            '@keyframes twinkle': {
                                '0%': {
                                    opacity: 0.3,
                                    transform: 'scale(1)'
                                },
                                '100%': {
                                    opacity: 0.8,
                                    transform: 'scale(1.5)'
                                }
                            }
                        }}
                    />
                ))}
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box textAlign="center" mb={12}>
                        <Logo src={dailySaleLogo} alt="Daily Sale Logo" />
                        <Typography
                            variant="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '2.5rem', md: '3.2rem' },
                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            매일 세상의 모든 할인정보
                        </Typography>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                color: '#F29727'
                            }}
                        >
                            이메일로 한번에 받아보세요
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            mb={6}
                            sx={{
                                lineHeight: 1.8,
                                fontSize: { xs: '1.1rem', md: '1.3rem' }
                            }}
                        >
                            특가 세일부터 숨겨진 할인 코드까지<br />
                            현명한 소비를 위한 모든 정보를 매일 아침 전해드립니다
                        </Typography>
                    </Box>

                    <Grid container spacing={6} justifyContent="center">
                        <Grid item xs={12} md={8}>
                            <StyledPaper elevation={3}>
                                <Box textAlign="center" mb={6}>
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        fontWeight="bold"
                                        sx={{ color: '#F29727' }}
                                    >
                                        매일 큐레이션된 할인 정보
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        세일 정보를 찾아 헤매는 시간을 아껴드립니다
                                    </Typography>
                                </Box>

                                <Grid container spacing={3} sx={{ mb: 6 }}>
                                    {features.map((feature, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                <FeatureCard>
                                                    <Box sx={{
                                                        textAlign: 'center',
                                                        mb: 2,
                                                        '& .MuiSvgIcon-root': {
                                                            transition: 'all 0.3s ease',
                                                            filter: 'drop-shadow(0 3px 5px rgba(242, 151, 39, 0.3))'
                                                        }
                                                    }}>
                                                        {feature.icon}
                                                    </Box>
                                                    <Typography
                                                        variant="h6"
                                                        fontWeight="bold"
                                                        gutterBottom
                                                        sx={{ color: '#333' }}
                                                    >
                                                        {feature.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {feature.description}
                                                    </Typography>
                                                </FeatureCard>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>

                                <form onSubmit={handleSubmit}>
                                    <Box sx={{position: 'relative'}}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="이메일 주소를 입력하세요"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }));
                                                setError(''); // 입력 시 오류 메시지 초기화
                                            }}
                                            error={!!error}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: '60px',
                                                    fontSize: '1.1rem',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 205, 0, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#FFCD00',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#F29727',
                                                    },
                                                }
                                            }}
                                        />
                                        {error && (
                                            <Typography
                                                color="error"
                                                variant="body2"
                                                sx={{
                                                    position: 'absolute',
                                                    mt: 1,
                                                    ml: 2,
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {error}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box sx={{display: 'flex', gap: 2, mt: error ? 3 : 2}}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            endIcon={<NotificationsActive/>}
                                            sx={{
                                                background: 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)',
                                                color: 'white',
                                                height: '60px',
                                                fontSize: '1.1rem',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #E18617 30%, #EFBD00 90%)',
                                                    boxShadow: '0 4px 8px rgba(242, 151, 39, 0.3)'
                                                }
                                            }}
                                        >
                                            할인 정보 구독하기
                                        </Button>
                                    </Box>
                                </form>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    top: '30% !important',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Alert
                    severity="success"
                    sx={{
                        width: 'auto',
                        minWidth: '400px',
                        background: 'linear-gradient(135deg, #FFCD00 0%, #F29727 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(242, 151, 39, 0.2)',
                        fontSize: '1.2rem',
                        padding: '15px 30px',
                        '& .MuiAlert-icon': {
                            fontSize: '2.5rem',
                            color: 'white'
                        },
                        '& .MuiAlert-message': {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    }}
                >
                    🎉 구독 신청 완료!
                    <br />곧 할인 정보를 받아보실 수 있습니다.
                </Alert>
            </Snackbar>
            <ChatBot/>
            <ComponentHelmet title="Daily Sale - 매일 세상의 모든 할인정보"/>
        </Box>
    );
}