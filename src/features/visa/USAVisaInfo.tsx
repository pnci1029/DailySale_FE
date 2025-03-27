import React from 'react';
import { Box, Grid, Stack, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/shared/layouts/PageLayout';
import { InfoCard } from '../../components/shared/InfoCard';
import { Flight, AttachMoney, Home, CheckCircle, Warning } from '@mui/icons-material';

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
        '학사 학위 이상',
        '전문 분야 경력',
        '고용주의 스폰서십',
        'LCA 승인'
      ],
      processingTime: '6-8개월',
      cost: '$460 + USCIS 수수료',
      notes: [
        '매년 쿼터 제한 있음',
        '최대 6년 체류 가능',
        '배우자 취업 가능 (H-4 EAD)',
        '영주권 신청 가능'
      ],
      status: 'info'
    },
    {
      title: 'L-1 비자',
      description: '주재원 비자',
      requirements: [
        '1년 이상 해외 근무',
        '관리자급 이상',
        '본사와의 관계 증명',
        '미국 법인 존재'
      ],
      processingTime: '2-3개월',
      cost: '$460 + USCIS 수수료',
      notes: [
        'L-1A (관리자): 최대 7년',
        'L-1B (전문가): 최대 5년',
        '배우자 취업 가능 (L-2)',
        '영주권 전환 용이'
      ],
      status: 'success'
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
              primary="비자 정보는 정기적으로 업데이트되며, 실제 정책과 차이가 있을 수 있습니다. 정확한 정보는 미국 대사관 또는 이민국 웹사이트를 참고해주세요."
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
