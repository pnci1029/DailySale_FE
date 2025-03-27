import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Container,
  Drawer,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen,
  Flight,
  Work,
  School,
  AttachMoney,
} from '@mui/icons-material';
import { useState } from 'react';

interface EmploymentLayoutProps {
  children: React.ReactNode;
}

export function EmploymentLayout({ children }: EmploymentLayoutProps) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationLinks = [
    {
      section: 'usa',
      title: '미국',
      icon: <Flight />,
      links: [
        { path: '/visa-info/usa', label: '미국 비자', icon: <Flight /> },
        { path: '/salary-info/usa', label: '미국 연봉', icon: <AttachMoney /> },
        { path: '/life-info/usa', label: '현지 생활 정보', icon: <Work /> }
      ]
    },
    {
      section: 'canada',
      title: '캐나다',
      icon: <Flight />,
      links: [
        { path: '/visa-info/canada', label: '캐나다 비자', icon: <Flight /> },
        { path: '/salary-info/canada', label: '캐나다 연봉', icon: <AttachMoney /> },
        { path: '/life-info/canada', label: '현지 생활 정보', icon: <Work /> }
      ]
    },
    {
      section: 'interview',
      title: '면접',
      icon: <School />,
      links: [
        { path: '/interview-guide', label: '면접 준비', icon: <School /> }
      ]
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationContent = (
    <List>
      {navigationLinks.map((section) => (
        <Box key={section.section}>
          <Typography
            variant="subtitle2"
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            {section.title}
          </Typography>
          {section.links.map((link) => (
            <ListItemButton
              key={link.path}
              component={Link}
              to={link.path}
              selected={location.pathname === link.path}
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === link.path ? 'inherit' : 'text.secondary',
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                }}
              />
            </ListItemButton>
          ))}
        </Box>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            left: 16,
            top: 80,
            zIndex: 1200,
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
            },
          }}
        >
          {mobileOpen ? <MenuOpen /> : <MenuIcon />}
        </IconButton>
      )}

      <Box
        component="nav"
        sx={{
          width: { md: 280 },
          flexShrink: { md: 0 },
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: 280,
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
              },
            }}
          >
            {navigationContent}
          </Drawer>
        ) : (
          <Paper
            elevation={0}
            sx={{
              width: 280,
              position: 'fixed',
              top: 64,
              bottom: 0,
              left: 0,
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflowY: 'auto',
            }}
          >
            {navigationContent}
          </Paper>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 2, md: 3 },
          pb: 3,
          width: { md: `calc(100% - 280px)` },
          ml: { md: '280px' },
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
