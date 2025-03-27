import React, {useState} from 'react';
import {Box, Button, Container, Grid, IconButton, Paper, Snackbar, TextField, Typography,} from '@mui/material';
import {AccessTime, Email, LocationOn, Phone, Send,} from '@mui/icons-material';
import {motion} from 'framer-motion';
import styles from '../../assets/scss/sub/contactus.module.scss';
import {ComponentHelmet} from "../../features/common/ComponentHelmet";
import {InquiryPostDTO} from "@/types/inquiry";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    title: '',
    content: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dto: InquiryPostDTO = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        title: formData.title,
        content: formData.content
      };

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error( '서버 에러가 발생했습니다.');
      }

    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : '일시적인 오류가 발생했습니다.\n다시 시도해주세요.',
      });
    }

    setSnackbar({
      open: true,
      message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.',
    });
    resetFormData();
  };

  const resetFormData = () =>{
    setFormData({
      name: '',
      email: '',
      phone_number: '',
      title: '',
      content: '',
    });
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: '이메일',
      content: 'koreerkorea@gmail.com',
      description: '24시간 이내 답변 드리겠습니다',
    },
    {
      icon: <Phone />,
      title: '전화',
      content: '+82 02-123-4567',
      description: '평일 09:00 - 18:00 (한국 시간)',
    },
    {
      icon: <LocationOn />,
      title: '주소',
      content: '서울특별시 강남구 테헤란로',
      description: '오피스는 현재 준비중입니다.',
    },
  ];

  return (
    <Container maxWidth="lg" className={styles.contactContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <Typography variant="h3" className={styles.title}>
          문의하기
        </Typography>
        <Typography variant="h6" className={styles.subtitle}>
          해외 취업에 대한 모든 궁금증, Koreer가 해결해드립니다
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Paper elevation={0} className={styles.contactInfo}>
              <Typography variant="h5" gutterBottom className={styles.sectionTitle}>
                연락처 정보
              </Typography>

              {contactInfo.map((info, index) => (
                <Box key={index} className={styles.infoItem}>
                  <IconButton className={styles.infoIcon}>
                    {info.icon}
                  </IconButton>
                  <Box>
                    <Typography variant="h6">{info.title}</Typography>
                    <Typography variant="body1">{info.content}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {info.description}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Box className={styles.businessHours}>
                <Box className={styles.hoursHeader}>
                  <AccessTime />
                  <Typography variant="h6">상담 가능 시간</Typography>
                </Box>
                <Typography variant="body2">
                  평일: 09:00 - 18:00 (한국 시간)<br />
                  점심시간: 12:00 - 13:00<br />
                  주말 및 공휴일: 휴무
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Paper elevation={0} className={styles.contactForm}>
              <Typography variant="h5" gutterBottom className={styles.sectionTitle}>
                문의하기
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="이름"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="이메일"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="연락처"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="제목"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="문의 내용"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      className={styles.submitButton}
                      endIcon={<Send />}
                    >
                      문의하기
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
      <ComponentHelmet title={"Koreer - 문의하기"} />
    </Container>
  );
};

export default Contact;