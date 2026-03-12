import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProgress, resetProgress, TOTAL_STAGES } from "@/lib/gameStore";

const CompletePage = () => {
  const navigate = useNavigate();
  const progress = getProgress();
  const allCleared = progress.clearedStages.length >= TOTAL_STAGES;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="text-center max-w-md"
      >
        {allCleared ? (
          <>
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              축하합니다!
            </h1>
            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
              20개의 다크패턴을 모두 뚫고 회원탈퇴에 성공하셨습니다.
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              실제 서비스에서는 이런 일이 없어야 합니다.
              <br />
              사용자의 선택을 존중하는 UX를 만듭시다.
            </p>
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={() => { resetProgress(); navigate("/"); }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium"
              >
                처음부터 다시 하기
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:underline"
              >
                메인으로
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">아직 모든 스테이지를 클리어하지 않았습니다.</h1>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
            >
              돌아가기
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CompletePage;
