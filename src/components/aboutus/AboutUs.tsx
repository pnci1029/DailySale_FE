import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
} from '@mui/material';
import {
  Rocket,
  Groups,
  TrendingUp,
  Public,
  Psychology,
  Diversity3,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styles from '../../assets/scss/sub/aboutus.module.scss';
import { ComponentHelmet } from "../../features/common/ComponentHelmet";

const visionPoints = [
  {
    icon: <Rocket />,
    title: '글로벌 경쟁력 강화',
    description: '한국 IT 인재들의 글로벌 경쟁력을 높이고, 세계 무대에서 활약할 수 있는 기회를 제공합니다.',
    detail: '실리콘밸리, 유럽, 아시아 등 전 세계 IT 기업들과의 네트워크를 통해 다양한 취업 기회를 제공하며, 글로벌 기준에 맞는 역량 개발을 지원합니다.'
  },
  {
    icon: <Groups />,
    title: '글로벌 한인 커뮤니티',
    description: '해외 각지에서 활동하는 IT 전문가들과의 네트워킹을 통해 강력한 글로벌 한인 커뮤니티를 구축합니다.',
    detail: '현지에서 활동 중인 선배들과의 멘토링, 온/오프라인 네트워킹 이벤트, 정보 공유 플랫폼을 통해 실질적인 도움을 제공합니다.'
  },
  {
    icon: <TrendingUp />,
    title: '지속적인 성장 지원',
    description: '취업 이후에도 계속되는 경력 개발과 성장을 위한 다양한 프로그램을 제공합니다.',
    detail: '기술 트렌드 교육, 리더십 프로그램, 글로벌 프로젝트 참여 기회 등을 통해 지속적인 성장을 돕습니다.'
  }
];

const impactPoints = [
  {
    icon: <Public />,
    title: '글로벌 진출',
    stat: '10+',
    description: '진출 국가'
  },
  {
    icon: <Psychology />,
    title: '전문 멘토링',
    stat: '100+',
    description: '현직자 멘토'
  },
  {
    icon: <Diversity3 />,
    title: '커뮤니티',
    stat: '1,000+',
    description: '글로벌 네트워크 회원'
  }
];

export const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg" className={styles.aboutContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <Typography variant="h3" className={styles.title}>
          About Koreer
        </Typography>
        <Typography variant="h6" className={styles.subtitle}>
          IT 인재들의 글로벌 성장을 이끄는 플랫폼
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={styles.mission}
      >
        <Typography variant="h4" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          Koreer는 한국의 우수한 IT 인재들이 글로벌 무대에서 자신의 꿈을 실현할 수 있도록 돕는 것을 목표로 합니다.
          단순한 채용 플랫폼을 넘어, 해외 취업을 준비하는 모든 과정에서 실질적인 도움을 제공하는 파트너가 되고자 합니다.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={styles.visionPoints}
      >
        <Grid container spacing={4}>
          {visionPoints.map((point, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className={styles.visionCard}>
                <CardContent>
                  <Box className={styles.iconWrapper}>
                    {point.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom className={styles.pointTitle}>
                    {point.title}
                  </Typography>
                  <Typography variant="body1" paragraph className={styles.pointDescription}>
                    {point.description}
                  </Typography>
                  <Typography variant="body2" className={styles.pointDetail}>
                    {point.detail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={styles.impact}
      >
        <Typography variant="h4" gutterBottom className={styles.impactTitle}>
          Our Impact
        </Typography>
        <Grid container spacing={4}>
          {impactPoints.map((point, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box className={styles.impactCard}>
                <Box className={styles.iconWrapper}>
                  {point.icon}
                </Box>
                <Typography variant="h3" className={styles.stat}>
                  {point.stat}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {point.title}
                </Typography>
                <Typography variant="body1">
                  {point.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className={styles.values}
      >
        <Typography variant="h4" gutterBottom>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary">
              혁신성
            </Typography>
            <Typography variant="body1">
              IT 업계의 빠른 변화에 발맞춰 지속적으로 혁신하며, 
              최신 트렌드와 기술을 반영한 서비스를 제공합니다.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary">
              전문성
            </Typography>
            <Typography variant="body1">
              각 분야 전문가들의 실전 경험과 노하우를 바탕으로
              실질적이고 전문적인 취업 지원 서비스를 제공합니다.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary">
              신뢰성
            </Typography>
            <Typography variant="body1">
              투명하고 정확한 정보 제공으로 신뢰를 쌓으며,
              지원자와 기업 모두가 만족하는 결과를 만들어냅니다.
            </Typography>
          </Grid>
        </Grid>
      </motion.div>
      <ComponentHelmet title={"Koreer - About Us"} />
    </Container>
  );
};