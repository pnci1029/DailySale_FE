import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Chip,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    IconButton, Tabs, Tab,
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import { useCookieFunctions } from "../../components/common/hooks/useCookieFunctions";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';

interface Newsletter {
    id: number;
    title: string;
    content: string;
    category: 'NEWSLETTER';
    send_date: string | null;
    created_by: number | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export function AdminNewsletterManagement() {
    const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
    const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
    const { getCookie } = useCookieFunctions();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [selectedNewsletterIds, setSelectedNewsletterIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [totalNewsletters, setTotalNewsletters] = useState<number>(0);
    const [searchWord, setSearchWord] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    // 새 뉴스레터 또는 편집용 폼 상태
    const [formData, setFormData] = useState<Omit<Newsletter, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>({
        title: '',
        content: '',
        category: 'NEWSLETTER',
        send_date: null,
        created_by: null,
    });

    const categoryOptions = [
        { value: 'NEWSLETTER', label: '뉴스레터' }
    ];

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'PROMOTION':
                return 'primary';
            case 'UPDATE':
                return 'secondary';
            case 'EVENT':
                return 'error';
            case 'NEWSLETTER':
                return 'success';
            case 'GENERAL':
            default:
                return 'default';
        }
    };

    // 안전한 날짜 포맷팅 함수
    const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return '-';
        try {
            return new Date(dateStr).toLocaleString();
        } catch (e) {
            console.error('Date formatting error:', e);
            return '-';
        }
    };

    const formatShortDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return '미정';
        try {
            return new Date(dateStr).toLocaleDateString();
        } catch (e) {
            console.error('Date formatting error:', e);
            return '날짜 오류';
        }
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: '제목', width: 200 },
        {
            field: 'category',
            headerName: '카테고리',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value || 'GENERAL'}
                    color={getCategoryColor(params.value || 'GENERAL')}
                    size="small"
                />
            )
        },
        {
            field: 'send_date',
            headerName: '발송 예정일',
            width: 130,
            renderCell: (params) => {
                const send_date = params.row.send_date;
                return <span>{send_date ? formatShortDate(send_date) : '미정'}</span>;
            }
        },
        {
            field: 'created_at',
            headerName: '작성일',
            width: 180,
            renderCell: (params) => <span>{formatDate(params.row.created_at)}</span>
        },
        {
            field: 'updated_at',
            headerName: '수정일',
            width: 180,
            renderCell: (params) => <span>{formatDate(params.row.updated_at)}</span>
        },
        {
            field: 'actions',
            headerName: '관리',
            width: 180,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => handleViewNewsletter(params.row)}
                        color="primary"
                    >
                        <Search fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleEditNewsletter(params.row)}
                        color="secondary"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setSelectedNewsletterIds([params.row.id]);
                            setDeleteDialogOpen(true);
                        }}
                        color="error"
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    const fetchNewsletters = async (page: number, limit: number, search?: string): Promise<void> => {
        setLoading(true);
        try {
            const accessToken = getCookie('accessToken');

            // URL 생성 및 파라미터 추가
            const url = new URL(`${process.env.REACT_APP_BASE_URL}/admin/newsletter`);
            url.searchParams.append('page', String(page + 1));
            url.searchParams.append('limit', String(limit));

            // 검색어가 있는 경우에만 추가
            if (search && search.trim() !== '') {
                url.searchParams.append('searchWord', search.trim());
            }

            const response = await fetch(url.toString(), {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/admin/login';
                    return;
                }
                throw new Error('Failed to fetch newsletters');
            }

            const responseData = await response.json();
            setNewsletters(responseData.data);
            setTotalNewsletters(responseData.meta.total);
        } catch (error) {
            console.error('Error fetching newsletters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // 검색 시 첫 페이지로 초기화
        setPaginationModel(prev => ({ ...prev, page: 0 }));
        fetchNewsletters(0, paginationModel.pageSize, searchWord);
    };

    // 엔터키로 검색 지원
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDeleteNewsletters = async () => {
        try {
            const accessToken = getCookie('accessToken');

            // 선택된 각 뉴스레터에 대해 순차적으로 삭제 요청
            for (const newsletterId of selectedNewsletterIds) {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/admin/newsletter/${newsletterId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to delete newsletter ${newsletterId}`);
                }
            }

            // 모든 삭제가 완료된 후 목록 새로고침
            await fetchNewsletters(paginationModel.page, paginationModel.pageSize, searchWord);
            setSelectedNewsletterIds([]);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting newsletters:', error);
        }
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedNewsletterIds(selectionModel as number[]);
    };

    const handlePaginationModelChange = (newModel: typeof paginationModel): void => {
        setPaginationModel(newModel);
    };

    const handleViewNewsletter = (newsletter: Newsletter): void => {
        setSelectedNewsletter(newsletter);
        setOpenViewDialog(true);
    };

    const handleEditNewsletter = (newsletter: Newsletter): void => {
        setSelectedNewsletter(newsletter);
        setFormData({
            title: newsletter.title,
            content: newsletter.content,
            category: 'NEWSLETTER',
            send_date: newsletter.send_date,
            created_by: newsletter.created_by
        });
        setIsEditing(true);
        setOpenFormDialog(true);
    };

    const handleCloseViewDialog = (): void => {
        setOpenViewDialog(false);
        setSelectedNewsletter(null);
    };

    const handleCloseFormDialog = (): void => {
        setOpenFormDialog(false);
        setFormData({
            title: '',
            content: '',
            category: 'NEWSLETTER',
            send_date: null,
            created_by: null
        });
        setIsEditing(false);
    };

    const handleAddNewsletter = () => {
        setIsEditing(false);
        setFormData({
            title: '',
            content: '',
            category: 'NEWSLETTER',
            send_date: null,
            created_by: null
        });
        setOpenFormDialog(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({
            ...formData,
            category: 'NEWSLETTER'
        });
    };

    const handleDateChange = (newDate: Date | null) => {
        setFormData({
            ...formData,
            send_date: newDate ? newDate.toISOString().split('T')[0] : null
        });
    };

    const handleSubmitForm = async () => {
        try {
            const accessToken = getCookie('accessToken');

            const url = isEditing
                ? `${process.env.REACT_APP_BASE_URL}/admin/newsletter/${selectedNewsletter?.id}`
                : `${process.env.REACT_APP_BASE_URL}/admin/newsletter`;

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} newsletter`);
            }

            handleCloseFormDialog();
            // 목록 새로고침
            await fetchNewsletters(paginationModel.page, paginationModel.pageSize, searchWord);
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} newsletter:`, error);
        }
    };

    useEffect(() => {
        fetchNewsletters(paginationModel.page, paginationModel.pageSize, searchWord);
    }, [paginationModel]);

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h4">뉴스레터 관리</Typography>
                    <Box>
                        {selectedNewsletterIds.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setDeleteDialogOpen(true)}
                                sx={{ mr: 2 }}
                            >
                                선택한 뉴스레터 삭제 ({selectedNewsletterIds.length})
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAddNewsletter}
                        >
                            뉴스레터 추가
                        </Button>
                    </Box>
                </Box>

                {/* 검색 입력란 */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="제목, 내용 검색"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSearch}
                                        startIcon={<Search />}
                                    >
                                        검색
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mr: 1 }}
                    />
                </Box>

                <Card>
                    <CardContent>
                        <Box sx={{ height: 600 }}>
                            <DataGrid
                                rows={newsletters}
                                columns={columns}
                                rowCount={totalNewsletters}
                                paginationModel={paginationModel}
                                paginationMode="server"
                                onPaginationModelChange={handlePaginationModelChange}
                                pageSizeOptions={[10, 25, 50]}
                                loading={loading}
                                checkboxSelection
                                disableRowSelectionOnClick
                                onRowSelectionModelChange={handleSelectionChange}
                                rowSelectionModel={selectedNewsletterIds}
                                sx={{
                                    '& .MuiDataGrid-cell:focus': {
                                        outline: 'none',
                                    },
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* 뉴스레터 상세 보기 대화상자 */}
                <Dialog
                    open={openViewDialog}
                    onClose={handleCloseViewDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>뉴스레터 상세 정보</DialogTitle>
                    <DialogContent dividers>
                        {selectedNewsletter && (
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Chip
                                        label={selectedNewsletter.category || 'GENERAL'}
                                        color={getCategoryColor(selectedNewsletter.category || 'GENERAL')}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        발송 예정일: {selectedNewsletter.send_date ? formatShortDate(selectedNewsletter.send_date) : '미정'}
                                    </Typography>
                                </Box>

                                <Typography variant="h5" gutterBottom>
                                    {selectedNewsletter.title}
                                </Typography>

                                {/* 탭 관련 상태 및 핸들러 추가 필요 */}
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="content view tabs">
                                        <Tab label="텍스트 보기" id="tab-0" />
                                        <Tab label="HTML 미리보기" id="tab-1" />
                                    </Tabs>
                                </Box>

                                {/* 텍스트 보기 */}
                                {activeTab === 0 && (
                                    <Box sx={{
                                        my: 2,
                                        p: 2,
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                        borderRadius: 1,
                                        minHeight: '200px',
                                        maxHeight: '400px',
                                        overflow: 'auto'
                                    }}>
                                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                            {selectedNewsletter.content}
                                        </Typography>
                                    </Box>
                                )}

                                {/* HTML 미리보기 */}
                                {activeTab === 1 && (
                                    <Box sx={{
                                        my: 2,
                                        p: 2,
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                        borderRadius: 1,
                                        minHeight: '200px',
                                        maxHeight: '400px',
                                        overflow: 'auto'
                                    }}>
                                        <div dangerouslySetInnerHTML={{ __html: selectedNewsletter.content }} />
                                    </Box>
                                )}

                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        작성일: {selectedNewsletter.created_at ? formatDate(selectedNewsletter.created_at) : '-'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        마지막 수정일: {selectedNewsletter.updated_at ? formatDate(selectedNewsletter.updated_at) : '-'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleCloseViewDialog();
                            if (selectedNewsletter) {
                                handleEditNewsletter(selectedNewsletter);
                            }
                        }} color="primary">
                            편집
                        </Button>
                        <Button onClick={handleCloseViewDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>

                {/* 뉴스레터 추가/수정 폼 대화상자 */}
                <Dialog
                    open={openFormDialog}
                    onClose={handleCloseFormDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        {isEditing ? '뉴스레터 수정' : '새 뉴스레터 작성'}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ p: 2 }}>
                            <TextField
                                name="title"
                                label="제목"
                                value={formData.title}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />

                            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>카테고리</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="카테고리"
                                        onChange={handleCategoryChange as any}
                                    >
                                        {categoryOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                                    <DatePicker
                                        label="발송 예정일"
                                        value={formData.send_date ? new Date(formData.send_date) : null}
                                        onChange={handleDateChange}
                                        sx={{ mt: 2, width: '100%' }}
                                    />
                                </LocalizationProvider>
                            </Box>

                            <TextField
                                name="content"
                                label="내용"
                                value={formData.content}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={10}
                                required
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFormDialog}>취소</Button>
                        <Button
                            onClick={handleSubmitForm}
                            color="primary"
                            variant="contained"
                            disabled={!formData.title || !formData.content}
                        >
                            {isEditing ? '수정 완료' : '추가하기'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 삭제 확인 대화상자 */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>뉴스레터 삭제</DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 {selectedNewsletterIds.length}개의 뉴스레터를 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
                        <Button onClick={handleDeleteNewsletters} color="error" variant="contained">
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
}