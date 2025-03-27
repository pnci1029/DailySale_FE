import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

interface InfoPageLayoutProps {
  title: string;
  subtitle?: string;
  country: 'usa' | 'canada';
  category: 'visa' | 'salary' | 'life';
  headerImage?: string;
  headerComponent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}

export function InfoPageLayout({
  title,
  subtitle,
  country,
  category,
  headerImage,
  headerComponent,
  sidebarContent,
  children,
}: InfoPageLayoutProps) {
  const theme = useTheme();

  const countryName = country === 'usa' ? '미국' : '캐나다';
  const categoryName = {
    visa: '비자 정보',
    salary: '연봉 정보',
    life: '생활 정보',
  }[category];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: { xs: 2, md: 3 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 3 }}
          >
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="hover"
            >
              홈
            </Link>
            <Link
              component={RouterLink}
              to={`/${category}-info/${country}`}
              color="inherit"
              underline="hover"
            >
              {countryName}
            </Link>
            <Typography color="text.primary">{categoryName}</Typography>
          </Breadcrumbs>

          <Box
            sx={{
              position: 'relative',
              mb: 4,
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[1],
            }}
          >
            {headerImage && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  backgroundImage: `url(${headerImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.15,
                }}
              />
            )}

            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 4 },
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </Typography>

              {subtitle && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 800, mx: 'auto', mb: 2 }}
                >
                  {subtitle}
                </Typography>
              )}

              {headerComponent}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: sidebarContent ? { xs: '1fr', md: '2fr 1fr' } : '1fr',
              gap: 4,
            }}
          >
            <Box>{children}</Box>
            {sidebarContent && (
              <Box
                sx={{
                  position: { xs: 'static', md: 'sticky' },
                  top: 24,
                  alignSelf: 'start',
                }}
              >
                {sidebarContent}
              </Box>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
