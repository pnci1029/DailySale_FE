import React from 'react';
import { Box, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { EmploymentLayout } from '../../components/shared/layouts/EmploymentLayout';
import { InfoCard } from '../../components/shared/InfoCard';
import {
  Work,
  Assignment,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';

export function WorkPermit() {
  const workPermitTypes = [
    {
      title: 'H-1B 취업 허가',
      description: '미국 전문직 취업비자 워크퍼밋',
      points: [
        '연간 쿼터 제한 있음',
        '최대 6년 체류 가능',
        '배우자 취업 가능 (H-4 EAD)',
        '고용주 스폰서십 필요',
      ],
      requirements: [
        '학사 학위 이상',
        '관련 전공/경력',
        '고용주의 LCA 승인',
        'USCIS 승인',
      ],
    },
    {
      title: 'LMIA 워크퍼밋',
      description: '캐나다 고용주 지원 워크퍼밋',
      points: [
        '쿼터 제한 없음',
        '최대 3년 체류 가능',
        '배우자 오픈 워크퍼밋',
        'PR 전환 유리',
      ],
      requirements: [
        '고용주의 LMIA 승인',
        '학력/경력 증명',
        '언어 능력 증명',
        '자격증 (해당시)',
      ],
    },
    {
      title: 'IEC 워킹홀리데이',
      description: '캐나다 청년 취업 프로그램',
      points: [
        '만 18-30세 대상',
        '최대 2년 체류',
        '자유로운 취업 활동',
        '연 2회 선발',
      ],
      requirements: [
        '연령 제한',
        '범죄 기록 없음',
        '건강 검진',
        '충분한 정착 자금',
      ],
    },
  ];

  const processSteps = [
    {
      title: '자격 요건 확인',
      description: '필요 서류와 자격 요건을 확인하세요',
      icon: <Assignment />,
    },
    {
      title: '고용주 스폰서십',
      description: '취업 오퍼와 스폰서십을 확보하세요',
      icon: <Work />,
    },
    {
      title: '신청서 제출',
      description: '필요한 모든 서류를 준비하여 제출하세요',
      icon: <Info />,
    },
    {
      title: '심사 및 승인',
      description: '심사 결과를 기다리고 승인을 받으세요',
      icon: <CheckCircle />,
    },
  ];

  return (
    <EmploymentLayout>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            취업 허가 안내
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            미국과 캐나다의 취업 허가 절차와 요구사항을 확인하세요
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {workPermitTypes.map((type, index) => (
            <Grid item xs={12} md={4} key={index}>
              <InfoCard
                title={type.title}
                subtitle={type.description}
                status="info"
                icon={<Work />}
                expandable
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      주요 특징
                    </Typography>
                    {type.points.map((point, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <CheckCircle color="success" fontSize="small" />
                        <Typography variant="body2">{point}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      필수 요건
                    </Typography>
                    {type.requirements.map((req, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Info color="info" fontSize="small" />
                        <Typography variant="body2">{req}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Stack>
              </InfoCard>
            </Grid>
          ))}
        </Grid>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            신청 절차
          </Typography>
          <Grid container spacing={3}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <InfoCard
                  title={`Step ${index + 1}`}
                  subtitle={step.title}
                  icon={step.icon}
                  status="info"
                >
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <InfoCard
          title="주의사항"
          status="warning"
          icon={<Warning />}
          expandable
        >
          <Stack spacing={2}>
            <Typography variant="body2">
              • 모든 서류는 영문으로 준비해야 합니다.
            </Typography>
            <Typography variant="body2">
              • 처리 기간은 국가와 비자 종류에 따라 다릅니다.
            </Typography>
            <Typography variant="body2">
              • 고용주의 지원이 필수적인 경우가 많습니다.
            </Typography>
            <Typography variant="body2">
              • 비자 승인이 보장되지 않으므로 충분한 준비가 필요합니다.
            </Typography>
          </Stack>
        </InfoCard>
      </Stack>
    </EmploymentLayout>
  );
}
