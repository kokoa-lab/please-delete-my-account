import { useState } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

// None of them are road signs - clicking "Skip" is the answer
const IMAGES = [
  "🏠", "🌳", "🚗", "🐕", "🌺", "☁️", "🍕", "📱", "✈️"
];

const Stage10 = ({ onClear }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const toggleSelect = (i: number) => {
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    setError("");
  };

  const handleVerify = () => {
    setAttempts(prev => prev + 1);
    setError("인증에 실패했습니다. 도로 표지판이 포함된 이미지를 모두 선택해주세요.");
    setSelected([]);
  };

  return (
    <BrowserFrame title="보안 인증">
      <div className="p-6">
        <h2 className="stage-title mb-2">로봇이 아님을 증명하세요</h2>
        <p className="text-sm text-muted-foreground mb-4">
          아래 이미지에서 <strong className="text-foreground">도로 표지판</strong>을 모두 고르세요.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4 max-w-xs mx-auto">
          {IMAGES.map((emoji, i) => (
            <button
              key={i}
              onClick={() => toggleSelect(i)}
              className={`aspect-square rounded-md text-3xl flex items-center justify-center border-2 transition-colors ${
                selected.includes(i)
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:bg-secondary"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-destructive mb-3 text-center">{error}</p>}
        
        {attempts >= 2 && (
          <p className="text-xs text-muted-foreground mb-3 text-center">
            💡 힌트: 도로 표지판이 없다면...?
          </p>
        )}

        <div className="flex gap-2 justify-center">
          <button
            onClick={handleVerify}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            확인
          </button>
          <button
            onClick={onClear}
            className="px-6 py-2 text-sm text-muted-foreground hover:underline"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
};

export default Stage10;
