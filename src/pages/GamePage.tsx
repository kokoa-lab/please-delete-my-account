import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StageWrapper from "@/components/StageWrapper";
import { clearStage, STAGE_NAMES } from "@/lib/gameStore";
import Stage1 from "@/stages/Stage1";
import Stage2 from "@/stages/Stage2";
import Stage3 from "@/stages/Stage3";
import Stage4 from "@/stages/Stage4";
import Stage5 from "@/stages/Stage5";
import Stage6 from "@/stages/Stage6";
import Stage7 from "@/stages/Stage7";
import Stage8 from "@/stages/Stage8";
import Stage9 from "@/stages/Stage9";
import Stage10 from "@/stages/Stage10";
import Stage11 from "@/stages/Stage11";
import Stage12 from "@/stages/Stage12";
import Stage13 from "@/stages/Stage13";
import Stage14 from "@/stages/Stage14";
import Stage15 from "@/stages/Stage15";
import Stage16 from "@/stages/Stage16";
import Stage17 from "@/stages/Stage17";
import Stage18 from "@/stages/Stage18";
import Stage19 from "@/stages/Stage19";
import Stage20 from "@/stages/Stage20";

const STAGE_COMPONENTS: Record<number, React.ComponentType<{ onClear: () => void }>> = {
  1: Stage1, 2: Stage2, 3: Stage3, 4: Stage4, 5: Stage5,
  6: Stage6, 7: Stage7, 8: Stage8, 9: Stage9, 10: Stage10,
  11: Stage11, 12: Stage12, 13: Stage13, 14: Stage14, 15: Stage15,
  16: Stage16, 17: Stage17, 18: Stage18, 19: Stage19, 20: Stage20,
};

const GamePage = () => {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const stageNum = parseInt(stageId || "1", 10);

  const StageComponent = STAGE_COMPONENTS[stageNum];

  const handleClear = useCallback(() => {
    clearStage(stageNum);
    if (stageNum >= 20) {
      navigate("/complete");
    } else {
      navigate(`/stage/${stageNum + 1}`);
    }
  }, [stageNum, navigate]);

  if (!StageComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">존재하지 않는 스테이지입니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StageWrapper stageNum={stageNum} title={STAGE_NAMES[stageNum]} onClear={handleClear}>
        {(onClear: () => void) => <StageComponent onClear={onClear} />}
      </StageWrapper>
    </div>
  );
};

export default GamePage;
