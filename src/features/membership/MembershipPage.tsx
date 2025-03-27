import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './membership.module.scss';
import {Business, Check, Person, Star} from '@mui/icons-material';
import {ComponentHelmet} from "../../features/common/ComponentHelmet";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  icon: JSX.Element;
  description: string;
  color: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: '기본 멤버십',
    price: '무료',
    period: '평생',
    description: '해외 취업의 첫 걸음을 시작하세요',
    icon: <Person sx={{ fontSize: 40 }} />,
    color: '#2196f3',
    features: [
      '기본 채용 정보 열람',
      '커뮤니티 접근',
      '기본 비자 정보',
      '기업 정보 열람 (제한적)',
      '주간 뉴스레터',
      '기본 이력서 템플릿',
    ],
  },
  {
    name: '프리미엄 멤버십',
    price: '₩500,000',
    period: '월',
    description: '전문가의 도움으로 해외 취업을 앞당기세요',
    icon: <Star sx={{ fontSize: 40 }} />,
    color: '#1565c0',
    features: [
      '모든 채용 정보 실시간 열람',
      'VIP 커뮤니티 무제한 접근',
      '상세 비자 가이드 & 컨설팅',
      '전체 기업 정보 열람',
      '1:1 커리어 상담 (월 2회)',
      '이력서 첨삭 무제한',
      '합격자 인터뷰 자료',
      'AI 기반 채용 매칭',
      '화상 모의면접 (월 1회)',
    ],
    isPopular: true,
  },
  {
    name: '기업 멤버십',
    price: '문의',
    period: '연간',
    description: '최고의 글로벌 인재를 찾아보세요',
    icon: <Business sx={{ fontSize: 40 }} />,
    color: '#0d47a1',
    features: [
      '인재 풀 무제한 접근',
      '기업 페이지 커스텀',
      '채용 공고 무제한 등록',
      '지원자 관리 시스템',
      '실시간 채용 분석 리포트',
      '기업 브랜딩 지원',
      '채용 행사 우선 등록',
      '맞춤형 인재 추천',
      '24/7 기업 전용 상담',
    ],
  },
];

const benefitsData = [
  {
    icon: '🎯',
    title: 'AI 매칭 시스템',
    description: '개인 맞춤형 채용 정보를 실시간으로 받아보세요',
  },
  {
    icon: '👥',
    title: '전문가 네트워크',
    description: '현직자들과 직접 소통하며 실질적인 조언을 얻으세요',
  },
  {
    icon: '📝',
    title: '비자 프로세스',
    description: '국가별 비자 발급 전 과정을 완벽하게 지원합니다',
  },
  {
    icon: '💡',
    title: '커리어 성장',
    description: '해외 취업 후에도 지속적인 성장을 지원합니다',
  },
];

const faqData = [
  {
    question: '멤버십은 언제든지 해지할 수 있나요?',
    answer: '네, 프리미엄 멤버십은 언제든지 해지 가능하며, 해지 시점까지 이용하신 기간에 대해서만 요금이 청구됩니다.',
  },
  {
    question: '프리미엄 멤버십의 상담은 어떻게 진행되나요?',
    answer: '화상 미팅, 이메일, 메신저 등 원하시는 방식으로 진행 가능하며, 전문 컨설턴트가 배정됩니다.',
  },
  {
    question: '기업 멤버십은 어떻게 신청하나요?',
    answer: '기업 멤버십은 기업의 규모와 필요에 따라 맞춤형으로 제공됩니다. 문의하기를 통해 상담을 신청해주세요.',
  },
];

export const MembershipPage: React.FC = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={styles.membershipContainer}>
      <motion.div 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Koreer 멤버십</h1>
        <p>해외 취업의 시작, Koreer와 함께하세요</p>
        <div className={styles.gradientLine} />
      </motion.div>

      <motion.div 
        className={styles.plansContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`${styles.planCard} ${plan.isPopular ? styles.popular : ''}`}
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            style={{
              '--plan-color': plan.color,
            } as React.CSSProperties}
          >
            {plan.isPopular && (
              <div className={styles.popularBadge}>
                <Star sx={{ fontSize: 16, marginRight: 0.5 }} />
                추천
              </div>
            )}
            <div className={styles.planIcon} style={{ backgroundColor: plan.color }}>
              {plan.icon}
            </div>
            <h2>{plan.name}</h2>
            <p className={styles.planDescription}>{plan.description}</p>
            <div className={styles.pricing}>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.period}>/ {plan.period}</span>
            </div>
            <ul className={styles.features}>
              {plan.features.map((feature) => (
                <motion.li 
                  key={feature}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check sx={{ fontSize: 20, color: plan.color }} />
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.button 
              className={`${styles.subscribeButton} ${plan.isPopular ? styles.popularButton : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: plan.color }}
            >
              {plan.price === '문의' ? '문의하기' : '시작하기'}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className={styles.benefits}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>멤버십 혜택</h2>
        <div className={styles.benefitsGrid}>
          {benefitsData.map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              className={styles.benefitCard}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
              }}
            >
              <span className={styles.benefitIcon}>{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className={styles.faq}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>자주 묻는 질문</h2>
        <div className={styles.faqList}>
          {faqData.map((faq, index) => (
            <motion.div 
              key={index}
              className={`${styles.faqItem} ${selectedFaq === index ? styles.active : ''}`}
              variants={itemVariants}
              onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <motion.span
                  animate={{ rotate: selectedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </div>
              <AnimatePresence>
                {selectedFaq === index && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ComponentHelmet title={"Koreer - 멤버십"} />
    </div>
  );
};

export default MembershipPage; 