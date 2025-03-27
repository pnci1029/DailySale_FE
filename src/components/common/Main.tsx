import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, Paper, Snackbar, TextField, Typography,} from '@mui/material';
import {motion} from 'framer-motion';
import {styled} from '@mui/material/styles';
import koreerLogo from '../../assets/img/koreer_logo_cropped.png';
import {CloudBackground} from './CloudBackground';
import {ParticleBackground} from './ParticleBackground';
import {Business, Code, Explore, Language, Send, TrendingUp,} from '@mui/icons-material';
import {ComponentHelmet} from "../../components/common/ComponentHelmet";
import {ChatBot} from "../../components/common/main/ChatBot";

interface FormData {
  email: string;
  topics: string;
}

// Styled Components
const Logo = styled('img')`
  width: 300px;  // 200px에서 300px로 증가
  height: auto;
  margin-bottom: 1rem;  // 2rem에서 3rem으로 증가
`;

const StyledPaper = styled(Paper)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  z-index: 3;
  padding: 3rem;  // 2rem에서 3rem으로 증가
  border-radius: 20px;  // 16px에서 20px로 증가
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);  // 그림자 강화
  }
`;

const FeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
    }
}));

export default function Main() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    topics: 'tech-trend',
    // category: TopicCategory.TECH,
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
            icon: <TrendingUp color="primary" sx={{ fontSize: 40 }}/>,
            title: "실리콘밸리 최신 동향",
            description: "빅테크 기업의 핵심 채용 및 연봉 트렌드를 한눈에"
        },
        {
            icon: <Language color="primary" sx={{ fontSize: 40 }}/>,
            title: "개발자 비즈니스 영어",
            description: "실무에서 바로 통하는 전문 개발자 영어 표현"
        },
        {
            icon: <Business color="primary" sx={{ fontSize: 40 }}/>,
            title: "기업 인사이트",
            description: "대기업 기술 스택, 면접 공략법, 합격 전략 공개"
        },
        {
            icon: <Explore color="primary" sx={{ fontSize: 40 }}/>,
            title: "실리콘밸리 라이프",
            description: "현지 문화와 개발자 생활의 생생한 리얼 가이드"
        },
        {
            icon: <Code color="primary" sx={{ fontSize: 40 }}/>,
            title: "최신 기술 트렌드",
            description: "AI, 클라우드, 혁신 기술의 최전선 르포르타주"
        }
    ];

  return (
      <Box sx={{
        minHeight: '100vh',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ParticleBackground />
        <CloudBackground />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <Box textAlign="center" mb={12}>
              <Logo src={koreerLogo} alt="Koreer Logo" />
              <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.2rem' }
                  }}
              >
                실리콘밸리의 모든 것
              </Typography>
              <Typography
                  variant="h3"
                  gutterBottom
                  color="primary"
                  sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                매일 아침 메일로 받아보세요
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
                현지 개발자들의 생생한 이야기부터<br />
                실전 면접 준비까지, 여러분의 커리어를 함께 만들어갑니다
              </Typography>
            </Box>

              <Grid container spacing={6} justifyContent="center">
                  <Grid item xs={12} md={8}>
                      <StyledPaper elevation={3}>
                          <Box textAlign="center" mb={6}>
                              <Typography variant="h4" gutterBottom fontWeight="bold">
                                  매주 큐레이션된 실리콘밸리 소식
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                  현지 개발자들이 직접 전하는 생생한 정보를 받아보세요
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
                                              <Box sx={{ textAlign: 'center', mb: 2 }}>
                                                  {feature.icon}
                                              </Box>
                                              <Typography variant="h6" fontWeight="bold" gutterBottom>
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
                                              fontSize: '1.1rem'
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
                                      endIcon={<Send/>}
                                      sx={{
                                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                          color: 'white',
                                          height: '60px',
                                          fontSize: '1.1rem'
                                      }}
                                  >
                                      구독하기
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
                      background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%)',
                      color: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
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
                  <br />곧 실리콘밸리 소식을 받아보세요.
              </Alert>
          </Snackbar>
          <ChatBot/>
          <ComponentHelmet title="Daily Sale - 매일 세상의 모든 할인정보"/>
      </Box>
  );
}