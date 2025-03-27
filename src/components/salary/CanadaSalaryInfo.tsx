import { PageLayout } from '../shared/layouts/PageLayout';
import { Box, Grid, Stack, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Home,
  Flight,
  AttachMoney,
  Warning,
  CheckCircle,
  Work,
  BusinessCenter,
  Timeline,
} from '@mui/icons-material';

export function CanadaSalaryInfo() {
  const navigationTabs = [
    {
      label: '비자 정보',
      path: '/visa-info/canada',
      icon: <Flight />
    },
    {
      label: '연봉 정보',
      path: '/salary-info/canada',
      icon: <AttachMoney />
    },
    {
      label: '생활 정보',
      path: '/life-info/canada',
      icon: <Home />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '캐나다', path: '/salary-info/canada' },
    { label: '연봉 정보' }
  ];

  const salaryByRole = [
    {
      role: '소프트웨어 엔지니어',
      icon: <Work />,
      levels: [
        {
          level: 'Junior (0-3년)',
          salary: {
            toronto: 'CAD 65,000-85,000',
            vancouver: 'CAD 60,000-80,000',
            montreal: 'CAD 55,000-75,000',
          },
          benefits: [
            '의료/치과 보험',
            'RRSP 매칭',
            '유급 휴가 15-20일',
            '성과 보너스'
          ]
        },
        {
          level: 'Mid-Level (3-5년)',
          salary: {
            toronto: 'CAD 85,000-120,000',
            vancouver: 'CAD 80,000-115,000',
            montreal: 'CAD 75,000-110,000',
          },
          benefits: [
            '추가 의료 혜택',
            '높은 RRSP 매칭',
            '교육비 지원',
            '재택근무 옵션'
          ]
        },
        {
          level: 'Senior (5년+)',
          salary: {
            toronto: 'CAD 120,000-180,000+',
            vancouver: 'CAD 115,000-170,000+',
            montreal: 'CAD 110,000-160,000+',
          },
          benefits: [
            '리더십 보너스',
            '주식 옵션',
            'sabbatical 휴가',
            '건강관리 프로그램'
          ]
        }
      ]
    },
    {
      role: '프론트엔드 개발자',
      icon: <Work />,
      levels: [
        {
          level: 'Junior (0-3년)',
          salary: {
            toronto: 'CAD 60,000-80,000',
            vancouver: 'CAD 55,000-75,000',
            montreal: 'CAD 50,000-70,000',
          },
          benefits: [
            '기본 의료보험',
            'RRSP',
            '유급 휴가',
            '교통비 지원'
          ]
        },
        {
          level: 'Mid-Level (3-5년)',
          salary: {
            toronto: 'CAD 80,000-110,000',
            vancouver: 'CAD 75,000-105,000',
            montreal: 'CAD 70,000-100,000',
          },
          benefits: [
            '확장된 의료혜택',
            'RRSP 매칭',
            '성과 보너스',
            '유연 근무'
          ]
        }
      ]
    },
    {
      role: '백엔드 개발자',
      icon: <Work />,
      levels: [
        {
          level: 'Junior (0-3년)',
          salary: {
            toronto: 'CAD 63,000-83,000',
            vancouver: 'CAD 58,000-78,000',
            montreal: 'CAD 53,000-73,000',
          },
          benefits: [
            '의료보험',
            'RRSP',
            '유급 휴가',
            '재택근무'
          ]
        },
        {
          level: 'Mid-Level (3-5년)',
          salary: {
            toronto: 'CAD 83,000-115,000',
            vancouver: 'CAD 78,000-110,000',
            montreal: 'CAD 73,000-105,000',
          },
          benefits: [
            '추가 보험 혜택',
            'RRSP 매칭',
            '성과 보너스',
            '전문성 개발 지원'
          ]
        }
      ]
    }
  ];

  const compensationTips = [
    {
      title: '협상 전략',
      icon: <BusinessCenter />,
      tips: [
        '시장 평균 연봉 조사',
        '복리후생 패키지 검토',
        'RRSP 매칭 비율 확인',
        '의료보험 범위 확인'
      ]
    },
    {
      title: '경력 개발',
      icon: <Timeline />,
      tips: [
        '기술 인증 취득',
        '프로젝트 포트폴리오 구축',
        '전문가 네트워크 형성',
        '업계 컨퍼런스 참여'
      ]
    }
  ];

  const taxInfo = {
    title: '세금 정보',
    icon: <AttachMoney />,
    details: [
      {
        category: '연방세',
        info: [
          '소득 구간별 차등 적용',
          '15-33% 세율 범위',
          'T4 슬립으로 신고',
          '다양한 공제 항목'
        ]
      },
      {
        category: '주세',
        info: [
          '주별 세율 상이',
          '온타리오 13.16% 최대',
          'GST/HST 환급',
          '의료보험료 별도'
        ]
      }
    ]
  };

  return (
    <PageLayout
      title="캐나다 연봉 정보"
      subtitle="직무별 연봉 범위와 혜택 정보"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={6}>
        {/* 직무별 연봉 정보 */}
        {salaryByRole.map((roleInfo, index) => (
          <Box key={index}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              {roleInfo.role}
            </Typography>
            <Grid container spacing={3}>
              {roleInfo.levels.map((level, lidx) => (
                <Grid item xs={12} md={4} key={lidx}>
                  <InfoCard
                    title={level.level}
                    icon={roleInfo.icon}
                    status="info"
                  >
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>연봉 범위</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText primary={`토론토: ${level.salary.toronto}`} />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary={`밴쿠버: ${level.salary.vancouver}`} />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary={`몬트리올: ${level.salary.montreal}`} />
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>혜택</Typography>
                        <List dense>
                          {level.benefits.map((benefit, bidx) => (
                            <ListItem key={bidx}>
                              <ListItemIcon>
                                <CheckCircle color="success" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={benefit} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Stack>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* 세금 정보 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            {taxInfo.title}
          </Typography>
          <Grid container spacing={3}>
            {taxInfo.details.map((detail, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={detail.category}
                  icon={taxInfo.icon}
                  status="info"
                >
                  <List dense>
                    {detail.info.map((item, iidx) => (
                      <ListItem key={iidx}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 협상 및 경력 개발 팁 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            협상 및 경력 개발
          </Typography>
          <Grid container spacing={3}>
            {compensationTips.map((tip, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={tip.title}
                  icon={tip.icon}
                  status="info"
                >
                  <List dense>
                    {tip.tips.map((item, iidx) => (
                      <ListItem key={iidx}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 주의사항 */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Warning color="info" />
            <Typography variant="body2" color="text.secondary">
              제시된 연봉 범위는 일반적인 기준이며, 회사, 지역, 경력, 기술 스택 등에 따라 
              실제 금액은 차이가 있을 수 있습니다. 최신 시장 동향과 구체적인 정보는 
              Glassdoor, PayScale 등의 사이트를 참고하시기 바랍니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
