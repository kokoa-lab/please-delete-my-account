import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage20 = ({ onClear }: Props) => {
  const [step, setStep] = useState<"button" | "confirm" | "waiting">("button");
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (step !== "waiting") return;
    if (timer <= 0) {
      onClear();
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timer, onClear]);

  return (
    <BrowserFrame title="최종 확인">
      <div className="p-8 text-center">
        {step === "button" && (
          <>
            <h2 className="stage-title mb-2">마지막 단계</h2>
            <p className="text-sm text-muted-foreground mb-8">
              축하합니다. 19단계를 모두 통과하셨습니다.<br />
              이제 마지막 버튼 하나만 누르면 됩니다.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep("confirm")}
              className="px-12 py-4 bg-destructive text-destructive-foreground rounded-lg text-lg font-bold shadow-lg"
            >
              계정 영구 삭제
            </motion.button>
          </>
        )}

        {step === "confirm" && (
          <>
            <h2 className="stage-title mb-4">정말 삭제하시겠습니까?</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStep("waiting")}
                className="px-8 py-3 bg-destructive text-destructive-foreground rounded-md font-medium"
              >
                네
              </button>
              <button
                onClick={() => setStep("button")}
                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-md font-medium"
              >
                아니오
              </button>
            </div>
          </>
        )}

        {step === "waiting" && (
          <>
            <h2 className="stage-title mb-2">처리 대기 중</h2>
            <p className="text-sm text-muted-foreground mb-6">
              탈퇴 처리까지 30일이 소요됩니다.<br />
              <span className="text-xs">(실제로는 {timer}초만 기다리시면 됩니다)</span>
            </p>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54 * (timer / 15)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold tabular-nums">{timer}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              페이지를 떠나지 마세요...
            </p>
          </>
        )}
      </div>
    </BrowserFrame>
  );
};

export default Stage20;
