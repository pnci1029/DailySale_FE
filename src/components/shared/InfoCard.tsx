import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

type AppearanceVariant = 'default' | 'highlight' | 'outline';
type CardVariant = 'elevation' | 'outlined';

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => !['appearanceVariant'].includes(prop as string),
})<{ appearanceVariant?: AppearanceVariant }>(({ theme, appearanceVariant }) => ({
  height: '100%',
  ...(appearanceVariant === 'highlight' && {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }),
  ...(appearanceVariant === 'outline' && {
    border: `1px solid ${theme.palette.divider}`,
  }),
}));

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'info';
  expandable?: boolean;
  children?: React.ReactNode;
  action?: React.ReactNode | {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
  chips?: Array<{
    label: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  }>;
  bulletPoints?: Array<{
    text: string;
    icon?: React.ReactNode;
    color?: string;
  }>;
  description?: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
  onClick?: () => void;
  className?: string;
  variant?: AppearanceVariant;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  icon,
  status = 'info',
  expandable = false,
  children,
  action,
  chips,
  bulletPoints,
  description,
  stats,
  onClick,
  className,
  variant = 'default'
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const renderAction = () => {
    if (!action) return null;
    if (React.isValidElement(action)) return action;
    if (typeof action === 'object' && 'label' in action) {
      return (
        <Typography
          component="button"
          onClick={(e) => {
            e.stopPropagation();
            action.onClick(e);
          }}
          sx={{ 
            cursor: 'pointer', 
            color: theme.palette.primary.main,
            border: 'none',
            background: 'none',
            padding: 0,
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
        >
          {action.label}
        </Typography>
      );
    }
    return null;
  };

  const cardContent = (
    <>
      {description && (
        <Typography sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}

      {chips && chips.length > 0 && (
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              color={chip.color || 'default'}
              size="small"
            />
          ))}
        </Box>
      )}

      {stats && stats.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {stats.map((stat, index) => (
            <Box key={index}>
              <Typography variant="h6">{stat.value}</Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {bulletPoints && bulletPoints.length > 0 && (
        <List>
          {bulletPoints.map((point, index) => (
            <ListItem key={index}>
              {point.icon && (
                <ListItemIcon sx={{ color: point.color }}>
                  {point.icon}
                </ListItemIcon>
              )}
              <ListItemText primary={point.text} />
            </ListItem>
          ))}
        </List>
      )}

      {children}
    </>
  );

  const muiVariant: CardVariant = variant === 'outline' ? 'outlined' : 'elevation';

  const cardProps = {
    className,
    onClick,
    elevation: variant === 'outline' ? 0 : 1,
    variant: muiVariant,
    appearanceVariant: variant,
  };

  const card = (
    <StyledCard {...cardProps}>
      <CardHeader
        avatar={icon}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {renderAction()}
            {expandable && (
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            )}
          </Box>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getStatusIcon()}
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
        }
        subheader={subtitle}
      />
      
      <CardContent>
        {cardContent}
      </CardContent>

      {expandable && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {children}
          </CardContent>
        </Collapse>
      )}
    </StyledCard>
  );

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {card}
      </motion.div>
    );
  }

  return card;
};
