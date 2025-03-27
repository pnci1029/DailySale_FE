import { useNavigate } from 'react-router-dom';
import { EmploymentLayout } from '../shared/layouts/EmploymentLayout';
import { InfoCard } from '../shared/InfoCard';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  AccessTime,
  CheckCircleOutline,
  Campaign,
  Warning,
  Info,
} from '@mui/icons-material';

interface InfoCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export function EmploymentInfo() {
  const navigate = useNavigate();

  const infoCards: InfoCard[] = [
    {
      title: "미국 취업 정보",
      description: "미국 취업에 필요한 비자, 연봉, 기업 정보를 확인하세요",
      icon: "🇺🇸",
      path: "/visa-info/usa",
      stats: [
        { label: "평균 연봉", value: "$120K+" },
        { label: "비자 처리기간", value: "2-3개월" },
        { label: "취업 성공률", value: "85%" }
      ]
    },
    {
      title: "캐나다 취업 정보",
      description: "캐나다 워크퍼밋, 연봉, 기업 정보를 확인하세요",
      icon: "🇨🇦",
      path: "/visa-info/canada",
      stats: [
        { label: "평균 연봉", value: "C$90K+" },
        { label: "비자 처리기간", value: "1-2개월" },
        { label: "취업 성공률", value: "90%" }
      ]
    },
    {
      title: "면접 준비 가이드",
      description: "기술 면접부터 인성 면접까지 완벽 준비",
      icon: "💼",
      path: "/interview-guide",
      stats: [
        { label: "합격률", value: "75%" },
        { label: "준비기간", value: "2-3개월" },
        { label: "만족도", value: "95%" }
      ]
    }
  ];

  const quickLinks = [
    { title: "최신 채용 정보", icon: <Campaign />, path: "/employment-info#latest" },
    { title: "연봉 정보", icon: <TrendingUp />, path: "/salary-info/usa" },
    { title: "비자 가이드", icon: <Info />, path: "/visa-info/usa" },
    { title: "인터뷰 팁", icon: <Info />, path: "/interview-guide" }
  ];

  return (
    <EmploymentLayout>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            해외 취업 정보
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            미국과 캐나다 취업에 필요한 모든 정보를 확인하세요
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            bgcolor: 'background.default',
            borderRadius: 2,
            border: 1,
            borderColor: 'divider'
          }}
        >
          <Grid container spacing={2}>
            {quickLinks.map((link, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      transform: 'translateY(-2px)',
                      '& .MuiSvgIcon-root': {
                        color: 'primary.contrastText',
                      }
                    },
                    transition: 'all 0.2s'
                  }}
                  onClick={() => navigate(link.path)}
                >
                  {link.icon}
                  <Typography variant="subtitle2" fontWeight={500}>
                    {link.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {infoCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <InfoCard
                title={card.title}
                subtitle={card.description}
                status="info"
                icon={<Info />}
                expandable
              >
                <Stack spacing={2}>
                  <Typography variant="h1" sx={{ fontSize: '2rem', mb: 1 }}>
                    {card.icon}
                  </Typography>
                  {card.stats && (
                    <Grid container spacing={2}>
                      {card.stats.map((stat, idx) => (
                        <Grid item xs={12} key={idx}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 1.5,
                              bgcolor: 'background.default',
                              borderRadius: 1,
                              border: 1,
                              borderColor: 'divider'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {idx === 0 ? <TrendingUp color="primary" /> :
                               idx === 1 ? <AccessTime color="warning" /> :
                               <CheckCircleOutline color="success" />}
                              <Typography variant="body2" color="text.secondary">
                                {stat.label}
                              </Typography>
                            </Box>
                            <Typography variant="subtitle2" fontWeight="medium">
                              {stat.value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Warning />
                    <Typography variant="body2">
                      자세한 정보는 각 섹션을 참고하세요
                    </Typography>
                  </Box>
                </Stack>
              </InfoCard>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </EmploymentLayout>
  );
}
