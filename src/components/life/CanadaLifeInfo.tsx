import { PageLayout } from '../shared/layouts/PageLayout';
import { Box, Grid, Stack, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Home,
  Flight,
  AttachMoney,
  LocalHospital,
  School,
  DirectionsCar,
  AccountBalance,
  LocationCity,
  Warning,
  CheckCircle,
  AcUnit,
  WbSunny,
} from '@mui/icons-material';

export function CanadaLifeInfo() {
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
    { label: '캐나다', path: '/life-info/canada' },
    { label: '생활 정보' }
  ];

  const cityInfo = [
    {
      city: '토론토',
      description: '캐나다 최대 도시, IT 산업의 중심지',
      pros: [
        '다양한 취업 기회',
        '문화적 다양성',
        '높은 삶의 질',
        '우수한 교육 환경'
      ],
      cons: [
        '높은 생활비',
        '주택 가격 상승',
        '혼잡한 교통',
        '긴 겨울'
      ],
      weather: '여름 평균 22°C, 겨울 평균 -7°C',
      costOfLiving: {
        rent: 'CAD 2,000-3,500 (1베드룸)',
        utilities: 'CAD 150-200',
        transport: 'CAD 156 (월간 패스)',
        food: 'CAD 400-600 (월)',
      }
    },
    {
      city: '밴쿠버',
      description: '태평양 연안의 아름다운 도시',
      pros: [
        '온화한 기후',
        '자연과의 근접성',
        '높은 삶의 질',
        '다문화 환경'
      ],
      cons: [
        '매우 높은 주거비',
        '잦은 강우',
        '제한적인 일자리',
        '높은 생활비'
      ],
      weather: '여름 평균 18°C, 겨울 평균 3°C',
      costOfLiving: {
        rent: 'CAD 2,200-3,800 (1베드룸)',
        utilities: 'CAD 130-180',
        transport: 'CAD 100 (월간 패스)',
        food: 'CAD 450-650 (월)',
      }
    }
  ];

  const lifeCategories = [
    {
      title: '의료 시스템',
      icon: <LocalHospital />,
      points: [
        {
          subtitle: '공공 의료보험 (MSP)',
          details: [
            '3개월 대기 기간 후 가입 가능',
            '기본적인 의료 서비스 무상 제공',
            '치과, 안과는 별도 보험 필요',
            '응급실 이용 무료'
          ]
        },
        {
          subtitle: '사설 의료보험',
          details: [
            '치과, 안과 치료 보장',
            '처방약 비용 보장',
            '물리치료 등 보조 의료 서비스',
            '여행자 보험 포함 가능'
          ]
        }
      ]
    },
    {
      title: '교육 시스템',
      icon: <School />,
      points: [
        {
          subtitle: '공립 교육',
          details: [
            'K-12 무상 교육',
            '높은 교육 수준',
            '다국어 교육 지원',
            'ESL 프로그램 제공'
          ]
        },
        {
          subtitle: '고등 교육',
          details: [
            '세계적 수준의 대학들',
            '다양한 장학금 기회',
            '실무 중심 교육',
            '졸업 후 취업 연계'
          ]
        }
      ]
    },
    {
      title: '교통 시스템',
      icon: <DirectionsCar />,
      points: [
        {
          subtitle: '대중교통',
          details: [
            '효율적인 버스/지하철 시스템',
            '월간/연간 패스 할인',
            '학생/노인 할인',
            '공항 연계 교통'
          ]
        },
        {
          subtitle: '자가용',
          details: [
            '한국 운전면허 교환 가능',
            '겨울용 타이어 필수',
            '자동차 보험 비용 높음',
            '주차 비용 고려 필요'
          ]
        }
      ]
    },
    {
      title: '금융 시스템',
      icon: <AccountBalance />,
      points: [
        {
          subtitle: '은행 계좌',
          details: [
            '주요 은행 한국어 서비스',
            '학생/이민자 특별 계좌',
            '온라인 뱅킹 보편화',
            '신용카드 발급 조건'
          ]
        },
        {
          subtitle: '세금',
          details: [
            'GST/HST (소비세)',
            '소득세 신고 의무',
            '세금 환급 제도',
            '연금 제도 (CPP)'
          ]
        }
      ]
    }
  ];

  const seasonalTips = [
    {
      season: '여름 (6-8월)',
      icon: <WbSunny />,
      tips: [
        '에어컨 사용 계획',
        '야외 활동 및 페스티벌 참여',
        '자외선 차단제 필수',
        '공원/해변 활용'
      ]
    },
    {
      season: '겨울 (12-2월)',
      icon: <AcUnit />,
      tips: [
        '겨울용 의류 준비',
        '실내 난방 관리',
        '겨울 운전 주의사항',
        '제설 도구 구비'
      ]
    }
  ];

  return (
    <PageLayout
      title="캐나다 생활 정보"
      subtitle="도시별 생활 정보와 정착 가이드"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={6}>
        {/* 도시 정보 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            주요 도시 정보
          </Typography>
          <Grid container spacing={3}>
            {cityInfo.map((city, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={city.city}
                  subtitle={city.description}
                  icon={<LocationCity />}
                  status="info"
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>장점</Typography>
                      <List dense>
                        {city.pros.map((pro, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CheckCircle color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={pro} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>단점</Typography>
                      <List dense>
                        {city.cons.map((con, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <Warning color="error" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={con} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>생활비</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Chip label={`월세: ${city.costOfLiving.rent}`} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={`공과금: ${city.costOfLiving.utilities}`} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={`교통비: ${city.costOfLiving.transport}`} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={`식비: ${city.costOfLiving.food}`} sx={{ mb: 1 }} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 생활 카테고리 */}
        {lifeCategories.map((category, index) => (
          <Box key={index}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              {category.title}
            </Typography>
            <Grid container spacing={3}>
              {category.points.map((point, pidx) => (
                <Grid item xs={12} md={6} key={pidx}>
                  <InfoCard
                    title={point.subtitle}
                    icon={category.icon}
                    status="info"
                  >
                    <List dense>
                      {point.details.map((detail, didx) => (
                        <ListItem key={didx}>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={detail} />
                        </ListItem>
                      ))}
                    </List>
                  </InfoCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* 계절별 팁 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            계절별 생활 팁
          </Typography>
          <Grid container spacing={3}>
            {seasonalTips.map((season, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={season.season}
                  icon={season.icon}
                  status="info"
                >
                  <List dense>
                    {season.tips.map((tip, tidx) => (
                      <ListItem key={tidx}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
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
              제공된 정보는 일반적인 가이드라인이며, 지역과 시기에 따라 차이가 있을 수 있습니다.
              최신 정보는 캐나다 정부 공식 웹사이트나 현지 기관을 통해 확인하시기 바랍니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
