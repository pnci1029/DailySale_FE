import React from 'react';
import {Box, Container, Grid, IconButton, Typography} from '@mui/material';
import {Facebook, Instagram, LinkedIn, Twitter} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';
import styles from '../../assets/scss/common/footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom className={styles.title}>
              About Koreer
            </Typography>
            <Typography variant="body2" className={styles.description}>
              해외 취업을 꿈꾸는 분들을 위한 최고의 파트너, Koreer가 함께합니다.
              전문적인 취업 정보와 맞춤형 서비스로 여러분의 글로벌 커리어를 지원합니다.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom className={styles.title}>
              Quick Links
            </Typography>
            <ul className={styles.linkList}>
              {/*<li>*/}
              {/*  <RouterLink to="/about-us" className={styles.link}>회사 소개</RouterLink>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <RouterLink to="/membership" className={styles.link}>멤버십</RouterLink>*/}
              {/*</li>*/}
              <li>
                <RouterLink to="/contact" className={styles.link}>문의하기</RouterLink>
              </li>
              <li>
                <RouterLink to="/terms" className={styles.link}>이용약관</RouterLink>
              </li>
              <li>
                <RouterLink to="/privacy" className={styles.link}>개인정보처리방침</RouterLink>
              </li>
            </ul>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom className={styles.title}>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph className={styles.contactInfo}>
              Email: koreerkorea@gmail.com<br />
              Phone: +82 02-123-4567<br />
              Address: 서울특별시 강남구 테헤란로
            </Typography>
            <Box className={styles.socialLinks}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box className={styles.bottom}>
          <Typography variant="body2" align="center" className={styles.copyright}>
            © {new Date().getFullYear()} Koreer. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};