import { PageLayout } from '../shared/layouts/PageLayout';
import { Box, Grid, Stack, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import { Flight, AttachMoney, Home, CheckCircle, Warning } from '@mui/icons-material';

export function CanadaVisaInfo() {
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
    { label: '캐나다', path: '/visa-info/canada' },
    { label: '비자 정보' }
  ];

  const visaTypes = [
    {
      title: 'LMIA Work Permit',
      description: '고용 영향 평가 기반 취업 비자',
      requirements: [
        '고용주의 LMIA 승인',
        '학사 학위 이상',
        '관련 분야 경력',
        '영어/프랑스어 능력 증명'
      ],
      processingTime: '2-4개월',
      cost: 'CAD 155',
      notes: [
        'LMIA 면제 가능한 경우도 있음',
        '배우자는 Open Work Permit 신청 가능',
        '최대 3년까지 체류 가능',
        'Express Entry 지원 가능'
      ],
      status: 'info'
    },
    {
      title: 'Express Entry',
      description: '영주권 취득을 위한 이민 프로그램',
      requirements: [
        'CRS 점수 충족',
        '학력 평가 (ECA)',
        '언어 능력 증명',
        '경력 증명'
      ],
      processingTime: '6개월 이내',
      cost: 'CAD 1,325',
      notes: [
        'CRS 점수는 정기적으로 변동됨',
        '주정부 추천 프로그램(PNP)과 연계 가능',
        '배우자 점수도 포함 가능',
        '영주권 직접 취득'
      ],
      status: 'success'
    },
    {
      title: 'Global Talent Stream',
      description: '고급 기술 인력 빠른 입국',
      requirements: [
        'Category A 또는 B 해당',
        '연봉 기준 충족',
        '고용주의 노동 시장 영향 평가',
        '인재 육성 계획'
      ],
      processingTime: '2주 이내',
      cost: 'CAD 1,000',
      notes: [
        '빠른 비자 처리',
        '가족 동반 가능',
        '영주권 전환 용이',
        '고용주 지원 필수'
      ],
      status: 'info'
    }
  ];

  return (
      <PageLayout
          title="캐나다 취업 비자 정보"
          subtitle="비자 종류별 상세 정보와 신청 절차를 확인하세요"
          tabs={navigationTabs}
          breadcrumbs={breadcrumbs}
      >
        <Stack spacing={4}>
          <Grid container spacing={3}>
            {visaTypes.map((visa, index) => (
                <Grid item xs={12} key={index}>
                  <InfoCard
                      title={visa.title}
                      subtitle={visa.description}
                      status={visa.status as 'info' | 'warning' | 'success'}
                      icon={<Flight />}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <List dense>
                          {visa.requirements.map((req, idx) => (
                              <ListItem key={idx}>
                                <ListItemIcon>
                                  <CheckCircle color="success" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={req} />
                              </ListItem>
                          ))}
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                          <Box>
                            <Chip
                                label={`처리 기간: ${visa.processingTime}`}
                                color="primary"
                                variant="outlined"
                            />
                          </Box>
                          <Box>
                            <Chip
                                label={`비용: ${visa.cost}`}
                                color="primary"
                                variant="outlined"
                            />
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                            sx={{
                              p: 2,
                              bgcolor: 'background.default',
                              borderRadius: 2,
                            }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Warning color="warning" />
                            <ListItemText primary="주의사항" />
                          </Stack>
                          <List dense>
                            {visa.notes.map((note, idx) => (
                                <ListItem key={idx}>
                                  <ListItemText
                                      primary={note}
                                      primaryTypographyProps={{
                                        variant: 'body2',
                                        color: 'text.secondary',
                                      }}
                                  />
                                </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Grid>
                    </Grid>
                  </InfoCard>
                </Grid>
            ))}
          </Grid>

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
              <ListItemText
                  primary="비자 정보는 정기적으로 업데이트되며, 실제 정책과 차이가 있을 수 있습니다. 정확한 정보는 캐나다 대사관 또는 이민국 웹사이트를 참고해주세요."
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary',
                  }}
              />
            </Stack>
          </Box>
        </Stack>
      </PageLayout>
  );
}
