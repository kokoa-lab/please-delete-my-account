import { useState, useEffect, useCallback } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage14 = ({ onClear }: Props) => {
  const [showButton, setShowButton] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [missCount, setMissCount] = useState(0);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setShowButton(true);
      setCountdown(5);
      setTimeout(() => {
        setShowButton(false);
        setMissCount(prev => prev + 1);
      }, 500);
    }, 5000);

    return () => clearInterval(showInterval);
  }, []);

  useEffect(() => {
    if (!showButton) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showButton]);

  const handleClick = useCallback(() => {
    if (showButton) onClear();
  }, [showButton, onClear]);

  return (
    <BrowserFrame title="회원탈퇴">
      <div className="p-8 text-center">
        <h2 className="stage-title mb-2">타이밍 챌린지</h2>
        <p className="text-sm text-muted-foreground mb-6">
          탈퇴 버튼은 5초마다 0.5초간만 나타납니다.
        </p>

        <div className="mb-6">
          <div className="text-3xl font-bold text-primary tabular-nums mb-2">
            {showButton ? "지금!" : `${countdown}초 후`}
          </div>
          <div className="w-full bg-muted rounded-full h-2 max-w-xs mx-auto">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${showButton ? 100 : (5 - countdown) * 20}%` }}
            />
          </div>
        </div>

        <div className="h-16 flex items-center justify-center">
          {showButton ? (
            <button
              onClick={handleClick}
              className="px-8 py-3 bg-destructive text-destructive-foreground rounded-md text-sm font-medium animate-pulse"
            >
              🚨 탈퇴하기 🚨
            </button>
          ) : (
            <div className="text-muted-foreground text-sm">
              버튼을 기다리세요...
            </div>
          )}
        </div>

        {missCount > 0 && (
          <p className="text-xs text-muted-foreground mt-4">
            놓친 횟수: {missCount}회
          </p>
        )}
      </div>
    </BrowserFrame>
  );
};

export default Stage14;
