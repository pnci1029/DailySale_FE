import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookieFunctions} from './hooks/useCookieFunctions';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AttachMoney,
  ChevronRight,
  Code,
  ExpandMore,
  Flight,
  Forum,
  Home,
  Login,
  Logout,
  Menu as MenuIcon,
  Person,
  School,
  WorkOutline,
} from '@mui/icons-material';
import logo from '../../assets/img/daily_sale_logo.png';

export enum HeaderStatus {
  ABOUT_US = "ABOUT_US",
  COMPANY_INFORMATION = "COMPANY_INFORMATION",
  EMPLOYMENT_INFO = "EMPLOYMENT_INFO",
  COMMUNITY = "COMMUNITY",
  CONTACT = "CONTACT",
  NONE = "NONE",
  SEMINAR_INFO = "SEMINAR_INFO",
  MEMBERSHIP = "MEMBERSHIP",
}

interface BaseMenuItem {
  label: string;
  icon: JSX.Element;
  path: string;
}

interface SubMenuItem extends BaseMenuItem {}

interface SubMenuGroup extends BaseMenuItem {
  subItems: SubMenuItem[];
}

interface MenuItem extends BaseMenuItem {
  status: HeaderStatus;
  subItems?: SubMenuGroup[];
}

const MENU_CLOSE_DELAY = 300; // milliseconds

const menuItems: MenuItem[] = [
  // {
  //   label: '멤버십',
  //   icon: <Person />,
  //   path: '/membership',
  //   status: HeaderStatus.MEMBERSHIP,
  //   subItems: [
  //     {
  //       label: '멤버십 안내',
  //       icon: <Person />,
  //       path: '/membership',
  //       subItems: []
  //     },
  //     {
  //       label: '세미나',
  //       icon: <School />,
  //       path: '/seminar-info',
  //       subItems: []
  //     }
  //   ]
  // },
  {
    label: '해외취업',
    icon: <WorkOutline />,
    path: '/employment-info',
    status: HeaderStatus.EMPLOYMENT_INFO,
    subItems: [
      {
        label: '미국',
        icon: <Flight />,
        path: '/visa-info/usa',
        subItems: [
          { label: "미국 비자", icon: <Flight />, path: '/visa-info/usa' },
          { label: "미국 연봉", icon: <AttachMoney />, path: '/salary-info/usa' },
          { label: "현지 생활 정보", icon: <Home />, path: '/life-info/usa' }
        ]
      },
      {
        label: '캐나다',
        icon: <Flight />,
        path: '/visa-info/canada',
        subItems: [
          { label: "캐나다 비자", icon: <Flight />, path: '/visa-info/canada' },
          { label: "캐나다 연봉", icon: <AttachMoney />, path: '/salary-info/canada' },
          { label: "현지 생활 정보", icon: <Home />, path: '/life-info/canada' }
        ]
      },
      {
        label: '면접 준비',
        icon: <School />,
        path: '/interview-guide',
        subItems: [
          { label: "기술 면접", icon: <Code />, path: '/interview-guide/technical' },
          { label: "인성 면접", icon: <Person />, path: '/interview-guide/behavioral' },
          { label: "코딩 테스트", icon: <Code />, path: '/interview-guide/coding' }
        ]
      }
    ]
  },
  // {
  //   label: '회사 찾기',
  //   icon: <Business />,
  //   path: '/company-information',
  //   status: HeaderStatus.COMPANY_INFORMATION,
  // },
  {
    label: '커뮤니티',
    icon: <Forum />,
    path: '/community',
    status: HeaderStatus.COMMUNITY,
    subItems: [
      {
        label: "커뮤니티",
        icon: <Forum />,
        path: '/community',
        subItems: []
      },
      // {
      //   label: "취업 팁 공유",
      //   icon: <Description />,
      //   path: '/tips',
      //   subItems: []
      // }
    ]
  }
];

export enum SubMenu {
  COMMUNITY = "커뮤니티",
  SHARE_YOUR_TIPS = "여러분의 팁을 공유해주세요!",
  CANADA = "캐나다",
  USA = "미국",
  BIG_TECH = "Big Tech 빅테크",
  POSITION_SALARY = "직군별 연봉",
  INTERVIEW_PROCESS = "인터뷰 과정",
  JOB_LISTINGS = "채용 공고",
  VISA_INFO = "비자 정보",
  CAREER_TIPS = "취업 준비 팁",
}

export function Header() {
  const [headerStatus, setHeaderStatus] = useState(HeaderStatus.NONE);
  const [isLogin, setIsLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();
  const { getCookie, removeCookie } = useCookieFunctions();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (!isMobile) {
      clearCloseTimeout();
      setAnchorEl(event.currentTarget);
      setOpenMenuIndex(index);
    }
  };

  const handleMenuClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenuIndex(null);
      setOpenSubMenuIndex(null);
      setAnchorEl(null);
    }, MENU_CLOSE_DELAY);
  };

  const handleSubMenuOpen = (index: number) => {
    clearCloseTimeout();
    setOpenSubMenuIndex(index);
  };

  const handleMenuEnter = () => {
    clearCloseTimeout();
  };

  const handleMenuLeave = () => {
    handleMenuClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = useCallback((path: string, status: HeaderStatus) => {
    navigate(path);
    setHeaderStatus(status);
    clearCloseTimeout();
    setOpenMenuIndex(null);
    setOpenSubMenuIndex(null);
    setAnchorEl(null);
    setMobileOpen(false);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    const confirms = window.confirm('로그아웃 하시겠습니까?');
    if (confirms) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      window.location.reload();
    }
  }, [removeCookie]);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    setIsLogin(accessToken !== null);
  }, [getCookie]);

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  const drawer = (
    <Box sx={{ width: 280, bgcolor: 'background.paper' }}>
      <List>
        {menuItems.map((item, index) => (
          <Box key={item.label}>
            <ListItemButton
              onClick={() => item.subItems ? setOpenMenuIndex(index) : handleNavigation(item.path, item.status)}
              selected={headerStatus === item.status}
              sx={{
                py: 1.5,
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  }
                },
                ...(headerStatus === item.status && {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  }
                })
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.subItems && (
                openMenuIndex === index ? <ExpandMore /> : <ChevronRight />
              )}
            </ListItemButton>
            {item.subItems && (
              <Collapse in={openMenuIndex === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <Box key={subItem.label}>
                      <ListItemButton
                        onClick={() => handleNavigation(subItem.path, item.status)}
                        sx={{
                          pl: 4,
                          py: 1.5,
                          borderRadius: 1,
                          mx: 1,
                          mb: 0.5,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.label} />
                        {subItem.subItems.length > 0 && (
                          openSubMenuIndex === subIndex ? <ExpandMore /> : <ChevronRight />
                        )}
                      </ListItemButton>
                      {subItem.subItems.length > 0 && (
                        <Collapse in={openSubMenuIndex === subIndex} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {subItem.subItems.map((subSubItem) => (
                              <ListItemButton
                                key={subSubItem.label}
                                onClick={() => handleNavigation(subSubItem.path, item.status)}
                                sx={{
                                  pl: 6,
                                  py: 1.5,
                                  borderRadius: 1,
                                  mx: 1,
                                  mb: 0.5,
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 40 }}>{subSubItem.icon}</ListItemIcon>
                                <ListItemText primary={subSubItem.label} />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </Box>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  const renderSubMenu = (items: BaseMenuItem[], parentIndex: number) => (
    <MenuList>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => handleNavigation(item.path, menuItems[parentIndex].status)}
          sx={{
            minWidth: 200,
            py: 1.5,
            px: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              transform: 'translateX(5px)',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              }
            }
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              transition: 'color 0.2s ease'
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </MenuList>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: 1,
          borderColor: 'divider',
          background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: 'none' },
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              src={logo}
              alt="Koreer Logo"
              sx={{
                height: 40,
                width: 40,
                cursor: 'pointer',
                mr: 2,
                '&:hover': {
                  transform: 'scale(1.1)',
                  filter: 'brightness(1.1)'
                },
                transition: 'all 0.3s ease',
                objectFit: 'contain'
              }}
              onClick={() => handleNavigation('/', HeaderStatus.NONE)}
            />

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                cursor: 'pointer',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease'
                },
              }}
              onClick={() => handleNavigation('/', HeaderStatus.NONE)}
            >
              Koreer
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {menuItems.map((item, index) => (
                <Box
                  key={item.label}
                  onMouseEnter={(e) => item.subItems && handleMenuOpen(e, index)}
                  onMouseLeave={handleMenuLeave}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    color="inherit"
                    startIcon={item.icon}
                    endIcon={item.subItems ? <ExpandMore /> : null}
                    onClick={() => !item.subItems && handleNavigation(item.path, item.status)}
                    sx={{
                      mx: 0.5,
                      py: 1,
                      px: 2,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: headerStatus === item.status ? '100%' : '0%',
                        height: '2px',
                        bgcolor: 'primary.main',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)',
                      },
                      ...(headerStatus === item.status && {
                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                        fontWeight: 600,
                        '& .MuiSvgIcon-root': {
                          color: 'primary.main',
                        }
                      }),
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                        transform: 'translateY(-2px)',
                        '& .MuiSvgIcon-root': {
                          color: 'primary.main',
                        },
                        '&:after': {
                          width: '100%',
                        }
                      },
                    }}
                  >
                    {item.label}
                  </Button>

                  {item.subItems && openMenuIndex === index && (
                    <Paper
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        mt: 0.5,
                        minWidth: 200,
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        zIndex: theme.zIndex.modal,
                      }}
                    >
                      <MenuList>
                        {item.subItems?.map((subItem, subIndex) => (
                          <Box
                            key={subItem.label}
                            onMouseEnter={() => handleSubMenuOpen(subIndex)}
                            sx={{ position: 'relative' }}
                          >
                            <MenuItem
                              onClick={() => handleNavigation(subItem.path, item.status)}
                              sx={{
                                py: 1.5,
                                px: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                                  '& .MuiListItemIcon-root': {
                                    color: 'primary.main',
                                  }
                                }
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 40,
                                  transition: 'color 0.2s ease'
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText primary={subItem.label} />
                              {subItem.subItems.length > 0 && <ChevronRight />}
                            </MenuItem>
                            {subItem.subItems.length > 0 && openSubMenuIndex === subIndex && (
                              <Paper
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: '100%',
                                  ml: 0.5,
                                  minWidth: 200,
                                  boxShadow: 3,
                                  borderRadius: 2,
                                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                                  backdropFilter: 'blur(8px)',
                                  zIndex: theme.zIndex.modal + 1,
                                }}
                              >
                                <MenuList>
                                  {subItem.subItems.map((subSubItem, subSubIndex) => (
                                    <MenuItem
                                      key={subSubIndex}
                                      onClick={() => handleNavigation(subSubItem.path, item.status)}
                                      sx={{
                                        py: 1.5,
                                        px: 2,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                          bgcolor: 'rgba(25, 118, 210, 0.08)',
                                          '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                          }
                                        }
                                      }}
                                    >
                                      <ListItemIcon
                                        sx={{
                                          minWidth: 40,
                                          transition: 'color 0.2s ease'
                                        }}
                                      >
                                        {subSubItem.icon}
                                      </ListItemIcon>
                                      <ListItemText primary={subSubItem.label} />
                                    </MenuItem>
                                  ))}
                                </MenuList>
                              </Paper>
                            )}
                          </Box>
                        ))}
                      </MenuList>
                    </Paper>
                  )}
                </Box>
              ))}

              {isLogin && (
                  <Button
                      color="inherit"
                      variant="outlined"
                      startIcon={<Person />}
                      onClick={() => handleNavigation('/my-page', HeaderStatus.NONE)}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        mr: 1,  // 오른쪽 마진 추가
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        },
                        transition: 'all 0.2s'
                      }}
                  >
                    My Page
                  </Button>
              )}

              <Button
                color={isLogin ? "inherit" : "primary"}
                variant={isLogin ? "outlined" : "contained"}
                startIcon={isLogin ? <Logout /> : <Login />}
                onClick={isLogin ? handleLogout : () => handleNavigation('/signin', HeaderStatus.NONE)}
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                  },
                  transition: 'all 0.2s'
                }}
              >
                {isLogin ? 'Logout' : 'Login'}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: 280,
              borderRight: 1,
              borderColor: 'divider'
            }
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar />
    </>
  );
}
