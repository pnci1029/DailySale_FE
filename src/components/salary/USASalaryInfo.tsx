import { PageLayout } from '../shared/layouts/PageLayout';
import {
  Box,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Link,
  Card,
  CardContent,
} from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Flight,
  AttachMoney,
  Home,
  TrendingUp,
  LocationOn,
  Work,
  School,
  Info,
  Computer,
  Engineering,
  Architecture,
  DataObject,
  CloudQueue,
  Security,
} from '@mui/icons-material';

export function USASalaryInfo() {
  const navigationTabs = [
    {
      label: '비자 정보',
      path: '/visa-info/usa',
      icon: <Flight />
    },
    {
      label: '연봉 정보',
      path: '/salary-info/usa',
      icon: <AttachMoney />
    },
    {
      label: '생활 정보',
      path: '/life-info/usa',
      icon: <Home />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '미국', path: '/salary-info/usa' },
    { label: '연봉 정보' }
  ];

  const salaryData = [
    {
      role: '소프트웨어 엔지니어',
      icon: <Computer />,
      levels: [
        {
          level: '주니어 (0-3년)',
          range: '$80,000 - $120,000',
          total: '$100,000 - $150,000',
          details: [
            '기본급: $80,000 - $120,000',
            '스톡옵션: $10,000 - $30,000',
            '보너스: $5,000 - $15,000',
            '401(k) 매칭: 최대 6%'
          ]
        },
        {
          level: '미드레벨 (3-5년)',
          range: '$120,000 - $180,000',
          total: '$150,000 - $250,000',
          details: [
            '기본급: $120,000 - $180,000',
            '스톡옵션: $20,000 - $50,000',
            '보너스: $15,000 - $30,000',
            '401(k) 매칭: 최대 6%'
          ]
        },
        {
          level: '시니어 (5년+)',
          range: '$150,000 - $250,000',
          total: '$200,000 - $400,000',
          details: [
            '기본급: $150,000 - $250,000',
            '스톡옵션: $50,000 - $150,000',
            '보너스: $30,000 - $50,000',
            '401(k) 매칭: 최대 6%'
          ]
        }
      ]
    },
    {
      role: '데브옵스/클라우드 엔지니어',
      icon: <CloudQueue />,
      levels: [
        {
          level: '주니어 (0-3년)',
          range: '$85,000 - $130,000',
          total: '$105,000 - $160,000',
          details: [
            '기본급: $85,000 - $130,000',
            '스톡옵션: $10,000 - $30,000',
            '보너스: $5,000 - $15,000',
            '401(k) 매칭: 최대 6%'
          ]
        },
        {
          level: '미드레벨 (3-5년)',
          range: '$130,000 - $190,000',
          total: '$160,000 - $260,000',
          details: [
            '기본급: $130,000 - $190,000',
            '스톡옵션: $20,000 - $50,000',
            '보너스: $15,000 - $30,000',
            '401(k) 매칭: 최대 6%'
          ]
        },
        {
          level: '시니어 (5년+)',
          range: '$160,000 - $260,000',
          total: '$210,000 - $420,000',
          details: [
            '기본급: $160,000 - $260,000',
            '스톡옵션: $50,000 - $150,000',
            '보너스: $30,000 - $50,000',
            '401(k) 매칭: 최대 6%'
          ]
        }
      ]
    },
    {
      role: '보안 엔지니어',
      icon: <Security />,
      levels: [
        {
          level: '주니어 (0-3년)',
          range: '$90,000 - $140,000',
          total: '$110,000 - $170,000',
          details: [
            '기본급: $90,000 - $140,000',
            '스톡옵션: $10,000 - $30,000',
            '보너스: $5,000 - $15,000',
            '401(k) 매칭: 최대 6%'
          ]
        },
        {
          level: '미드레벨 (3-5년)',
          range: '$140,000 - $200,000',
          total: '$170,000 - $270,000',
          details: [
            '기본급: $140,000 - $200,000',
            '스톡옵션: $20,000 - $50,000',
            '보너스: $15,000 - $30,000',
            '401(k) 매칭: 최대 6%'
          ]
        },
        {
          level: '시니어 (5년+)',
          range: '$170,000 - $270,000',
          total: '$220,000 - $430,000',
          details: [
            '기본급: $170,000 - $270,000',
            '스톡옵션: $50,000 - $150,000',
            '보너스: $30,000 - $50,000',
            '401(k) 매칭: 최대 6%'
          ]
        }
      ]
    }
  ];

  const locationFactors = [
    {
      location: '샌프란시스코/실리콘밸리',
      multiplier: '1.0x (기준)',
      costOfLiving: '매우 높음',
      notes: [
        '미국 내 최고 수준의 연봉',
        '높은 생활비 (특히 주거비)',
        '최고 수준의 기술 기업 밀집',
        '경쟁이 매우 치열함'
      ]
    },
    {
      location: '뉴욕/시애틀',
      multiplier: '0.9-1.0x',
      costOfLiving: '높음',
      notes: [
        '실리콘밸리와 비슷한 수준의 연봉',
        '높은 생활비',
        '다양한 산업의 기술 기업',
        '경쟁이 치열함'
      ]
    },
    {
      location: '보스턴/LA/시카고',
      multiplier: '0.8-0.9x',
      costOfLiving: '중상',
      notes: [
        '실리콘밸리 대비 80-90% 수준',
        '중상 수준의 생활비',
        '성장하는 기술 산업',
        '적절한 워라밸'
      ]
    },
    {
      location: '기타 대도시',
      multiplier: '0.7-0.8x',
      costOfLiving: '중',
      notes: [
        '실리콘밸리 대비 70-80% 수준',
        '적정한 생활비',
        'emerging tech hub',
        '좋은 워라밸'
      ]
    }
  ];

  const benefitsInfo = [
    {
      category: '건강 관련',
      benefits: [
        '의료 보험 (Medical Insurance)',
        '치과 보험 (Dental Insurance)',
        '안과 보험 (Vision Insurance)',
        'HSA/FSA 계좌 지원',
        '생명 보험'
      ]
    },
    {
      category: '휴가 및 복지',
      benefits: [
        'PTO (Paid Time Off) 15-20일',
        '병가 (Sick Leave)',
        '유급 육아 휴직',
        '재택 근무 옵션',
        '연말연시 회사 전체 휴가'
      ]
    },
    {
      category: '재정 지원',
      benefits: [
        '401(k) 은퇴 연금 및 회사 매칭',
        'ESPP (직원 주식 구매 프로그램)',
        'RSU (제한된 주식 유닛)',
        '교육비 지원',
        '이사 비용 지원'
      ]
    }
  ];

  const compensationTips = [
    {
      title: '협상 전략',
      tips: [
        '현지 평균 연봉 데이터 준비',
        '총 보상 패키지 고려',
        '경쟁사 오퍼 활용',
        '사인온 보너스 요청 고려'
      ]
    },
    {
      title: '보상 구조 이해',
      tips: [
        '기본급 vs 총 보상 차이',
        '주식 보상 베스팅 일정',
        '보너스 지급 조건',
        '세금 고려사항'
      ]
    }
  ];

  return (
    <PageLayout
      title="미국 IT 업계 연봉 정보"
      subtitle="직무별, 경력별 연봉 범위와 지역별 차이를 확인하세요"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={4}>
        {/* 직무별 연봉 정보 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            직무별 연봉 범위
          </Typography>
          <Grid container spacing={3}>
            {salaryData.map((role, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      pb: 2,
                      mb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      {role.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {role.role}
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      {role.levels.map((level, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                          <Card 
                            variant="outlined"
                            sx={{
                              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                              transition: 'transform 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                              },
                            }}
                          >
                            <CardContent>
                              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {level.level}
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                p: 2, 
                                bgcolor: 'primary.light', 
                                borderRadius: 1,
                                color: 'white',
                                mb: 2
                              }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                  기본급: {level.range}
                                </Typography>
                                <Typography variant="subtitle2">
                                  총 보상: {level.total}
                                </Typography>
                              </Box>
                              <List dense>
                                {level.details.map((detail, detailIdx) => (
                                  <ListItem key={detailIdx} sx={{
                                    borderBottom: detailIdx !== level.details.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                                    py: 1
                                  }}>
                                    <ListItemText
                                      primary={detail}
                                      primaryTypographyProps={{
                                        variant: 'body2',
                                        color: 'text.secondary',
                                        sx: { fontWeight: 500 }
                                      }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 지역별 연봉 차이 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            지역별 연봉 차이
          </Typography>
          <Grid container spacing={3}>
            {locationFactors.map((location, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    transition: 'transform 0.2s ease-in-out',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        pb: 2,
                        borderBottom: '2px solid',
                        borderColor: 'primary.light'
                      }}>
                        <LocationOn color="primary" sx={{ fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {location.location}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        p: 1.5, 
                        bgcolor: 'primary.light', 
                        borderRadius: 1,
                        color: 'white',
                        textAlign: 'center'
                      }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {location.multiplier}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ 
                          textAlign: 'center',
                          fontWeight: 600,
                          bgcolor: 'grey.100',
                          py: 0.5,
                          borderRadius: 1
                        }}
                      >
                        생활비: {location.costOfLiving}
                      </Typography>
                      <List dense sx={{ mt: 1 }}>
                        {location.notes.map((note, noteIdx) => (
                          <ListItem key={noteIdx} sx={{
                            borderBottom: noteIdx !== location.notes.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                            py: 1
                          }}>
                            <ListItemText
                              primary={note}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary',
                                sx: { fontWeight: 500 }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 복리후생 정보 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            일반적인 복리후생
          </Typography>
          <Grid container spacing={3}>
            {benefitsInfo.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      color="primary"
                      sx={{ 
                        pb: 2,
                        mb: 2,
                        borderBottom: '2px solid',
                        borderColor: 'primary.light',
                        fontWeight: 600
                      }}
                    >
                      {category.category}
                    </Typography>
                    <List dense>
                      {category.benefits.map((benefit, benefitIdx) => (
                        <ListItem key={benefitIdx} sx={{
                          borderBottom: benefitIdx !== category.benefits.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                          py: 1
                        }}>
                          <ListItemIcon>
                            <Info color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={benefit}
                            primaryTypographyProps={{
                              variant: 'body2',
                              sx: { fontWeight: 500 }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 연봉 협상 팁 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            연봉 협상 팁
          </Typography>
          <Grid container spacing={3}>
            {compensationTips.map((tipCategory, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      color="primary"
                      sx={{ 
                        pb: 2,
                        mb: 2,
                        borderBottom: '2px solid',
                        borderColor: 'primary.light',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <TrendingUp color="primary" />
                      {tipCategory.title}
                    </Typography>
                    <List dense>
                      {tipCategory.tips.map((tip, tipIdx) => (
                        <ListItem key={tipIdx} sx={{
                          borderBottom: tipIdx !== tipCategory.tips.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                          py: 1
                        }}>
                          <ListItemIcon>
                            <TrendingUp color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={tip}
                            primaryTypographyProps={{
                              variant: 'body2',
                              sx: { fontWeight: 500 }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 참고사항 */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            bgcolor: 'primary.50',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Info color="primary" sx={{ fontSize: 24 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              연봉 정보는 2024년 기준이며, 회사의 규모, 위치, 개인의 경력과 기술력 등에 따라 차이가 있을 수 있습니다.
              더 정확한 정보는 Glassdoor, Levels.fyi, Blind 등의 플랫폼을 참고하시기 바랍니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
