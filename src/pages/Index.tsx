import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProgress, resetProgress, STAGE_NAMES, TOTAL_STAGES } from "@/lib/gameStore";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getProgress);

  const handleReset = () => {
    resetProgress();
    setProgress(getProgress());
  };

  const nextStage = progress.clearedStages.length >= TOTAL_STAGES
    ? null
    : Math.min(progress.currentStage, TOTAL_STAGES);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="text-center max-w-lg"
        >
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
            please-delete-my-account.코드.kr
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            고객님의 소중한 개인정보,
            <br />
            저희가 안전하게 파기해...
            <br />
            <span className="text-muted-foreground">드리고 싶습니다.</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            대한민국 서비스 회원탈퇴의 모든 다크패턴을 체험하세요.
            <br />
            총 {TOTAL_STAGES}개의 스테이지를 클리어하면 진정한 탈퇴가 완료됩니다.
          </p>

          <div className="flex flex-col items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/stage/${nextStage || 1}`)}
              className="btn-primary-dark rounded-md px-12"
            >
              {progress.clearedStages.length > 0
                ? `Stage ${nextStage}부터 계속하기`
                : "탈퇴 시작하기"}
            </motion.button>

            {progress.clearedStages.length > 0 && (
              <p className="text-xs text-muted-foreground">
                진행률: {progress.clearedStages.length}/{TOTAL_STAGES} 클리어
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Stage select */}
      {progress.clearedStages.length > 0 && (
        <div className="px-4 pb-12 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">스테이지 선택</h2>
            <button onClick={handleReset} className="text-xs text-muted-foreground hover:underline">
              진행 초기화
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map(num => {
              const cleared = progress.clearedStages.includes(num);
              const unlocked = num === 1 || progress.clearedStages.includes(num - 1);

              return (
                <button
                  key={num}
                  onClick={() => unlocked && navigate(`/stage/${num}`)}
                  disabled={!unlocked}
                  className={`aspect-square rounded-md text-sm font-medium flex items-center justify-center border transition-colors ${
                    cleared
                      ? "bg-accent/10 border-accent text-accent"
                      : unlocked
                      ? "bg-card border-border text-foreground hover:bg-secondary"
                      : "bg-muted/50 border-border text-muted-foreground/40 cursor-not-allowed"
                  }`}
                  title={STAGE_NAMES[num]}
                >
                  {cleared ? "✓" : num}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Please Delete My Account · 대한민국 다크패턴 풍자 게임
        </p>
      </footer>
    </div>
  );
};

export default Index;
