import { ReactNode, ReactElement } from 'react';
import { Box, Container, Paper, Tabs, Tab, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface TabItem {
  label: string;
  path: string;
  icon?: ReactElement;
}

interface SubNavLayoutProps {
  children: ReactNode;
  tabs: TabItem[];
  basePath: string;
}

export function SubNavLayout({ children, tabs, basePath }: SubNavLayoutProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const currentTab = tabs.findIndex(tab => currentPath.includes(tab.path));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`${basePath}${tabs[newValue].path}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Paper
        elevation={0}
        sx={{
          position: 'sticky',
          top: 64, // AppBar height
          zIndex: theme.zIndex.appBar - 1,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Tabs
            value={currentTab !== -1 ? currentTab : 0}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 48,
                py: 1,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{
                  minHeight: 48,
                  textTransform: 'none',
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              />
            ))}
          </Tabs>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
