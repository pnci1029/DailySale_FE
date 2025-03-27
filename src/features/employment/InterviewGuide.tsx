import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Chip,
} from '@mui/material';
import {
  School,
  Work,
  Psychology,
  Code,
  Build,
  TrendingUp,
  Person,
  DataObject,
  Storage as StorageIcon,
  Architecture,
  Speed,
  Group as GroupIcon,
  Lightbulb,
  CheckCircle,
  Warning as WarningIcon,
  ExpandMore,
  Link as LinkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/shared/layouts/PageLayout';
import { InfoCard } from '../../components/shared/InfoCard';

interface Question {
  en: string;
  kr: string;
  example: string;
  tips: string[];
}

interface Example {
  title: string;
  problem: string;
  solution: string;
  explanation: string;
  tips: string[];
}

interface Point {
  title: string;
  details: string[];
}

interface ContentWithExamples {
  subtitle: string;
  examples: Example[];
  type: 'examples';
}

interface ContentWithPoints {
  subtitle: string;
  points: Point[];
  type: 'points';
}

type Content = ContentWithExamples | ContentWithPoints;

interface TechnicalTopic {
  title: string;
  icon: React.ReactElement;
  content: Content[];
}

interface CodingTopic {
  title: string;
  icon: React.ReactElement;
  content: Content[];
}

interface BehavioralTopic {
  title: string;
  icon: React.ReactElement;
  questions: Question[];
}

interface CodingResource {
  title: string;
  description: string;
  url: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

interface CodingPlatform {
  name: string;
  description: string;
  url: string;
  features: string[];
}

interface TechnicalQuestion {
  question: string;
  questionKr: string;
  keyPoints: string[];
  example: string;
  tips: string[];
}

interface TechnicalCategory {
  category: string;
  questions: TechnicalQuestion[];
}

const codingPlatforms: CodingPlatform[] = [
  {
    name: 'LeetCode',
    description: '가장 인기 있는 코딩 테스트 준비 플랫폼으로, FAANG 기업들의 실제 면접 문제를 연습할 수 있습니다.',
    url: 'https://leetcode.com',
    features: [
      '2000+ 문제 보유',
      '실제 기업 면접 문제',
      '토론 및 솔루션 공유',
      '코딩 대회'
    ]
  },
  {
    name: 'HackerRank',
    description: '다양한 프로그래밍 언어를 지원하며, 기업들이 실제 채용에 많이 사용하는 플랫폼입니다.',
    url: 'https://www.hackerrank.com',
    features: [
      '기업 채용 시 많이 사용',
      '언어별 기초 학습',
      '실전 면접 준비',
      '자격증 취득'
    ]
  },
  {
    name: 'Programmers',
    description: '한국 기업들의 코딩 테스트를 준비하기 위한 최적의 플랫폼입니다.',
    url: 'https://programmers.co.kr',
    features: [
      '한국어 지원',
      '국내 기업 기출 문제',
      '실전 모의고사',
      '커뮤니티 지원'
    ]
  }
];

const algorithmPatterns: CodingResource[] = [
  {
    title: '투 포인터 (Two Pointers)',
    description: '배열이나 문자열을 순회할 때 두 개의 포인터를 사용하여 문제를 해결하는 패턴',
    url: 'https://leetcode.com/tag/two-pointers/',
    difficulty: 'Medium',
    tags: ['Array', 'String']
  },
  {
    title: '슬라이딩 윈도우 (Sliding Window)',
    description: '연속된 요소들의 부분집합을 찾는 문제를 효율적으로 해결하는 패턴',
    url: 'https://leetcode.com/tag/sliding-window/',
    difficulty: 'Medium',
    tags: ['Array', 'String', 'Optimization']
  },
  {
    title: '이진 탐색 (Binary Search)',
    description: '정렬된 배열에서 효율적으로 값을 찾는 알고리즘',
    url: 'https://leetcode.com/tag/binary-search/',
    difficulty: 'Easy',
    tags: ['Array', 'Search']
  }
];

const companyGuides = [
  {
    company: 'Google',
    resources: [
      {
        title: 'Google 코딩 인터뷰 준비',
        description: '시스템 설계와 알고리즘 문제 해결 능력이 중요',
        url: 'https://leetcode.com/company/google/',
        tags: ['Algorithm', 'System Design']
      }
    ]
  },
  {
    company: 'Meta',
    resources: [
      {
        title: 'Meta 코딩 테스트 가이드',
        description: '실제 서비스 상황에서의 문제 해결 능력 중시',
        url: 'https://leetcode.com/company/facebook/',
        tags: ['Problem Solving', 'Optimization']
      }
    ]
  }
];

function isContentWithExamples(content: Content): content is ContentWithExamples {
  return content.type === 'examples';
}

function isContentWithPoints(content: Content): content is ContentWithPoints {
  return content.type === 'points';
}

const codingTestContent = (
  <Box>
    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
      코딩 테스트 준비 가이드
    </Typography>
    
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">추천 코딩 플랫폼</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {codingPlatforms.map((platform) => (
            <Grid item xs={12} md={4} key={platform.name}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                <Stack spacing={2}>
                  <Typography variant="h6" component="h3">
                    {platform.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {platform.description}
                  </Typography>
                  <List dense>
                    {platform.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Link
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LinkIcon fontSize="small" />
                    방문하기
                  </Link>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">주요 알고리즘 패턴</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {algorithmPatterns.map((pattern) => (
            <Grid item xs={12} md={4} key={pattern.title}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h3">
                      {pattern.title}
                    </Typography>
                    <Chip
                      label={pattern.difficulty}
                      color={
                        pattern.difficulty === 'Easy'
                          ? 'success'
                          : pattern.difficulty === 'Medium'
                          ? 'warning'
                          : 'error'
                      }
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {pattern.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {pattern.tags?.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                  <Link
                    href={pattern.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LinkIcon fontSize="small" />
                    예제 문제 풀어보기
                  </Link>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">기업별 가이드</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {companyGuides.map((guide) => (
            <Grid item xs={12} md={6} key={guide.company}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {guide.company}
                </Typography>
                {guide.resources.map((resource, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{resource.title}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {resource.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                      {resource.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <LinkIcon fontSize="small" />
                      학습하기
                    </Link>
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        코딩 테스트 성공을 위한 팁
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              시간 관리
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="문제를 읽고 이해하는데 충분한 시간을 투자하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="어려운 문제에 너무 많은 시간을 쓰지 마세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="테스트 케이스 작성에 시간을 할애하세요" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              문제 해결 전략
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="문제를 작은 단위로 나누어 접근하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="시간/공간 복잡도를 항상 고려하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="엣지 케이스를 꼭 확인하세요" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

const technicalResources = [
  {
    name: 'System Design Primer',
    description: '시스템 설계 면접을 위한 포괄적인 학습 자료',
    url: 'https://github.com/donnemartin/system-design-primer',
    features: [
      '대규모 시스템 설계 원칙',
      '실제 사례 연구',
      '성능과 확장성',
      '아키텍처 패턴'
    ]
  },
  {
    name: 'Tech Interview Handbook',
    description: 'FAANG 기업의 기술 면접 준비를 위한 완벽 가이드',
    url: 'https://www.techinterviewhandbook.org',
    features: [
      '알고리즘 학습 로드맵',
      '기술 면접 체크리스트',
      '행동 면접 준비',
      '협상 전략'
    ]
  },
  {
    name: 'ByteByteGo',
    description: '시스템 설계와 아키텍처에 대한 심층적인 학습 플랫폼',
    url: 'https://bytebytego.com',
    features: [
      '시스템 설계 인터뷰',
      '실제 아키텍처 사례',
      '성능 최적화',
      'DB 설계'
    ]
  }
];

const technicalTopicResources = [
  {
    topic: '분산 시스템',
    resources: [
      {
        title: 'Distributed Systems Reading List',
        description: '분산 시스템의 핵심 개념과 논문 모음',
        url: 'https://dancres.github.io/Pages/',
        tags: ['Theory', 'Academic']
      },
      {
        title: 'Designing Data-Intensive Applications',
        description: '데이터 중심 애플리케이션 설계의 바이블',
        url: 'https://dataintensive.net/',
        tags: ['Book', 'Practical']
      }
    ]
  },
  {
    topic: '클라우드 네이티브',
    resources: [
      {
        title: 'CNCF Landscape',
        description: '클라우드 네이티브 기술 생태계 가이드',
        url: 'https://landscape.cncf.io/',
        tags: ['Cloud', 'Tools']
      },
      {
        title: 'Kubernetes Documentation',
        description: '컨테이너 오케스트레이션 완벽 가이드',
        url: 'https://kubernetes.io/docs/home/',
        tags: ['Container', 'DevOps']
      }
    ]
  }
];

const commonTechnicalQuestions: TechnicalCategory[] = [
  {
    category: '시스템 설계',
    questions: [
      {
        question: '대규모 메시징 시스템 설계',
        questionKr: '대규모 메시징 시스템을 어떻게 설계하시겠습니까?',
        keyPoints: [
          '확장성 있는 아키텍처',
          '실시간 처리',
          '데이터 일관성',
          '장애 복구'
        ],
        example: `시스템 설계 접근 방식:

1. 요구사항 분석
   - 메시지 전송/수신 지연 시간
   - 동시 접속자 수
   - 메시지 저장 기간
   - 오프라인 메시지 처리

2. 아키텍처 설계
   - WebSocket 서버 클러스터
   - 메시지 큐 (Kafka/RabbitMQ)
   - 분산 데이터베이스
   - 캐시 레이어

3. 확장성 전략
   - 수평적 확장 가능한 구조
   - 데이터베이스 샤딩
   - 로드 밸런싱
   - CDN 활용`,
        tips: [
          '실시간성과 확장성의 균형',
          '장애 상황 고려',
          '데이터 정합성 보장',
          '모니터링 전략 수립'
        ]
      },
      {
        question: '검색 자동완성 시스템 설계',
        questionKr: '검색 자동완성 시스템을 어떻게 설계하시겠습니까?',
        keyPoints: [
          '트라이(Trie) 자료구조',
          '캐싱 전략',
          '실시간 업데이트',
          '랭킹 알고리즘'
        ],
        example: `자동완성 시스템 구현 방안:

1. 데이터 구조
   - Trie 구조 활용
   - 각 노드에 빈도수 저장
   - 메모리 최적화

2. 랭킹 시스템
   - 검색 빈도 기반
   - 최신성 고려
   - 사용자 컨텍스트 활용

3. 성능 최적화
   - 인메모리 캐싱
   - 배치 업데이트
   - 프리픽스 압축`,
        tips: [
          'Trie 구조의 장단점 이해',
          '메모리 사용량 최적화',
          '실시간 업데이트 전략',
          '사용자 경험 고려'
        ]
      }
    ]
  },
  {
    category: '데이터베이스',
    questions: [
      {
        question: 'SQL vs NoSQL 비교',
        questionKr: 'SQL과 NoSQL의 차이점과 각각의 사용 사례에 대해 설명해주세요.',
        keyPoints: [
          '데이터 모델',
          '확장성',
          'ACID 속성',
          '사용 사례'
        ],
        example: `SQL vs NoSQL 비교 분석:

1. 데이터 모델
   - SQL: 정규화된 스키마
   - NoSQL: 유연한 스키마

2. 확장성
   - SQL: 수직적 확장 중심
   - NoSQL: 수평적 확장 용이

3. 일관성
   - SQL: 강한 일관성
   - NoSQL: 최종적 일관성

4. 사용 사례
   - SQL: 금융, 전자상거래
   - NoSQL: 실시간 분석, 로그 처리`,
        tips: [
          '실제 사용 경험 공유',
          '트레이드오프 설명',
          '성능 특성 이해',
          '확장성 고려사항'
        ]
      },
      {
        question: '데이터베이스 샤딩 전략',
        questionKr: '데이터베이스 샤딩을 어떻게 구현하시겠습니까?',
        keyPoints: [
          '샤딩 키 선택',
          '데이터 분산',
          '조인 처리',
          '리밸런싱'
        ],
        example: `샤딩 구현 전략:

1. 샤딩 키 선정
   - 데이터 분포도 고려
   - 접근 패턴 분석
   - 확장성 고려

2. 분산 전략
   - 범위 기반 샤딩
   - 해시 기반 샤딩
   - 디렉토리 기반 샤딩

3. 운영 관리
   - 리밸런싱 자동화
   - 모니터링 시스템
   - 백업 전략`,
        tips: [
          '샤딩 키 선택 기준',
          '데이터 분산 전략',
          '장애 복구 방안',
          '성능 모니터링'
        ]
      }
    ]
  }
];

const technicalInterviewContent = (
  <Box>
    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
      기술 면접 준비 가이드
    </Typography>
    
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">추천 학습 리소스</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {technicalResources.map((resource) => (
            <Grid item xs={12} md={6} key={resource.name}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                <Stack spacing={2}>
                  <Typography variant="h6" component="h3">
                    {resource.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resource.description}
                  </Typography>
                  <List dense>
                    {resource.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LinkIcon fontSize="small" />
                    방문하기
                  </Link>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">주요 기술 분야별 자료</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {technicalTopicResources.map((topicResource) => (
            <Grid item xs={12} md={6} key={topicResource.topic}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {topicResource.topic}
                </Typography>
                {topicResource.resources.map((resource, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{resource.title}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {resource.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                      {resource.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <LinkIcon fontSize="small" />
                      학습하기
                    </Link>
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">자주 나오는 기술 면접 질문</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {commonTechnicalQuestions.map((category) => (
            <Grid item xs={12} key={category.category}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {category.category}
                </Typography>
                {category.questions.map((q, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {q.question}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {q.questionKr}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      핵심 포인트:
                    </Typography>
                    <List dense>
                      {q.keyPoints.map((point, pIndex) => (
                        <ListItem key={pIndex}>
                          <ListItemIcon>
                            <CheckCircle color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={point} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      예시 답변:
                    </Typography>
                    <Paper sx={{ p: 2, bgcolor: 'background.default', my: 1 }}>
                      <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                        {q.example}
                      </Typography>
                    </Paper>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      답변 팁:
                    </Typography>
                    <List dense>
                      {q.tips.map((tip, tIndex) => (
                        <ListItem key={tIndex}>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        기술 면접 성공을 위한 팁
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              면접 준비
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="기업의 기술 스택과 아키텍처를 미리 조사하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="시스템 설계 문제는 화이트보드로 연습하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="실제 프로젝트 경험을 기반으로 답변을 준비하세요" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              면접 진행
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="문제 해결 과정을 명확히 설명하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="트레이드오프를 고려하여 설명하세요" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="확장성과 유지보수성을 항상 고려하세요" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

const behavioralCategories = [
  {
    category: '리더십과 팀워크',
    questions: [
      {
        question: 'Tell me about a time when you had to lead a challenging project.',
        questionKr: '어려운 프로젝트를 이끌어야 했던 경험에 대해 말씀해주세요.',
        keyPoints: [
          '명확한 목표 설정과 역할 분담',
          '팀원들과의 효과적인 커뮤니케이션',
          '문제 해결 과정과 의사결정',
          '결과 및 학습한 점'
        ],
        example: `"글로벌 팀과 함께한 마이크로서비스 전환 프로젝트를 주도했습니다.

상황: 레거시 시스템의 현대화가 필요했고, 5개국 15명의 개발자들과 협업했습니다.
과제: 6개월 내에 코어 서비스의 마이크로서비스 전환을 완료해야 했습니다.
행동:
- 주간 목표 설정과 데일리 스크럼 미팅 진행
- 문서화와 코드 리뷰 프로세스 표준화
- 기술적 의사결정을 위한 RFC 프로세스 도입
- 팀원들의 성장을 위한 페어 프로그래밍 장려
결과: 기한 내 성공적인 전환 완료, 배포 시간 70% 단축, 팀 생산성 향상"`,
        tips: [
          'STAR 방식으로 구체적 사례 준비',
          '정량적 성과 포함',
          '팀 중심적 사고방식 강조',
          '배운 점과 성장 경험 공유'
        ]
      }
    ]
  },
  {
    category: '문제 해결 능력',
    questions: [
      {
        question: 'Describe a situation where you had to solve a complex technical problem.',
        questionKr: '복잡한 기술적 문제를 해결했던 경험을 설명해주세요.',
        keyPoints: [
          '문제 분석과 원인 파악',
          '해결 방안 도출 과정',
          '실행과 모니터링',
          '결과 검증'
        ],
        example: `"프로덕션 환경에서 발생한 심각한 성능 이슈를 해결했습니다.

상황: 사용자가 급증하면서 응답 시간이 10배 이상 증가하는 문제 발생
과제: 서비스 중단 없이 성능 문제 해결 필요
행동:
- APM 도구로 병목 지점 분석
- 데이터베이스 쿼리 최적화
- 캐싱 계층 도입
- 로드 밸런싱 전략 개선
결과: 응답 시간 90% 감소, 시스템 안정성 확보"`,
        tips: [
          '기술적 깊이와 문제 해결 과정 강조',
          '데이터 기반의 의사결정 설명',
          '팀 협업 과정 포함',
          '장기적 해결책 제시'
        ]
      }
    ]
  },
  {
    category: '문화적 적응력',
    questions: [
      {
        question: 'How do you adapt to working in a diverse, multicultural environment?',
        questionKr: '다양한 문화권의 동료들과 일할 때 어떻게 적응하시나요?',
        keyPoints: [
          '문화적 차이 이해와 존중',
          '효과적인 커뮤니케이션 전략',
          '갈등 해결 방식',
          '팀 화합 도모'
        ],
        example: `"실리콘밸리 기업의 글로벌 팀에서 일한 경험이 있습니다.

상황: 미국, 인도, 유럽 개발자들과 협업하는 프로젝트 참여
과제: 시차와 문화적 차이를 극복하며 효율적인 협업 달성
행동:
- 문화적 차이 학습과 존중
- 명확한 문서화와 비동기 커뮤니케이션
- 1:1 미팅으로 관계 구축
- 영어 의사소통 능력 향상
결과: 성공적인 프로젝트 완수와 글로벌 팀워크 모범 사례 선정"`,
        tips: [
          '다양성을 존중하는 태도 강조',
          '구체적인 적응 노력 사례',
          '열린 마인드와 학습 의지 표현',
          '긍정적 결과 공유'
        ]
      }
    ]
  }
];

const behavioralResources = [
  {
    name: 'STAR Method Guide',
    description: '행동 면접에서 가장 효과적인 답변 방식인 STAR 메소드 가이드',
    url: 'https://www.themuse.com/advice/star-interview-method',
    features: [
      'Situation - 상황 설명',
      'Task - 주어진 과제',
      'Action - 취한 행동',
      'Result - 결과 및 영향'
    ]
  },
  {
    name: 'Behavioral Interview Prep',
    description: '해외 기업 인성 면접 준비를 위한 종합 가이드',
    url: 'https://www.techinterviewhandbook.org/behavioral-interview/',
    features: [
      '빈출 질문 분석',
      '답변 구조화 방법',
      '문화 적합성 평가',
      '실전 모의 면접'
    ]
  }
];

const behavioralTips = [
  {
    title: '면접 전 준비',
    tips: [
      '회사의 문화와 가치관 조사',
      '자신의 경험을 STAR 형식으로 정리',
      '영어 의사소통 능력 향상',
      '예상 질문에 대한 답변 준비'
    ]
  },
  {
    title: '면접 중 태도',
    tips: [
      '적극적인 경청과 긍정적 태도',
      '구체적 사례 중심의 답변',
      '명확하고 논리적인 의사전달',
      '진정성 있는 태도 유지'
    ]
  }
];

const behavioralInterviewContent = (
  <Box>
    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
      인성 면접 준비 가이드
    </Typography>
    
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">추천 학습 리소스</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {behavioralResources.map((resource) => (
            <Grid item xs={12} md={6} key={resource.name}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                <Stack spacing={2}>
                  <Typography variant="h6" component="h3">
                    {resource.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resource.description}
                  </Typography>
                  <List dense>
                    {resource.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LinkIcon fontSize="small" />
                    방문하기
                  </Link>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">주요 인성 면접 질문</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {behavioralCategories.map((category) => (
            <Grid item xs={12} key={category.category}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {category.category}
                </Typography>
                {category.questions.map((q, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Q: {q.question}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {q.questionKr}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      핵심 포인트:
                    </Typography>
                    <List dense>
                      {q.keyPoints.map((point, pIndex) => (
                        <ListItem key={pIndex}>
                          <ListItemIcon>
                            <CheckCircle color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={point} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      예시 답변:
                    </Typography>
                    <Paper sx={{ p: 2, bgcolor: 'background.default', my: 1 }}>
                      <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                        {q.example}
                      </Typography>
                    </Paper>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      답변 팁:
                    </Typography>
                    <List dense>
                      {q.tips.map((tip, tIndex) => (
                        <ListItem key={tIndex}>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>

    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        인성 면접 성공을 위한 팁
      </Typography>
      <Grid container spacing={2}>
        {behavioralTips.map((section) => (
          <Grid item xs={12} md={6} key={section.title}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {section.title}
              </Typography>
              <List dense>
                {section.tips.map((tip, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

const codingTestTopics: CodingTopic[] = [
  {
    title: '알고리즘 & 자료구조',
    icon: <Code />,
    content: [
      {
        type: 'examples',
        subtitle: '시스템 설계 문제',
        examples: [
          {
            title: "URL 단축기 설계",
            problem: `대규모 URL 단축 서비스를 설계하시오.
요구사항:
- 긴 URL을 짧은 URL로 변환
- 짧은 URL 접근 시 원래 URL로 리다이렉트
- 높은 가용성과 확장성 보장
- 초당 수천 건의 요청 처리`,
            solution: `
1. 시스템 아키텍처:
- Load Balancer로 트래픽 분산
- 여러 Application Server로 확장성 확보
- Redis Cache로 빠른 조회 지원
- 분산 데이터베이스로 데이터 저장

2. URL 생성 알고리즘:
function generateShortUrl(longUrl: string): string {
  const hash = md5(longUrl + timestamp);
  return base62Encode(hash.substring(0, 7));
}

3. 데이터베이스 스키마:
urls {
  short_url: string (PK),
  long_url: string,
  created_at: timestamp,
  expires_at: timestamp
}`,
            explanation: "1. 해시 함수로 충돌 최소화\n2. Base62 인코딩으로 URL 친화적 문자열 생성\n3. 캐싱으로 읽기 성능 최적화\n4. 분산 시스템으로 확장성 확보",
            tips: [
              '시스템의 확장성 고려',
              '데이터 일관성과 가용성 균형',
              '성능 병목 지점 파악',
              '구체적인 기술 스택 제시'
            ]
          }
        ]
      },
      {
        type: 'examples',
        subtitle: '최적화 문제',
        examples: [
          {
            title: "로그 처리 시스템",
            problem: `대용량 로그 처리 시스템을 구현하시오.
요구사항:
- 초당 100만 건의 로그 처리
- 실시간 집계 및 분석
- 장애 복구 방안
- 비용 효율적인 저장 방식`,
            solution: `
1. 아키텍처 설계:
- Kafka로 로그 수집
- Spark Streaming으로 실시간 처리
- Elasticsearch로 검색 및 분석
- S3로 콜드 스토리지 활용

2. 처리 로직:
class LogProcessor {
  private val consumer = KafkaConsumer<String, String>()
  private val processor = SparkSession.builder()
    .appName("LogProcessor")
    .getOrCreate()

  def processLogs(): Unit = {
    val stream = processor.readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "localhost:9092")
      .load()

    val query = stream.writeStream
      .outputMode("append")
      .format("elasticsearch")
      .start()

    query.awaitTermination()
  }
}`,
            explanation: "1. 메시지 큐로 버퍼링\n2. 스트림 처리로 실시간성 확보\n3. 분산 검색으로 빠른 조회\n4. 데이터 생명주기 관리로 비용 최적화",
            tips: [
              '대용량 데이터 처리 패턴',
              '실시간 처리와 배치 처리 조합',
              '장애 복구 전략',
              '모니터링 및 알림 설계'
            ]
          }
        ]
      },
      {
        type: 'examples',
        subtitle: '웹 개발 심화',
        examples: [
          {
            title: '프론트엔드 최적화',
            problem: `프론트엔드 성능을 최적화하는 방법에 대해 설명해주세요.`,
            solution: `
1. 성능 버디 설정
2. 코드 스플리팅 & 지연 로딩
3. SSR vs CSR vs SSG
4. Web Vitals 최적화`,
            explanation: "1. 성능 버디 설정\n2. 코드 스플리팅 & 지연 로딩\n3. SSR vs CSR vs SSG\n4. Web Vitals 최적화",
            tips: [
              '성능 버디 설정',
              '코드 스플리팅 & 지연 로딩',
              'SSR vs CSR vs SSG',
              'Web Vitals 최적화'
            ]
          },
          {
            title: '백엔드 아키텍처',
            problem: `백엔드 아키텍처에 대해 설명해주세요.`,
            solution: `
1. API Gateway 패턴
2. GraphQL vs REST
3. CQRS & Event Sourcing
4. Rate Limiting & Security`,
            explanation: "1. API Gateway 패턴\n2. GraphQL vs REST\n3. CQRS & Event Sourcing\n4. Rate Limiting & Security",
            tips: [
              'API Gateway 패턴',
              'GraphQL vs REST',
              'CQRS & Event Sourcing',
              'Rate Limiting & Security'
            ]
          }
        ]
      }
    ]
  },
  {
    title: '시스템 디자인',
    icon: <Architecture />,
    content: [
      {
        type: 'points',
        subtitle: '핵심 고려사항',
        points: [
          {
            title: '확장성 (Scalability)',
            details: [
              '수평적/수직적 확장 전략',
              '데이터베이스 샤딩 방식',
              '캐시 계층 설계',
              '마이크로서비스 아키텍처'
            ]
          },
          {
            title: '안정성 (Reliability)',
            details: [
              '장애 복구 전략',
              'Circuit Breaker 패턴',
              'Rate Limiting 구현',
              '데이터 백업 및 복제'
            ]
          }
        ]
      }
    ]
  }
];

export function InterviewGuide(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/interview-guide') {
      // Redirect to technical by default
      navigate('/interview-guide/technical');
    }
  }, [location.pathname, navigate]);

  const navigationTabs = [
    {
      label: '기술 면접',
      path: '/interview-guide/technical',
      icon: <Code />
    },
    {
      label: '인성 면접',
      path: '/interview-guide/behavioral',
      icon: <Person />
    },
    {
      label: '코딩 테스트',
      path: '/interview-guide/coding-test',
      icon: <DataObject />
    }
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '취업 정보', path: '/employment-info' },
    { label: '면접 준비' }
  ];

  const technicalTopics: TechnicalTopic[] = [
    {
      title: '시스템 디자인',
      icon: <Architecture />,
      content: [
        {
          type: 'points',
          subtitle: '주요 토픽',
          points: [
            {
              title: '분산 시스템 설계',
              details: [
                '대규모 시스템의 확장성 고려사항',
                'Load Balancing과 Caching 전략',
                'Microservices vs Monolithic 아키텍처',
                'CAP 이론과 실제 적용'
              ]
            },
            {
              title: '실시간 처리 시스템',
              details: [
                'Event-driven 아키텍처 설계',
                'Message Queue 시스템 활용',
                'Real-time Data Processing',
                'Fault Tolerance 전략'
              ]
            }
          ]
        }
      ]
    },
    {
      title: '클라우드 & DevOps',
      icon: <Build />,
      content: [
        {
          type: 'points',
          subtitle: '핵심 개념',
          points: [
            {
              title: 'AWS/Azure/GCP',
              details: [
                '주요 서비스 비교 및 활용',
                'Infrastructure as Code',
                'CI/CD 파이프라인 구축',
                '클라우드 비용 최적화'
              ]
            },
            {
              title: '컨테이너화',
              details: [
                'Docker 컨테이너 관리',
                'Kubernetes 오케스트레이션',
                'Service Mesh 아키텍처',
                'Monitoring & Logging'
              ]
            }
          ]
        }
      ]
    },
    {
      title: '웹 개발 심화',
      icon: <Code />,
      content: [
        {
          type: 'points',
          subtitle: '고급 주제',
          points: [
            {
              title: '프론트엔드 최적화',
              details: [
                'Performance Budgets',
                'Code Splitting & Lazy Loading',
                'SSR vs CSR vs SSG',
                'Web Vitals 최적화'
              ]
            },
            {
              title: '백엔드 아키텍처',
              details: [
                'API Gateway 패턴',
                'GraphQL vs REST',
                'CQRS & Event Sourcing',
                'Rate Limiting & Security'
              ]
            }
          ]
        }
      ]
    }
  ];

  const behavioralTopics: BehavioralTopic[] = [
    {
      title: '문화적 적응력',
      icon: <GroupIcon />,
      questions: [
        {
          en: "How would you handle working in a multicultural environment?",
          kr: "다문화 환경에서의 업무 경험이나 적응 방법에 대해 설명해주세요.",
          example: `"저는 글로벌 프로젝트에서 다양한 문화권의 동료들과 협업한 경험이 있습니다.

상황: 미국, 인도, 유럽의 개발자들과 함께하는 프로젝트를 진행했습니다.
과제: 시차와 문화적 차이를 극복하며 효율적인 협업을 이뤄내야 했습니다.
행동:
- 문화적 차이를 이해하고 존중하는 태도 유지
- 명확한 문서화와 비동기 커뮤니케이션 활용
- 정기적인 1:1 미팅으로 팀원들과 관계 구축
- 영어 의사소통 능력 지속적 개선
결과: 성공적인 프로젝트 완수와 함께, 글로벌 팀워크의 모범 사례로 선정되었습니다."`,
          tips: [
            '문화적 차이를 존중하는 태도 강조',
            '효과적인 커뮤니케이션 전략 설명',
            '구체적인 적응 노력 사례 제시',
            '긍정적인 결과와 배운 점 공유'
          ]
        }
      ]
    },
    {
      title: '도전과 혁신',
      icon: <Lightbulb />,
      questions: [
        {
          en: "Tell me about a time when you introduced an innovative solution.",
          kr: "혁신적인 해결책을 제시하고 실행한 경험에 대해 말씀해주세요.",
          example: `"레거시 시스템을 현대화하는 과정에서 혁신적인 마이그레이션 전략을 제안했습니다.

상황: 10년 된 모놀리식 시스템이 확장성과 유지보수에 어려움을 겪고 있었습니다.
과제: 서비스 중단 없이 시스템을 현대화해야 했습니다.
행동:
- 점진적 마이그레이션 전략 수립
- 새로운 기술 스택 평가 및 선정
- 팀원들의 기술 교육 프로그램 운영
- A/B 테스팅으로 안정성 검증
결과: 6개월간 단계적 마이그레이션을 통해 시스템 성능 50% 향상, 배포 시간 90% 단축을 달성했습니다."`,
          tips: [
            '혁신적 사고방식 강조',
            '기술적 리더십 보여주기',
            '위험 관리 능력 설명',
            '측정 가능한 성과 제시'
          ]
        }
      ]
    },
    {
      title: '원격 근무 역량',
      icon: <Speed />,
      questions: [
        {
          en: "How do you maintain productivity and communication in a remote work environment?",
          kr: "원격 근무 환경에서 생산성과 커뮤니케이션을 어떻게 유지하시나요?",
          example: `"팬데믹 이후 완전 원격 팀을 이끌며 효율적인 업무 프로세스를 구축했습니다.

상황: 갑작스러운 원격 근무 전환으로 팀 생산성 저하 우려가 있었습니다.
과제: 원격 환경에서도 높은 생산성과 팀워크를 유지해야 했습니다.
행동:
- 체계적인 문서화 시스템 도입
- 비동기 커뮤니케이션 도구 최적화
- 데일리 스탠드업과 주간 회고 운영
- 명확한 목표 설정과 진행 상황 추적
결과: 원격 전환 후 오히려 팀 생산성이 20% 향상되었고, 팀원 만족도도 증가했습니다."`,
          tips: [
            '원격 근무 경험 구체화',
            '자기주도적 업무 능력 강조',
            '효율적인 커뮤니케이션 방법 설명',
            '성과 중심의 업무 방식 제시'
          ]
        }
      ]
    }
  ];

  const codingTestTopics: CodingTopic[] = [
    {
      title: '알고리즘 & 자료구조',
      icon: <Code />,
      content: [
        {
          type: 'examples',
          subtitle: '시스템 설계 문제',
          examples: [
            {
              title: "URL 단축기 설계",
              problem: `대규모 URL 단축 서비스를 설계하시오.
요구사항:
- 긴 URL을 짧은 URL로 변환
- 짧은 URL 접근 시 원래 URL로 리다이렉트
- 높은 가용성과 확장성 보장
- 초당 수천 건의 요청 처리`,
              solution: `
1. 시스템 아키텍처:
- Load Balancer로 트래픽 분산
- 여러 Application Server로 확장성 확보
- Redis Cache로 빠른 조회 지원
- 분산 데이터베이스로 데이터 저장

2. URL 생성 알고리즘:
function generateShortUrl(longUrl: string): string {
  const hash = md5(longUrl + timestamp);
  return base62Encode(hash.substring(0, 7));
}

3. 데이터베이스 스키마:
urls {
  short_url: string (PK),
  long_url: string,
  created_at: timestamp,
  expires_at: timestamp
}`,
              explanation: "1. 해시 함수로 충돌 최소화\n2. Base62 인코딩으로 URL 친화적 문자열 생성\n3. 캐싱으로 읽기 성능 최적화\n4. 분산 시스템으로 확장성 확보",
              tips: [
                '시스템의 확장성 고려',
                '데이터 일관성과 가용성 균형',
                '성능 병목 지점 파악',
                '구체적인 기술 스택 제시'
              ]
            }
          ]
        },
        {
          type: 'examples',
          subtitle: '최적화 문제',
          examples: [
            {
              title: "로그 처리 시스템",
              problem: `대용량 로그 처리 시스템을 구현하시오.
요구사항:
- 초당 100만 건의 로그 처리
- 실시간 집계 및 분석
- 장애 복구 방안
- 비용 효율적인 저장 방식`,
              solution: `
1. 아키텍처 설계:
- Kafka로 로그 수집
- Spark Streaming으로 실시간 처리
- Elasticsearch로 검색 및 분석
- S3로 콜드 스토리지 활용

2. 처리 로직:
class LogProcessor {
  private val consumer = KafkaConsumer<String, String>()
  private val processor = SparkSession.builder()
    .appName("LogProcessor")
    .getOrCreate()

  def processLogs(): Unit = {
    val stream = processor.readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "localhost:9092")
      .load()

    val query = stream.writeStream
      .outputMode("append")
      .format("elasticsearch")
      .start()

    query.awaitTermination()
  }
}`,
              explanation: "1. 메시지 큐로 버퍼링\n2. 스트림 처리로 실시간성 확보\n3. 분산 검색으로 빠른 조회\n4. 데이터 생명주기 관리로 비용 최적화",
              tips: [
                '대용량 데이터 처리 패턴',
                '실시간 처리와 배치 처리 조합',
                '장애 복구 전략',
                '모니터링 및 알림 설계'
              ]
            }
          ]
        }
      ]
    },
    {
      title: '시스템 디자인',
      icon: <Architecture />,
      content: [
        {
          type: 'points',
          subtitle: '핵심 고려사항',
          points: [
            {
              title: '확장성 (Scalability)',
              details: [
                '수평적/수직적 확장 전략',
                '데이터베이스 샤딩 방식',
                '캐시 계층 설계',
                '마이크로서비스 아키텍처'
              ]
            },
            {
              title: '안정성 (Reliability)',
              details: [
                '장애 복구 전략',
                'Circuit Breaker 패턴',
                'Rate Limiting 구현',
                '데이터 백업 및 복제'
              ]
            }
          ]
        }
      ]
    }
  ];

  const renderExamples = (examples: Example[]): JSX.Element => (
    <>
      {examples.map((example: Example, eIndex: number) => (
        <Box key={eIndex} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            {example.title}
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.default', mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {example.problem}
            </Typography>
          </Paper>
          <Typography variant="subtitle2" gutterBottom>
            Solution:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.default', mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {example.solution}
            </Typography>
          </Paper>
          <Typography variant="subtitle2" gutterBottom>
            설명:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {example.explanation}
          </Typography>
          <List dense>
            {example.tips.map((tip: string, tIndex: number) => (
              <ListItem key={tIndex}>
                <ListItemIcon>
                  <CheckCircle color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );

  const renderPoints = (points: Point[]): JSX.Element => (
    <>
      {points.map((point: Point, pIndex: number) => (
        <Box key={pIndex}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            {point.title}
          </Typography>
          <List dense>
            {point.details.map((detail: string, dIndex: number) => (
              <ListItem key={dIndex}>
                <ListItemIcon>
                  <CheckCircle color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={detail} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );

  return (
    <PageLayout
      title="해외 취업 면접 가이드"
      subtitle="해외 기업 면접 준비를 위한 완벽 가이드 - 기술, 인성, 코딩 테스트까지"
      tabs={navigationTabs}
      breadcrumbs={breadcrumbs}
    >
      <Stack spacing={4}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Lightbulb fontSize="large" />
            <Box>
              <Typography variant="h6" gutterBottom>
                해외 취업 면접 준비 가이드
              </Typography>
              <Typography variant="body2">
                이 가이드는 FAANG 및 글로벌 기업의 면접 프로세스를 기반으로 제작되었습니다.
                각 섹션의 내용을 철저히 준비하여 성공적인 해외 취업을 이루세요.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {location.pathname.includes('/technical') && technicalInterviewContent}

        {location.pathname.includes('/behavioral') && behavioralInterviewContent}

        {location.pathname.includes('/coding-test') && codingTestContent}

        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'warning.light',
            color: 'warning.contrastText',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <WarningIcon />
            <Typography variant="body2">
              면접 준비는 단순 암기가 아닌 깊이 있는 이해와 실제 경험을 바탕으로 해야 합니다.
              제시된 내용을 참고하되, 자신만의 경험과 생각을 정리하여 준비하세요.
              특히 해외 기업의 경우, 문화적 차이와 영어 의사소통 능력도 중요한 평가 요소입니다.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </PageLayout>
  );
}
