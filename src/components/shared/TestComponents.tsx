import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { InfoCard } from './InfoCard';
import { TextField } from './forms/TextField';
import { PasswordField } from './forms/PasswordField';
import { IdField } from './forms/IdField';
import { NationField } from './forms/NationField';
import { NicknameField } from './forms/NicknameField';
import { PasswordConfirmField } from './forms/PasswordConfirmField';
import { SearchField } from './forms/SearchField';
import { Person, Email, Lock } from '@mui/icons-material';

export const TestComponents: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [nation, setNation] = React.useState('');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Component Test Page
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        InfoCard Variants
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <InfoCard 
            title="Default Card"
            description="This is a default card with status and chips"
            status="info"
            chips={[
              { label: 'Info', color: 'info' },
              { label: 'New', color: 'success' }
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard 
            title="Highlight Card"
            description="This is a highlighted card with stats"
            variant="highlight"
            stats={[
              { label: 'Views', value: '1,234' },
              { label: 'Likes', value: '567' }
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard 
            title="Outline Card"
            description="This is an outlined card with bullet points"
            variant="outline"
            bulletPoints={[
              { text: 'First point', icon: <Person />, color: '#1976d2' },
              { text: 'Second point', icon: <Email />, color: '#2196f3' }
            ]}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Interactive Cards
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfoCard 
            title="Expandable Card"
            description="Click the expand button to see more"
            expandable={true}
            status="success"
          >
            <Typography>
              This is the expanded content that shows when you click the expand button.
              It can contain any React components.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoCard 
            title="Clickable Card"
            description="This entire card is clickable and has an action button"
            onClick={() => alert('Card clicked!')}
            action={{
              label: 'View More',
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                alert('Action clicked!');
              }
            }}
            status="warning"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Form Components
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <IdField 
              placeholder="Enter your ID"
            />
            <NicknameField 
              placeholder="Enter your nickname"
            />
            <TextField 
              label="Email"
              placeholder="Enter email"
              type="email"
              InputProps={{
                startAdornment: <Email color="action" />
              }}
            />
            <PasswordField 
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordConfirmField 
              placeholder="Confirm your password"
              password={password}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <NationField 
              value={nation}
              onChange={setNation}
            />
            <SearchField 
              placeholder="Search..."
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
