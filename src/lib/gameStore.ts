const STORAGE_KEY = "pdma-progress";

export interface GameProgress {
  clearedStages: number[];
  currentStage: number;
}

export function getProgress(): GameProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { clearedStages: [], currentStage: 1 };
}

export function saveProgress(progress: GameProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearStage(stageNum: number) {
  const progress = getProgress();
  if (!progress.clearedStages.includes(stageNum)) {
    progress.clearedStages.push(stageNum);
  }
  progress.currentStage = Math.max(progress.currentStage, stageNum + 1);
  saveProgress(progress);
  return progress;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export const TOTAL_STAGES = 20;

export const STAGE_NAMES: Record<number, string> = {
  1: "기본적인 탈퇴",
  2: "네/아니오 셔플",
  3: "약관의 늪",
  4: "비밀번호 지옥",
  5: "부서 돌리기",
  6: "전화 상담",
  7: "숨겨진 버튼",
  8: "동의의 함정",
  9: "가짜 에러",
  10: "가스라이팅 캡차",
  11: "404 페이지",
  12: "앱으로 유도",
  13: "설문조사 덫",
  14: "타이밍 챌린지",
  15: "색상 퍼즐",
  16: "드래그 앤 드롭",
  17: "다크모드 트릭",
  18: "축소되는 창",
  19: "사회적 압박",
  20: "최후의 모욕",
};
