import React from 'react';
import { InfoPageLayout } from './layouts/InfoPageLayout';
import { InfoCard } from './InfoCard';
import {
  Box,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  LocationCity,
  Work,
  School,
  Business,
  Star,
} from '@mui/icons-material';

interface SalaryRange {
  min: number;
  avg: number;
  max: number;
}

interface JobRole {
  title: string;
  level: string;
  salaryRange: SalaryRange;
  requirements: string[];
  companies: string[];
  benefits: string[];
}

interface LocationData {
  city: string;
  salaryAdjustment: number;
  costOfLiving: number;
  opportunities: number;
}

interface SalaryInfoProps {
  country: 'usa' | 'canada';
  currency: string;
  jobRoles: JobRole[];
  locations: LocationData[];
  additionalInfo?: React.ReactNode;
}

export function SalaryInfo({ country, currency, jobRoles, locations, additionalInfo }: SalaryInfoProps) {
  const theme = useTheme();

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderSalaryBar = (role: JobRole) => {
    const range = role.salaryRange.max - role.salaryRange.min;
    const avgPosition = ((role.salaryRange.avg - role.salaryRange.min) / range) * 100;

    return (
      <Box sx={{ mt: 2, mb: 1, position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.palette.grey[200],
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        />
        <Box
          sx={{
            width: 3,
            height: 16,
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: -4,
            left: `${avgPosition}%`,
            transform: 'translateX(-50%)',
            borderRadius: 4,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formatSalary(role.salaryRange.min)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatSalary(role.salaryRange.max)}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <InfoPageLayout
      title={`${country === 'usa' ? '미국' : '캐나다'} IT 직군 연봉 정보`}
      subtitle="직무별 평균 연봉과 지역별 급여 수준을 확인하세요"
      country={country}
      category="salary"
      headerImage={`/path/to/${country}-salary-header.jpg`}
    >
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            직무별 연봉 정보
          </Typography>
          <Grid container spacing={3}>
            {jobRoles.map((role, index) => (
              <Grid item xs={12} key={index}>
                <InfoCard
                  title={role.title}
                  subtitle={role.level}
                  status="info"
                  icon={<Work />}
                  chips={[
                    { label: '평균 연봉', color: 'primary' },
                    { label: formatSalary(role.salaryRange.avg), color: 'success' },
                  ]}
                >
                  {renderSalaryBar(role)}
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" gutterBottom>
                        주요 요구사항
                      </Typography>
                      <List dense disablePadding>
                        {role.requirements.map((req, idx) => (
                          <ListItem key={idx} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <School fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={req} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" gutterBottom>
                        주요 채용 기업
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {role.companies.map((company, idx) => (
                          <Chip
                            key={idx}
                            label={company}
                            size="small"
                            icon={<Business />}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" gutterBottom>
                        주요 혜택
                      </Typography>
                      <List dense disablePadding>
                        {role.benefits.map((benefit, idx) => (
                          <ListItem key={idx} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Star fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={benefit} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            지역별 급여 수준
          </Typography>
          <Grid container spacing={3}>
            {locations.map((location, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <InfoCard
                  title={location.city}
                  icon={<LocationCity />}
                  status="info"
                  chips={[
                    { 
                      label: `${location.salaryAdjustment >= 0 ? '+' : ''}${location.salaryAdjustment}%`, 
                      color: location.salaryAdjustment >= 0 ? 'success' : 'error' 
                    },
                  ]}
                >
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        생활비 지수
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={location.costOfLiving}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        채용 기회
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={location.opportunities}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                  </Stack>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {additionalInfo && (
          <Box>
            <Typography variant="h5" gutterBottom>
              추가 정보
            </Typography>
            {additionalInfo}
          </Box>
        )}
      </Stack>
    </InfoPageLayout>
  );
}
