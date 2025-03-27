import { motion } from 'framer-motion';
import { Box, Typography, Container, useTheme } from '@mui/material';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export function PageTitle({ title, subtitle, align = 'center' }: PageTitleProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 6,
        pt: 4,
        pb: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.primary.light}15, transparent)`
            : `linear-gradient(135deg, ${theme.palette.primary.dark}15, transparent)`,
          borderRadius: 2,
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: align,
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: subtitle ? 2 : 0,
                background: theme.palette.mode === 'light'
                  ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                  : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: align === 'center' ? '50%' : align === 'right' ? 'auto' : 0,
                  right: align === 'right' ? 0 : 'auto',
                  transform: align === 'center' ? 'translateX(-50%)' : 'none',
                  width: align === 'center' ? '60%' : '40%',
                  height: 4,
                  background: theme.palette.mode === 'light'
                    ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                    : `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  borderRadius: '2px',
                  animation: 'shimmer 2s infinite',
                },
                '@keyframes shimmer': {
                  '0%': {
                    backgroundPosition: '-200% center',
                  },
                  '100%': {
                    backgroundPosition: '200% center',
                  },
                },
              }}
            >
              {title}
            </Typography>
          </motion.div>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                component="p"
                color="text.secondary"
                sx={{
                  mt: 2,
                  maxWidth: 600,
                  mx: align === 'center' ? 'auto' : 0,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: align === 'center' ? '50%' : align === 'right' ? 'auto' : 0,
                    right: align === 'right' ? 0 : 'auto',
                    transform: align === 'center' ? 'translateX(-50%)' : 'none',
                    width: 40,
                    height: 2,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    opacity: 0.5,
                  },
                }}
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
}
