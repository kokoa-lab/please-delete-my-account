import { useState, useEffect } from "react";
import PhoneFrame from "@/components/PhoneFrame";

interface Props { onClear: () => void }

const SEQUENCE = ["1", "4", "7", "*", "9", "#"];

const Stage6 = ({ onClear }: Props) => {
  const [dialed, setDialed] = useState("");
  const [calling, setCalling] = useState(false);
  const [inputSeq, setInputSeq] = useState<string[]>([]);
  const [holdTime, setHoldTime] = useState(0);
  const [onHold, setOnHold] = useState(false);

  useEffect(() => {
    if (!onHold) return;
    const interval = setInterval(() => {
      setHoldTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [onHold]);

  const dialNumber = (num: string) => {
    if (!calling) {
      setDialed(prev => prev + num);
    } else if (onHold) {
      const newSeq = [...inputSeq, num];
      setInputSeq(newSeq);
      
      // Check sequence
      const correct = SEQUENCE.slice(0, newSeq.length).every((s, i) => s === newSeq[i]);
      if (!correct) {
        setInputSeq([]);
      } else if (newSeq.length === SEQUENCE.length) {
        onClear();
      }
    }
  };

  const call = () => {
    if (dialed === "15881234") {
      setCalling(true);
      setTimeout(() => setOnHold(true), 1500);
    } else {
      setDialed("");
    }
  };

  const buttons = ["1","2","3","4","5","6","7","8","9","*","0","#"];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground text-center">
        회원탈퇴는 고객센터(1588-1234)를 통해서만 가능합니다.
      </p>
      <PhoneFrame appName="전화">
        <div className="p-4 flex flex-col items-center">
          {!calling ? (
            <>
              <div className="text-2xl font-bold tracking-widest mb-6 h-8 text-foreground">
                {dialed || " "}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {buttons.map(b => (
                  <button
                    key={b}
                    onClick={() => dialNumber(b)}
                    className="w-14 h-14 rounded-full bg-secondary text-foreground font-medium text-lg flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    {b}
                  </button>
                ))}
              </div>
              <button
                onClick={call}
                className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl"
              >
                📞
              </button>
              <button
                onClick={() => setDialed("")}
                className="mt-2 text-xs text-muted-foreground"
              >
                지우기
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              {onHold ? (
                <>
                  <div className="text-4xl mb-4">🎵</div>
                  <p className="text-sm font-medium mb-1">통화 대기 중...</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    대기 시간: {Math.floor(holdTime / 60)}:{String(holdTime % 60).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    "소중한 고객님의 전화를 기다리고 있습니다~♪"
                  </p>
                  <p className="text-xs text-primary font-medium mb-4">
                    ARS 메뉴: {SEQUENCE.join(" → ")} 순서로 입력하세요
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    입력: {inputSeq.join(" → ") || "-"}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {buttons.map(b => (
                      <button
                        key={b}
                        onClick={() => dialNumber(b)}
                        className="w-10 h-10 rounded-full bg-secondary text-foreground text-sm flex items-center justify-center hover:bg-muted"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">📞</div>
                  <p className="text-sm font-medium">연결 중...</p>
                  <p className="text-xs text-muted-foreground">1588-1234</p>
                </>
              )}
            </div>
          )}
        </div>
      </PhoneFrame>
    </div>
  );
};

export default Stage6;
