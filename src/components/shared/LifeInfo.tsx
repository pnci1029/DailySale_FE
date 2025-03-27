import {
  Box,
  Grid,
  Typography,
  Stack,
  Rating,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { InfoPageLayout } from './layouts/InfoPageLayout';
import { InfoCard } from './InfoCard';

interface CostItem {
  item: string;
  cost: string;
  note?: string;
}

interface AreaInfo {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  rating: number;
  costLevel: number;
  safetyLevel: number;
  transitScore: number;
}

interface CategoryCosts {
  category: string;
  icon: React.ReactNode;
  items: CostItem[];
}

interface LifeInfoProps {
  country: 'usa' | 'canada';
  livingCosts: CategoryCosts[];
  popularAreas: AreaInfo[];
  healthcareInfo: React.ReactNode;
  educationInfo: React.ReactNode;
  transportationInfo: React.ReactNode;
  additionalInfo?: React.ReactNode;
}

export function LifeInfo({
  country,
  livingCosts,
  popularAreas,
  healthcareInfo,
  educationInfo,
  transportationInfo,
  additionalInfo,
}: LifeInfoProps) {
  const theme = useTheme();

  const renderProgressBar = (value: number, color = 'primary') => (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 8,
        borderRadius: 4,
        bgcolor: theme.palette.grey[200],
        '& .MuiLinearProgress-bar': {
          bgcolor: `${color}.main`,
        },
      }}
    />
  );

  return (
    <InfoPageLayout
      title={`${country === 'usa' ? '미국' : '캐나다'} 생활 정보`}
      subtitle="현지 생활에 필요한 모든 정보를 확인하세요"
      country={country}
      category="life"
      headerImage={`/path/to/${country}-life-header.jpg`}
    >
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            생활비 정보
          </Typography>
          <Grid container spacing={3}>
            {livingCosts.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={category.category}
                  icon={category.icon}
                  status="info"
                >
                  <List>
                    {category.items.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemText
                          primary={item.item}
                          secondary={item.note}
                          primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: 500,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="primary"
                          fontWeight="600"
                        >
                          {item.cost}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            인기 거주 지역
          </Typography>
          <Grid container spacing={3}>
            {popularAreas.map((area, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InfoCard
                  title={area.name}
                  subtitle={area.description}
                  status="info"
                  expandable
                >
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        전반적인 평가
                      </Typography>
                      <Rating value={area.rating} readOnly precision={0.5} />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        생활비 수준
                      </Typography>
                      {renderProgressBar(area.costLevel)}
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        치안
                      </Typography>
                      {renderProgressBar(area.safetyLevel, 'success')}
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        대중교통
                      </Typography>
                      {renderProgressBar(area.transitScore, 'info')}
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="success.main" gutterBottom>
                          장점
                        </Typography>
                        <List dense>
                          {area.pros.map((pro, idx) => (
                            <ListItem key={idx} disablePadding>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'success.main',
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={pro} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="error.main" gutterBottom>
                          단점
                        </Typography>
                        <List dense>
                          {area.cons.map((con, idx) => (
                            <ListItem key={idx} disablePadding>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'error.main',
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={con} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>
                  </Stack>
                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            의료 정보
          </Typography>
          {healthcareInfo}
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            교육 정보
          </Typography>
          {educationInfo}
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            교통 정보
          </Typography>
          {transportationInfo}
        </Box>

        {additionalInfo && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              추가 정보
            </Typography>
            {additionalInfo}
          </Box>
        )}
      </Stack>
    </InfoPageLayout>
  );
}
