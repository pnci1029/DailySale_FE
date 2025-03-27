import React, {useState} from 'react';
import {motion} from 'framer-motion';
import style from "../../assets/scss/sub/seminar.module.scss";
import {ArrowForward, CalendarToday, People, Search} from '@mui/icons-material';
import {ComponentHelmet} from "../../features/common/ComponentHelmet";

export function Seminar() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const applySeminar = () => {
        window.open("https://docs.google.com/forms/d/1s8KW2xbS1wNg1ywRMaOBBDo6tMbMjGm-zQSwGyr-1Jc/edit");
    }

    const categories = [
        { id: 'tech', name: '기술 인터뷰 대비', icon: '💻' },
        { id: 'visa', name: '비자 준비 과정', icon: '✈️' },
        { id: 'culture', name: '현지 문화 이해', icon: '🌎' },
        { id: 'career', name: '커리어 상담', icon: '💼' },
    ];

    const seminarData = [
        {
            title: "기술 인터뷰 완벽 준비",
            description: "기술 인터뷰에서 자주 묻는 질문과 모범 답안을 소개합니다.",
            currentParticipants: 11,
            maxCapacity: 20,
            category: 'tech',
            date: '2024-01-20',
            time: '19:00',
            instructor: '김민수 (전 Google SWE)',
            format: '온라인 실시간',
            benefits: ['실전 모의면접 기회', '질문 리스트 제공', '답변 피드백']
        },
        {
            title: "H-1B 비자 프로세스 안내",
            description: "H-1B 비자를 성공적으로 준비하기 위한 가이드를 제공합니다.",
            currentParticipants: 15,
            maxCapacity: 25,
            category: 'visa',
            date: '2024-01-25',
            time: '20:00',
            instructor: '박지영 (이민법 전문가)',
            format: '온라인 실시간',
            benefits: ['비자 신청 체크리스트', '케이스 스터디', '1:1 질문 시간']
        },
        {
            title: "미국 현지 문화와 비즈니스 매너",
            description: "현지 문화 적응과 비즈니스 에티켓에 대해 배울 수 있습니다.",
            currentParticipants: 8,
            maxCapacity: 15,
            category: 'culture',
            date: '2024-01-30',
            time: '18:30',
            instructor: '이상훈 (실리콘밸리 10년차)',
            format: '온라인 실시간',
            benefits: ['문화 충격 대처법', '네트워킹 팁', '실제 사례 공유']
        },
        {
            title: "이력서 및 커버레터 작성 팁",
            description: "해외 취업을 위한 효과적인 이력서 작성법을 공유합니다.",
            currentParticipants: 18,
            maxCapacity: 30,
            category: 'career',
            date: '2024-02-05',
            time: '19:30',
            instructor: '최영희 (테크 리크루터)',
            format: '온라인 실시간',
            benefits: ['이력서 템플릿 제공', '실시간 첨삭', '합격 사례 분석']
        }
    ];

    const filteredSeminars = seminarData.filter(seminar => {
        const matchesCategory = !selectedCategory || seminar.category === selectedCategory;
        const matchesSearch = !searchTerm || 
            seminar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            seminar.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className={style.seminarInfo}>
            <motion.div 
                className={style.hero}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>해외 취업 세미나</h1>
                <p>해외 취업에 필요한 실전 정보와 인사이트를 제공하는 전문가 세미나에 참여하세요</p>
                <div className={style.searchBox}>
                    <Search className={style.searchIcon} />
                    <input
                        type="text"
                        placeholder="세미나 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </motion.div>

            <motion.div 
                className={style.categorySection}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h2>세미나 카테고리</h2>
                <div className={style.categoryList}>
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className={`${style.categoryItem} ${selectedCategory === category.id ? style.active : ''}`}
                            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={style.categoryIcon}>{category.icon}</span>
                            <span className={style.categoryName}>{category.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div 
                className={style.seminarList}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h2>진행 예정 세미나</h2>
                <div className={style.seminarGrid}>
                    {filteredSeminars.map((seminar, index) => (
                        <motion.div
                            key={index}
                            className={style.seminarCard}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className={style.cardHeader}>
                                <span className={style.format}>{seminar.format}</span>
                                <h3>{seminar.title}</h3>
                                <p className={style.instructor}>{seminar.instructor}</p>
                            </div>
                            
                            <p className={style.description}>{seminar.description}</p>
                            
                            <div className={style.details}>
                                <div className={style.detailItem}>
                                    <CalendarToday />
                                    <span>{seminar.date} {seminar.time}</span>
                                </div>
                                <div className={style.detailItem}>
                                    <People />
                                    <span>
                                        {seminar.currentParticipants}/{seminar.maxCapacity}명
                                    </span>
                                </div>
                            </div>

                            <div className={style.benefits}>
                                <h4>세미나 혜택</h4>
                                <ul>
                                    {seminar.benefits.map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <motion.button
                                className={style.applyButton}
                                onClick={applySeminar}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                신청하기
                                <ArrowForward />
                            </motion.button>

                            <div className={style.capacityBar}>
                                <div 
                                    className={style.progress} 
                                    style={{ 
                                        width: `${(seminar.currentParticipants / seminar.maxCapacity) * 100}%`
                                    }} 
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <ComponentHelmet title={"Koreer - 세미나"} />
        </div>
    );
}