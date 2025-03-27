import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Chip,
    Container, Dialog, DialogContent,
    Divider,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import {SubmitStatus, UserInfoDTO} from "../../types/userInfo";
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";
import {useNavigate} from "react-router-dom";
import {getCurrentUserAsync} from "../../slice/AuthSlice";
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {UserDTO} from "@/types/auth";
import {JsonResponseDTO} from "@/types/common";
import {useCommonFunctions} from "../../components/common/hooks/useCommonFunctions";

const employmentStatuses = ['employed', 'student'] as const;
type EmploymentStatus = typeof employmentStatuses[number];  // 'employed' | 'student'

// 표시될 레이블 매핑
const employmentStatusLabels: Record<EmploymentStatus, string> = {
    'employed': '직장인',
    'student': '학생'
};

const experienceRanges = [
    '신입',
    '1-3년',
    '4-5년',
    '6-8년',
    '9년 이상'
];

const salary_ranges = [
    '2천만원 이하',
    '2천만원-3천만원',
    '3천만원-4천만원',
    '4천만원-5천만원',
    '5천만원 이상'
];

const work_styles = [
    '풀재택',
    '부분재택',
    '오피스 출근'
];

// 기술 스택 예시 데이터
const skillSuggestions = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express',
    'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot',
    'TypeScript', 'JavaScript', 'PHP', 'Laravel',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'AWS', 'Docker', 'Kubernetes', 'Jenkins',
    'Git', 'GitHub Actions', 'Terraform'
];

// 관심 분야 예시 데이터
const interestSuggestions = [
    'Frontend Development', 'Backend Development', 'DevOps',
    'Cloud Computing', 'Mobile Development', 'AI/ML',
    'Data Science', 'Blockchain', 'Cybersecurity',
    'UI/UX Design', 'Game Development', 'IoT',
    'Fintech', 'E-commerce', 'Healthcare Tech'
];

// 국가 데이터
const countries = ['미국', '캐나다', '일본', '동남아', '유럽'];


export function UserInfo() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { checkAuth } = useCommonFunctions();

    const [userInfo, setUserInfo] = useState<UserDTO>()

    // 비로그인 접근 시 로그인 페이지로 이동
    useEffect(() => {
        checkAuth();
        getCurrentUserInfo().then()
    }, []);

    useEffect(() => {
        if(!userInfo) return;
        setFormData(prev => ({
            ...prev,
            userId: userInfo.id
        }));

    }, [setUserInfo]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 추가 정보 가져오기
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user-info/${userInfo?.id}`, {
                    credentials: 'include'
                });

                const userInfoData = await response.json();

                if (response.ok && userInfoData.data) {
                    // formData에 가져온 데이터 초기값 할당
                    setFormData({
                        id: userInfoData.data.id,
                        ...userInfoData.data,
                        user_id: userInfo?.id ?? 0
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        if(userInfo?.id) {
            fetchData();
        }
    }, [userInfo]);

    const getCurrentUserInfo = useCallback(async () => {
        try {
            const result:JsonResponseDTO<UserDTO> = await dispatch(getCurrentUserAsync()).unwrap();
            setUserInfo(result.data)
            setFormData(prev => ({
                ...prev,
                userId: result.data.id
            }));

        } catch (err: any) {
            console.log(err.message || 'Failed to sign up');
        }
    }, [dispatch]);

    const [formData, setFormData] = useState<UserInfoDTO>({
        user_id: userInfo?.id ?? 0,
        employment_status: 'student',
        birth_date: '',
        location: '',
        desired_country: '',
        skills: [],
        interests: [],
        introduction: '',
        github_url: '',
        portfolio_url: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
        setFormData(prev => ({
            ...prev,
            skills: newValue
        }));
    };

    const handleInterestsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
        setFormData(prev => ({
            ...prev,
            interests: newValue
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('loading');
        try {
            const userInfoDTO: UserInfoDTO = {
                user_id: userInfo?.id ?? formData.user_id,
                employment_status: formData.employment_status,
                years_of_experience: formData.years_of_experience,
                salary_range: formData.salary_range,
                work_style: formData.work_style,
                birth_date: formData.birth_date,
                location: formData.location,
                desired_country: formData.desired_country,
                skills: formData.skills,
                interests: formData.interests,
                introduction: formData.introduction,
                github_url: formData.github_url || null,
                portfolio_url: formData.portfolio_url || null,
            };

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user-info`, {
                method: formData.id  ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userInfoDTO)
            });

            if (!response.ok) {
                throw new Error( '서버 에러가 발생했습니다.');
            }

            setSubmitStatus('success');
            setShowSnackbar(true);

        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.');
            setSubmitStatus('error');
            setShowSnackbar(true);
        }
    };

    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const renderSuccessDialog = () => (
        <Dialog
            open={showSnackbar && submitStatus === 'success'}
            onClose={() => setShowSnackbar(false)}
            maxWidth="sm"
            fullWidth
        >
            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        추가 정보가 성공적으로 저장되었습니다!
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            setShowSnackbar(false);
                            navigate('/my-page');
                        }}
                        sx={{
                            mt: 2,
                            px: 4,
                            py: 1.5,
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        마이페이지로 이동
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );

// 에러 Snackbar
    const renderErrorSnackbar = () => (
        <Snackbar
            open={showSnackbar && submitStatus === 'error'}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={() => setShowSnackbar(false)}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {errorMessage}
            </Alert>
        </Snackbar>
    );


    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    mb: 4,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    color: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    추가 정보를 입력해주세요!
                </Typography>
                <Typography variant="subtitle1">
                    회원님의 정보를 입력하여 프로필을 완성해주세요.
                </Typography>
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    borderRadius: '16px',
                    p: 4,
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* 기본 정보 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary">
                                기본 정보
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                        </Grid>

                        {/* 재직상태 */}
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={employmentStatuses}
                                value={formData.employment_status}
                                getOptionLabel={(option) => employmentStatusLabels[option]} // 한글 레이블 표시
                                onChange={(_, newValue: EmploymentStatus | null) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        employment_status: newValue || 'student',
                                        ...(newValue === 'student' && {
                                            years_of_experience: undefined,
                                            salary_range: undefined,
                                            work_style: undefined
                                        })
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="재직상태"
                                        required
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 생년월일 */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="생년월일"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleInputChange}
                                placeholder="YYYY. MM. DD"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        {/* 직장인인 경우에만 표시되는 필드들 */}
                        {formData.employment_status === 'employed' && (
                            <>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={experienceRanges}
                                        value={formData.years_of_experience}
                                        onChange={(_, newValue) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                years_of_experience: newValue || ''
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="경력"
                                                required
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={salary_ranges}
                                        value={formData.salary_range}
                                        onChange={(_, newValue) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                salary_range: newValue || ''
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="연봉수준"
                                                required
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={work_styles}
                                        value={formData.work_style}
                                        onChange={(_, newValue) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                work_style: newValue || ''
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="근무형태"
                                                required
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="현재 거주지"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                placeholder="예) 서울특별시 강남구"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={countries}
                                value={formData.desired_country}
                                onChange={(_, newValue) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        desired_country: newValue || ''
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="희망 취업 국가"
                                        required
                                        placeholder="국가를 선택해주세요"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 기술 스택 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                                기술 스택
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                현재 보유하고 있는 기술을 선택해주세요
                            </Typography>
                            <Autocomplete
                                multiple
                                options={skillSuggestions}
                                value={formData.skills}
                                onChange={handleSkillsChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            label={option}
                                            color="primary"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: '8px',
                                                '& .MuiChip-label': { px: 2 }
                                            }}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="기술을 검색하세요"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 관심 분야 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                                관심 분야
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                관심있는 분야를 선택해주세요
                            </Typography>
                            <Autocomplete
                                multiple
                                options={interestSuggestions}
                                value={formData.interests}
                                onChange={handleInterestsChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            label={option}
                                            color="primary"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: '8px',
                                                '& .MuiChip-label': { px: 2 }
                                            }}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="관심 분야를 검색하세요"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 추가 정보 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                                추가 정보
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="자기소개"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                                placeholder="자신을 소개해주세요"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="GitHub URL"
                                name="github_url"
                                value={formData.github_url}
                                onChange={handleInputChange}
                                placeholder="https://github.com/username"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="포트폴리오 URL"
                                name="portfolio_url"
                                value={formData.portfolio_url}
                                onChange={handleInputChange}
                                placeholder="https://your-portfolio.com"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 6 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                py: 2,
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
                                },
                                boxShadow: '0 4px 16px rgba(21, 101, 192, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            저장하기
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Paper
                elevation={1}
                sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: '#f8f9fa',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0'
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    * 필수 입력 정보: 학교, 전공, 졸업년도, 거주지, 희망 취업 국가, 자기소개
                </Typography>
            </Paper>
            {renderSuccessDialog()}
            {renderErrorSnackbar()}
        </Container>
    );
}