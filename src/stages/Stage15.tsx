import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

function generateRound() {
  const colors = [
    { name: "파란색", hsl: "hsl(221 83% 53%)" },
    { name: "빨간색", hsl: "hsl(0 84% 60%)" },
    { name: "초록색", hsl: "hsl(142 71% 45%)" },
    { name: "노란색", hsl: "hsl(50 90% 50%)" },
  ];

  // Pick the target color (the one the user should click)
  const targetIdx = Math.floor(Math.random() * colors.length);
  const target = colors[targetIdx];

  // Shuffle colors for button appearances, but labels are mismatched
  const shuffled = [...colors].sort(() => Math.random() - 0.5);
  // Assign labels: each button gets a DIFFERENT color's name
  const labelPool = [...colors].sort(() => Math.random() - 0.5);
  // Make sure no label matches its button color
  const buttons = shuffled.map((color, i) => {
    let label = labelPool[i].name;
    if (label === color.name) {
      label = labelPool[(i + 1) % labelPool.length].name;
    }
    return { colorName: color.name, hsl: color.hsl, label, textColor: color.name === "노란색" ? "black" : "white" };
  });

  return { targetColorName: target.name, buttons };
}

const Stage15 = ({ onClear }: Props) => {
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(() => generateRound());
  const [shaking, setShaking] = useState(false);
  const [wrongMsg, setWrongMsg] = useState("");

  const handleClick = useCallback((colorName: string) => {
    if (colorName === currentRound.targetColorName) {
      if (round >= totalRounds) {
        onClear();
      } else {
        setRound(r => r + 1);
        setCurrentRound(generateRound());
        setWrongMsg("");
      }
    } else {
      setShaking(true);
      setWrongMsg("버튼의 색상을 확인하세요, 글자가 아닙니다!");
      setTimeout(() => setShaking(false), 300);
    }
  }, [currentRound, round, totalRounds, onClear]);

  return (
    <BrowserFrame title="보안 인증">
      <div className="p-8 text-center">
        <h2 className="stage-title mb-2">색상 인증 ({round}/{totalRounds})</h2>
        <p className="text-sm text-muted-foreground mb-8">
          <strong className="text-foreground">{currentRound.targetColorName}</strong> 버튼을 누르세요.
        </p>

        <motion.div
          animate={shaking ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          {currentRound.buttons.map((btn, i) => (
            <button
              key={`${round}-${i}`}
              onClick={() => handleClick(btn.colorName)}
              className="px-8 py-4 rounded-md text-lg font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: btn.hsl, color: btn.textColor }}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>

        {wrongMsg && (
          <p className="text-xs text-destructive mt-4">
            <strong>{wrongMsg}</strong>
          </p>
        )}

        <div className="flex gap-1 justify-center mt-6">
          {Array.from({ length: totalRounds }, (_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < round ? "bg-accent" : "bg-muted"}`} />
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
};

export default Stage15;
