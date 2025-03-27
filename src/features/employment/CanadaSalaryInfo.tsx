import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/shared/layouts/PageLayout';

export function CanadaSalaryInfo() {
  return (
    <PageLayout
      title="캐나다 IT 직군 연봉 정보"
      subtitle="주요 도시별 평균 연봉과 생활비 정보를 확인하세요"
      country="canada"
      category="salary"
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography variant="h4" gutterBottom>
            캐나다 연봉 정보
          </Typography>
          <Typography variant="body1">
            이 페이지는 /salary-info/canada로 이동되었습니다.
          </Typography>
        </Stack>
      </Container>
    </PageLayout>
  );
}
