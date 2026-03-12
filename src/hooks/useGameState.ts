import { useState, useCallback } from "react";
import { clearStage, getProgress, TOTAL_STAGES } from "@/lib/gameStore";

export function useGameState() {
  const [progress, setProgress] = useState(getProgress);
  
  const handleStageClear = useCallback((stageNum: number) => {
    const newProgress = clearStage(stageNum);
    setProgress({ ...newProgress });
  }, []);

  const goToStage = useCallback((stageNum: number) => {
    setProgress(prev => ({ ...prev, currentStage: stageNum }));
  }, []);

  const isStageUnlocked = useCallback((stageNum: number) => {
    if (stageNum === 1) return true;
    return progress.clearedStages.includes(stageNum - 1);
  }, [progress.clearedStages]);

  return {
    progress,
    handleStageClear,
    goToStage,
    isStageUnlocked,
    totalStages: TOTAL_STAGES,
  };
}
