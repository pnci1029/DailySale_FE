import { PageLayout } from '../shared/layouts/PageLayout';
import {
  Box,
  Grid,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Flight,
  AttachMoney,
  Home,
  CheckCircle,
  Warning,
  Timeline,
  School,
  Business,
  Assignment,
} from '@mui/icons-material';

export function USAVisaInfo() {
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
    { label: '미국', path: '/visa-info/usa' },
    { label: '비자 정보' }
  ];

  const visaTypes = [
    {
      title: 'H-1B 비자',
      description: '전문직 취업 비자',
      requirements: [
        '학사 학위 이상 또는 동등한 경력',
        '전문 분야 관련 학위/경력',
        '고용주의 스폰서십',
        'LCA (Labor Condition Application) 승인',
        '연간 급여가 해당 직종의 일반적 급여(prevailing wage) 이상'
      ],
      processingTime: '6-8개월 (일반) / 15일 (프리미엄)',
      cost: [
        'USCIS 기본 수수료: $460',
        'ACWIA 수수료: $750 또는 $1,500',
        '사기 방지 수수료: $500',
        '프리미엄 처리 (선택): $2,500'
      ],
      validity: '최초 3년, 추가 3년 연장 가능 (총 6년)',
      notes: [
        '매년 85,000개 쿼터 제한 (일반 65,000 + 석사 이상 20,000)',
        '배우자 H-4 비자로 입국 가능 (특정 조건 하에 취업 허가)',
        '고용주 변경 가능 (새로운 H-1B 청원 필요)',
        '영주권 신청 가능',
        '매년 4월 1일 접수 시작 (10월 1일부터 근무 가능)'
      ],
      status: 'info'
    },
    {
      title: 'L-1 비자',
      description: '주재원 비자',
      requirements: [
        '해외 지사에서 1년 이상 근무',
        'L-1A (관리자/임원): 조직 관리 경험',
        'L-1B (전문가): 특수 지식 보유',
        '미국 법인 또는 지사 존재',
        '실제 사업장 운영 증명'
      ],
      processingTime: '2-3개월 (일반) / 15일 (프리미엄)',
      cost: [
        'USCIS 기본 수수료: $460',
        '사기 방지 수수료: $500',
        'IMMACT 90 수수료: $500',
        '프리미엄 처리 (선택): $2,500'
      ],
      validity: 'L-1A: 최초 3년, 총 7년까지 연장 / L-1B: 최초 3년, 총 5년까지 연장',
      notes: [
        '쿼터 제한 없음',
        '배우자 L-2 비자로 취업 가능 (별도 취업 허가 필요)',
        '신규 지사 설립의 경우 최초 1년만 승인',
        'Blanket L 가능 (대기업의 경우)',
        '영주권 신청 용이 (특히 L-1A)'
      ],
      status: 'success'
    },
    {
      title: 'E-3 비자',
      description: '호주 전문직 비자',
      requirements: [
        '호주 시민권자',
        '학사 학위 이상',
        '전문직 취업 제안',
        'LCA 승인'
      ],
      processingTime: '2-4주',
      cost: [
        '비자 신청 수수료: $205',
        'SEVIS 수수료: $220'
      ],
      validity: '2년 (무제한 갱신 가능)',
      notes: [
        '연간 10,500개 쿼터 (거의 채워지지 않음)',
        '배우자 취업 가능',
        '비이민 의도 증명 필요',
        '호주 시민권자 전용'
      ],
      status: 'info'
    }
  ];

  const visaProcess = [
    {
      title: '1단계: 고용 제안',
      description: '미국 기업으로부터 공식 고용 제안을 받습니다.',
      icon: <Business />
    },
    {
      title: '2단계: LCA 신청',
      description: '고용주가 노동부에 LCA를 신청하고 승인받습니다. (7-10일 소요)',
      icon: <Assignment />
    },
    {
      title: '3단계: 비자 청원',
      description: '고용주가 USCIS에 비자 청원서를 제출합니다.',
      icon: <Timeline />
    },
    {
      title: '4단계: 비자 인터뷰',
      description: '미국 대사관에서 비자 인터뷰를 진행합니다.',
      icon: <School />
    }
  ];

  const usefulLinks = [
    {
      title: 'USCIS 공식 웹사이트',
      url: 'https://www.uscis.gov/',
      description: '이민국 공식 정보 및 서식'
    },
    {
      title: '미국 노동부',
      url: 'https://www.dol.gov/',
      description: 'LCA 신청 및 임금 정보'
    },
    {
      title: '주한미국대사관',
      url: 'https://kr.usembassy.gov/',
      description: '비자 신청 및 인터뷰 정보'
    }
  ];

  return (
    <PageLayout
      title="미국 취업 비자 정보"
      subtitle="비자 종류별 상세 정보와 신청 절차를 확인하세요"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={4}>
        {/* 비자 종류 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            주요 취업 비자 종류
          </Typography>
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
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        필수 요건
                      </Typography>
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
                          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            처리 기간
                          </Typography>
                          <Typography variant="body2">
                            {visa.processingTime}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            비용
                          </Typography>
                          <List dense>
                            {visa.cost.map((cost, idx) => (
                              <ListItem key={idx}>
                                <ListItemText primary={cost} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            유효 기간
                          </Typography>
                          <Typography variant="body2">
                            {visa.validity}
                          </Typography>
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
                          <Typography variant="subtitle1" fontWeight="bold">
                            주요 참고사항
                          </Typography>
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
        </Box>

        {/* 비자 신청 절차 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            비자 신청 절차
          </Typography>
          <Grid container spacing={3}>
            {visaProcess.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 유용한 링크 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            유용한 링크
          </Typography>
          <Grid container spacing={3}>
            {usefulLinks.map((link, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {link.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {link.description}
                  </Typography>
                  <Button
                    component={Link}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                  >
                    방문하기
                  </Button>
                </Box>
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
              비자 정보는 정기적으로 업데이트되며, 실제 정책과 차이가 있을 수 있습니다.
              가장 정확한 정보는 미국 대사관 또는 이민국 웹사이트를 참고해주세요.
              전문적인 법률 자문이 필요한 경우 이민 변호사와 상담하시기를 권장합니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
