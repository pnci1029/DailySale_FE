import { PageLayout } from '../shared/layouts/PageLayout';
import {
  Box,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Button,
  Link,
} from '@mui/material';
import { InfoCard } from '../shared/InfoCard';
import {
  Flight,
  AttachMoney,
  Home,
  LocationOn,
  DirectionsCar,
  LocalHospital,
  School,
  AccountBalance,
  ShoppingCart,
  Restaurant,
  Info,
  House,
  Apartment,
  LocalAtm,
  CreditCard,
  LocalParking,
  DirectionsTransit,
  LocalGroceryStore,
  LocalDining,
  LocalCafe,
  Wifi,
  PhoneIphone,
  LocalLaundryService,
  LocalMovies,
} from '@mui/icons-material';

export function USALifeInfo() {
  const navigationTabs = [
    {
      label: '비자 정보',
      path: '/visa-info/usa',
      icon: <Flight />
    },
    {
      label: '연봉 정보',
      path: '/salary-info/usa',
      icon: <AttachMoney />
    },
    {
      label: '생활 정보',
      path: '/life-info/usa',
      icon: <Home />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '미국', path: '/life-info/usa' },
    { label: '생활 정보' }
  ];

  const housingInfo = [
    {
      category: '주거 형태',
      icon: <House />,
      options: [
        {
          type: '아파트/콘도',
          details: [
            '월 임대료: $2,000-4,000 (1BR), $3,000-5,500 (2BR)',
            '보증금: 1-2개월 임대료',
            '계약 기간: 보통 12개월',
            '공과금 별도'
          ]
        },
        {
          type: '단독주택',
          details: [
            '월 임대료: $3,500-7,000',
            '보증금: 1-2개월 임대료',
            '계약 기간: 12개월 이상',
            '마당 관리비 추가될 수 있음'
          ]
        }
      ]
    },
    {
      category: '주거 비용',
      icon: <LocalAtm />,
      items: [
        '임대료 (지역에 따라 큰 차이)',
        '공과금 (전기, 가스, 수도)',
        '인터넷/케이블 TV',
        '주택 보험',
        '관리비/HOA'
      ]
    },
    {
      category: '임대 시 준비물',
      icon: <CreditCard />,
      items: [
        '신용 점수 (보통 650 이상)',
        '소득 증명서 (연봉의 40배)',
        '신분증/여권',
        '은행 계좌 내역',
        '이전 임대 기록'
      ]
    }
  ];

  const transportationInfo = [
    {
      category: '자가용',
      icon: <DirectionsCar />,
      items: [
        '차량 구매/리스: $300-600/월',
        '자동차 보험: $100-300/월',
        '주유비: $150-300/월',
        '주차비: $100-400/월 (도시)',
        '유지보수: $50-200/월'
      ]
    },
    {
      category: '대중교통',
      icon: <DirectionsTransit />,
      items: [
        '월 교통카드: $80-120',
        '우버/리프트: $15-30/회',
        '버스/지하철: $2.50-3.50/회',
        '공유 자전거: $10-15/월'
      ]
    },
    {
      category: '주차/기타',
      icon: <LocalParking />,
      items: [
        '주차 허가증 필요 지역',
        '거주자 주차 등록',
        '공유 차량 서비스',
        '전기차 충전소 위치'
      ]
    }
  ];

  const livingExpenses = [
    {
      category: '식비',
      icon: <LocalGroceryStore />,
      items: [
        {
          type: '식료품',
          cost: '$400-600/월/인',
          details: [
            '대형마트 (Costco, Walmart)',
            '로컬마켓',
            '한인마트 (20-30% 비쌈)'
          ]
        },
        {
          type: '외식',
          cost: '$15-30/끼니',
          details: [
            '점심 외식: $15-20',
            '저녁 외식: $25-40',
            '배달: $20-35'
          ]
        }
      ]
    },
    {
      category: '공과금',
      icon: <Home />,
      items: [
        {
          type: '기본 공과금',
          cost: '$150-300/월',
          details: [
            '전기: $60-120',
            '가스: $30-80',
            '수도: $40-80'
          ]
        },
        {
          type: '통신비',
          cost: '$100-200/월',
          details: [
            '인터넷: $50-80',
            '휴대폰: $50-90',
            '케이블 TV: $50-100'
          ]
        }
      ]
    },
    {
      category: '기타 생활비',
      icon: <ShoppingCart />,
      items: [
        {
          type: '의료/보험',
          cost: '$200-400/월',
          details: [
            '건강보험 본인부담금',
            '치과/안과 보험',
            '약국비용'
          ]
        },
        {
          type: '여가/문화',
          cost: '$200-500/월',
          details: [
            '헬스장: $30-100',
            '영화/공연: $15-50/회',
            '취미활동'
          ]
        }
      ]
    }
  ];

  const healthcareInfo = [
    {
      category: '의료 보험',
      icon: <LocalHospital />,
      items: [
        '회사 제공 보험 플랜',
        'Deductible: $500-3,000',
        'Co-pay: $20-50',
        'Out-of-pocket maximum',
        '가족 보장 옵션'
      ]
    },
    {
      category: '의료 기관',
      icon: <LocalHospital />,
      items: [
        'Primary Care Physician',
        '전문의 (Specialist)',
        '응급실/긴급진료',
        '한인 병원',
        '약국'
      ]
    },
    {
      category: '의료비 관리',
      icon: <AccountBalance />,
      items: [
        'HSA/FSA 계좌 활용',
        '보험 네트워크 내 진료',
        '예방 진료 활용',
        '처방약 제네릭 사용',
        '의료비 세금 공제'
      ]
    }
  ];

  const lifestyleTips = [
    {
      category: '은행/금융',
      icon: <AccountBalance />,
      items: [
        '주요 은행 계좌 개설',
        '신용카드 발급과 관리',
        '신용점수 관리',
        '세금 신고 방법',
        '송금/환전'
      ]
    },
    {
      category: '쇼핑/소비',
      icon: <ShoppingCart />,
      items: [
        '대형마트 멤버십',
        '온라인 쇼핑몰',
        '할인/프로모션 활용',
        '계절별 세일 기간',
        '리워드 프로그램'
      ]
    },
    {
      category: '여가/문화',
      icon: <LocalMovies />,
      items: [
        '지역 커뮤니티 활동',
        '스포츠/레저 시설',
        '공원/자연 명소',
        '문화 행사/페스티벌',
        '한인 모임'
      ]
    }
  ];

  return (
    <PageLayout
      title="미국 생활 정보"
      subtitle="주거, 교통, 생활비 등 실용적인 정보를 확인하세요"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={4}>
        {/* 주거 정보 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            주거 정보
          </Typography>
          <Grid container spacing={3}>
            {housingInfo.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      pb: 2,
                      mb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      {section.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {section.category}
                      </Typography>
                    </Box>
                    {section.options ? (
                      section.options.map((option, idx) => (
                        <Box key={idx} sx={{ mb: 2 }}>
                          <Typography 
                            variant="subtitle1" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600,
                              color: 'primary.main'
                            }}
                          >
                            {option.type}
                          </Typography>
                          <List dense>
                            {option.details.map((detail, detailIdx) => (
                              <ListItem key={detailIdx} sx={{
                                borderBottom: detailIdx !== option.details.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                                py: 1
                              }}>
                                <ListItemText
                                  primary={detail}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'text.secondary',
                                    sx: { fontWeight: 500 }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ))
                    ) : (
                      <List dense>
                        {section.items.map((item, itemIdx) => (
                          <ListItem key={itemIdx} sx={{
                            borderBottom: itemIdx !== section.items.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                            py: 1
                          }}>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary',
                                sx: { fontWeight: 500 }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 교통 정보 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            교통 정보
          </Typography>
          <Grid container spacing={3}>
            {transportationInfo.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      pb: 2,
                      mb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      {section.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {section.category}
                      </Typography>
                    </Box>
                    <List dense>
                      {section.items.map((item, itemIdx) => (
                        <ListItem key={itemIdx} sx={{
                          borderBottom: itemIdx !== section.items.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                          py: 1
                        }}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                              sx: { fontWeight: 500 }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 생활비 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            생활비 정보
          </Typography>
          <Grid container spacing={3}>
            {livingExpenses.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      pb: 2,
                      mb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      {section.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {section.category}
                      </Typography>
                    </Box>
                    {section.items.map((item, idx) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Box sx={{ 
                          p: 1.5, 
                          bgcolor: 'primary.light', 
                          borderRadius: 1,
                          color: 'white',
                          mb: 1
                        }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {item.type} ({item.cost})
                          </Typography>
                        </Box>
                        <List dense>
                          {item.details.map((detail, detailIdx) => (
                            <ListItem key={detailIdx} sx={{
                              borderBottom: detailIdx !== item.details.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                              py: 1
                            }}>
                              <ListItemText
                                primary={detail}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  color: 'text.secondary',
                                  sx: { fontWeight: 500 }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 의료/보험 정보 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            의료/보험 정보
          </Typography>
          <Grid container spacing={3}>
            {healthcareInfo.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      pb: 2,
                      mb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      {section.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {section.category}
                      </Typography>
                    </Box>
                    <List dense>
                      {section.items.map((item, itemIdx) => (
                        <ListItem key={itemIdx} sx={{
                          borderBottom: itemIdx !== section.items.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                          py: 1
                        }}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                              sx: { fontWeight: 500 }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 생활 팁 */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            생활 팁
          </Typography>
          <Grid container spacing={3}>
            {lifestyleTips.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      pb: 2,
                      mb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.light'
                    }}>
                      {section.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {section.category}
                      </Typography>
                    </Box>
                    <List dense>
                      {section.items.map((item, itemIdx) => (
                        <ListItem key={itemIdx} sx={{
                          borderBottom: itemIdx !== section.items.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                          py: 1
                        }}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                              sx: { fontWeight: 500 }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 참고사항 */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            bgcolor: 'primary.50',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Info color="primary" sx={{ fontSize: 24 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              제시된 비용은 2024년 기준이며, 지역과 개인의 생활 방식에 따라 차이가 있을 수 있습니다.
              구체적인 정보는 현지 부동산 사이트, 생활비 계산기, 지역 커뮤니티 등을 참고하시기 바랍니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
}
