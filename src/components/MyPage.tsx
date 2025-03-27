import { motion } from 'framer-motion';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Chip,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    CircularProgress,
    Pagination
} from '@mui/material';
import {
    Person,
    Work,
    LocationOn,
    Email,
    Settings,
    QuestionAnswer,
    ArrowForward,
    AccessTime,
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { ComponentHelmet } from "../components/common/ComponentHelmet";
import { ApiResponse, UserInfoDTO } from '@/types/userInfo';
import { UserDTO } from '@/types/auth';
import { useCommonFunctions } from "../components/common/hooks/useCommonFunctions";
import { useNavigate } from "react-router-dom";
import { PageResponse, PageInfo } from '@/types/common';
import {CommunityAnswerDetailDTO} from "@/types/community";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function MyPage() {
    const [tabValue, setTabValue] = useState(0);
    const [userInfo, setUserInfo] = useState<UserInfoDTO | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [myAnswers, setMyAnswers] = useState<CommunityAnswerDetailDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<PageInfo>({
        total: 0,
        currentPage: 1,
        totalPages: 0
    });
    const [limit, setLimit] = useState(5);
    const { checkAuth } = useCommonFunctions();
    const navigate = useNavigate();

    // 비로그인 여부 체크
    useEffect(() => {
        checkAuth();
    }, []);

    // 유저 정보 및 추가 정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 유저 정보 가져오기
                const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/users/current-user`, {
                    credentials: 'include'
                });
                const userData = await userResponse.json();
                setUser(userData.data);

                // 추가 정보 가져오기
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user-info/${userData.data.id}`, {
                    credentials: 'include'
                });

                const userInfoData: ApiResponse<UserInfoDTO> = await response.json();

                if (!response.ok) {
                    throw new Error(userInfoData.error || '유저 정보를 가져오는데 실패했습니다.');
                }

                setUserInfo(userInfoData.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchData();
    }, []);

    // 내 답변 목록 가져오기
    useEffect(() => {
        if (user && tabValue === 3) { // 답변 탭이 선택되었을 때만 데이터 로드
            fetchMyAnswers(meta.currentPage, limit);
        }
    }, [user, tabValue, meta.currentPage, limit]);

    const fetchMyAnswers = async (page = 1, perPage = 5) => {
        if (!user) return;

        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/answer-question/answers?page=${page}&limit=${perPage}`,
                { credentials: 'include' }
            );

            if (!response.ok) {
                throw new Error('답변 목록을 가져오는데 실패했습니다.');
            }

            const result: PageResponse<CommunityAnswerDetailDTO> = await response.json();

            setMyAnswers(result.data || []);
            setMeta(result.meta || { total: 0, currentPage: page, totalPages: 0 });
        } catch (error) {
            console.error('Failed to fetch answers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        // 페이지 변경시 현재 페이지 업데이트
        setMeta(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    const handleLimitChange = (event: any) => {
        // 페이지당 항목 수 변경시
        const newLimit = Number(event.target.value);
        setLimit(newLimit);
        // 첫 페이지로 돌아가기
        setMeta(prev => ({
            ...prev,
            currentPage: 1
        }));
    };

    // JSON 문자열로 저장된 배열 데이터 파싱
    const skills = userInfo?.skills || [];
    const interests = userInfo?.interests || [];

    // 재직상태에 따른 추가 정보 표시 여부
    const isEmployed = userInfo?.employment_status === 'employed';

    // 고용상태 한글 변환
    const employmentStatusKorean = {
        'employed': '직장인',
        'student': '학생'
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 프로필 헤더 */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white',
                            borderRadius: 2,
                            position: 'relative'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                            <Button
                                variant="contained"
                                onClick={() => navigate(`/user-info/${user?.id}`)}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }}
                            >
                                프로필 수정
                            </Button>
                        </Box>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Avatar
                                        sx={{ width: 100, height: 100, border: '3px solid white' }}
                                    >
                                        {user?.username}
                                    </Avatar>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} sm>
                                <Typography variant="h4" gutterBottom>
                                    {user?.username}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm="auto">
                                        <Box display="flex" alignItems="center">
                                            <Email sx={{ mr: 1 }} />
                                            {user?.user_email}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm="auto">
                                        <Box display="flex" alignItems="center">
                                            <LocationOn sx={{ mr: 1 }} />
                                            {userInfo?.location}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* 탭 메뉴 */}
                    <Paper elevation={0} sx={{ borderRadius: 2 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            centered
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Tab icon={<Person />} label="기본 정보" />
                            <Tab icon={<Work />} label="경력 정보" />
                            <Tab icon={<Settings />} label="설정" />
                            <Tab icon={<QuestionAnswer />} label="내 답변" />
                        </Tabs>

                        {/* 기본 정보 탭 */}
                        <TabPanel value={tabValue} index={0}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Card elevation={0} sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                기본 정보
                                            </Typography>
                                            <List>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="재직 상태"
                                                        secondary={employmentStatusKorean[userInfo?.employment_status as keyof typeof employmentStatusKorean]}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="생년월일"
                                                        secondary={userInfo?.birth_date}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="현재 거주지"
                                                        secondary={userInfo?.location}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="희망 취업 국가"
                                                        secondary={userInfo?.desired_country}
                                                    />
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card elevation={0}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                보유 기술
                                            </Typography>
                                            <Box sx={{ mb: 3 }}>
                                                {skills.map((skill: string) => (
                                                    <Chip
                                                        key={skill}
                                                        label={skill}
                                                        sx={{ m: 0.5 }}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                            <Typography variant="h6" gutterBottom>
                                                관심 분야
                                            </Typography>
                                            <Box sx={{ mb: 2 }}>
                                                {interests.map((interest: string) => (
                                                    <Chip
                                                        key={interest}
                                                        label={interest}
                                                        sx={{ m: 0.5 }}
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* 경력 정보 탭 */}
                        <TabPanel value={tabValue} index={1}>
                            <Card elevation={0}>
                                <CardContent>
                                    {isEmployed ? (
                                        <List>
                                            <ListItem>
                                                <ListItemText
                                                    primary="경력"
                                                    secondary={userInfo?.years_of_experience}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="연봉 수준"
                                                    secondary={userInfo?.salary_range}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="선호 근무 형태"
                                                    secondary={userInfo?.work_style}
                                                />
                                            </ListItem>
                                        </List>
                                    ) : (
                                        <Typography variant="body1" color="text.secondary">
                                            학생 회원은 경력 정보가 제공되지 않습니다.
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </TabPanel>

                        {/* 설정 탭 */}
                        <TabPanel value={tabValue} index={2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Card elevation={0}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                외부 링크
                                            </Typography>
                                            <List>
                                                {userInfo?.github_url && (
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="GitHub"
                                                            secondary={userInfo.github_url}
                                                        />
                                                    </ListItem>
                                                )}
                                                {userInfo?.portfolio_url && (
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="포트폴리오"
                                                            secondary={userInfo.portfolio_url}
                                                        />
                                                    </ListItem>
                                                )}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card elevation={0}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                자기소개
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {userInfo?.introduction}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* 내 답변 탭 */}
                        <TabPanel value={tabValue} index={3}>
                            <Card elevation={0}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h6">
                                            내가 작성한 답변 목록
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            {/* 페이지당 항목 수 선택 */}
                                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                                <InputLabel id="items-per-page-label">항목 수</InputLabel>
                                                <Select
                                                    labelId="items-per-page-label"
                                                    value={limit}
                                                    label="항목 수"
                                                    onChange={handleLimitChange}
                                                >
                                                    <MenuItem value={5}>5개</MenuItem>
                                                    <MenuItem value={10}>10개</MenuItem>
                                                    <MenuItem value={15}>15개</MenuItem>
                                                    <MenuItem value={20}>20개</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => fetchMyAnswers(meta.currentPage, limit)}
                                            >
                                                새로고침
                                            </Button>
                                        </Stack>
                                    </Box>

                                    {loading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                            <CircularProgress />
                                        </Box>
                                    ) : meta.total === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <QuestionAnswer sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                                아직 작성한 답변이 없습니다
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate('/community')}
                                                sx={{ mt: 2 }}
                                            >
                                                커뮤니티 둘러보기
                                            </Button>
                                        </Box>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {myAnswers.map((answer, index) => (
                                                <motion.div
                                                    key={answer.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Card
                                                        variant="outlined"
                                                        sx={{
                                                            mb: 2,
                                                            borderRadius: 2,
                                                            '&:hover': {
                                                                borderColor: 'primary.main',
                                                                boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.2)'
                                                            }
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                                                <Box>
                                                                    {/*{answer.category && (*/}
                                                                    {/*    <Chip*/}
                                                                    {/*        label={answer.category}*/}
                                                                    {/*        size="small"*/}
                                                                    {/*        color="primary"*/}
                                                                    {/*        sx={{ mb: 1 }}*/}
                                                                    {/*    />*/}
                                                                    {/*)}*/}
                                                                    <Typography variant="h6">
                                                                        {`질문 #${answer.post_id}`}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {answer.created_at}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{
                                                                    mb: 2,
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                }}
                                                            >
                                                                {answer.answer_content}
                                                            </Typography>

                                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button
                                                                    variant="text"
                                                                    color="primary"
                                                                    size="small"
                                                                    endIcon={<ArrowForward />}
                                                                    onClick={() => navigate(`/community/detail/${answer.post_id}`)}
                                                                >
                                                                    질문 확인하기
                                                                </Button>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}

                                            {/* 페이지네이션 UI */}
                                            {meta.totalPages > 1 && (
                                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                                    <Pagination
                                                        count={meta.totalPages}
                                                        page={meta.currentPage}
                                                        onChange={handlePageChange}
                                                        color="primary"
                                                        showFirstButton
                                                        showLastButton
                                                    />
                                                </Box>
                                            )}

                                            {/* 페이지 정보 표시 */}
                                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {meta.total}개의 답변 중 {(meta.currentPage - 1) * limit + 1}-
                                                    {Math.min(meta.currentPage * limit, meta.total)}개 표시
                                                </Typography>
                                            </Box>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabPanel>
                    </Paper>
                </motion.div>
            )}
            <ComponentHelmet title={"Daily Sale - 마이페이지"} />
        </Container>
    );
}