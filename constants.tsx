
import { PortfolioItem } from './types';

// [중요] 배포 시 모든 방문자에게 기본으로 보여줄 데이터입니다.
// 실제 유튜브 링크(videoUrl)와 설명을 여기에 작성하세요.
export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: '브랜드 광고 / 프로모션',
    category: 'Motion Graphic',
    description: '브랜드 인지도를 높이기 위한 2D 모션 광고 영상입니다.\n기획 단계부터 디자인, 모션 그래픽, 최종 편집까지\n전 과정을 100% 개인 작업으로 진행하였습니다.',
    videoUrl: 'https://www.youtube.com/watch?v=실제_영상_ID_1', 
    points: ['타이포 애니메이션', '리듬감 있는 컷 편집'],
    purpose: '브랜드 아이덴티티 강화'
  },
  {
    id: '2',
    title: '인포그래픽 / 정보 전달 영상',
    category: 'Infographic',
    description: '복잡한 비즈니스 모델이나 정보를 시각적으로 정리했습니다.\nAfter Effects 기반의 깔끔한 아이콘 애니메이션을 활용하여\n시청자의 가독성과 정보 전달력을 극대화하였습니다.',
    videoUrl: 'https://www.youtube.com/watch?v=실제_영상_ID_2',
    points: ['데이터 시각화', '안정적인 모션'],
    purpose: '복잡한 정보의 쉬운 전달'
  },
  {
    id: '3',
    title: 'SNS / 숏폼 콘텐츠 (9:16)',
    category: 'Short-form',
    description: '모바일 환경에 최적화된 9:16 비율의 숏폼 콘텐츠입니다.\n빠른 템포의 컷 구성과 시선을 사로잡는 효과를 통해\nSNS 매체에서 높은 도달률을 기록할 수 있도록 제작했습니다.',
    videoUrl: 'https://www.youtube.com/watch?v=실제_영상_ID_3',
    points: ['9:16 세로 비율', '트렌디한 편집'],
    purpose: '매체 도달 및 클릭률 향상'
  },
  {
    id: '4',
    title: '캐릭터 / 일러스트 기반 모션',
    category: 'Character',
    description: '일러스트레이션 캐릭터에 생동감을 불어넣은 작업입니다.\n캐릭터의 감정 변화에 따른 표정과 움직임의 타이밍을 정교하게 설계하여\n친근하고 따뜻한 무드의 브랜드 이미지를 형성합니다.',
    videoUrl: 'https://www.youtube.com/watch?v=실제_영상_ID_4',
    points: ['캐릭터 리깅', '자연스러운 관절 모션'],
    purpose: '브랜드 캐릭터 활성화'
  },
  {
    id: '5',
    title: 'UI / 앱 소개 모션',
    category: 'UI/UX Motion',
    description: '애플리케이션의 핵심 기능을 설명하는 2D 가이드 영상입니다.\n사용자 시나리오를 바탕으로 한 부드러운 화면 전환과\n인터랙션 강조 효과를 적용해 서비스의 가치를 효과적으로 보여줍니다.',
    videoUrl: 'https://www.youtube.com/watch?v=실제_영상_ID_5',
    points: ['스크린 교체', '직관적인 가이드'],
    purpose: '신규 서비스 온보딩 지원'
  }
];

export const TECH_STACKS = [
  { name: 'After Effects', icon: 'AE' },
  { name: 'Premiere Pro', icon: 'PR' },
  { name: 'Photoshop', icon: 'PS' },
  { name: 'Illustrator', icon: 'AI' }
];

export const PROCESS_STEPS = [
  {
    id: 1,
    title: '기획 이해',
    description: '목표와 타겟을 분석하여 최적의 연출 방향을 설정합니다.',
    icon: 'target'
  },
  {
    id: 2,
    title: '비주얼 전략',
    description: '스타일 프레임과 무드 보드로 시각적 톤을 맞춥니다.',
    icon: 'layout'
  },
  {
    id: 3,
    title: '모션 제작',
    description: '중간 피드백을 수용하며 디테일한 움직임을 구현합니다.',
    icon: 'message'
  },
  {
    id: 4,
    title: '최종 검수',
    description: '완성도 높은 결과물을 마감 기한 내에 전달합니다.',
    icon: 'check'
  }
];
