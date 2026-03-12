import { useState } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage17 = ({ onClear }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserFrame title="설정 > 회원탈퇴">
      <div className={`p-6 min-h-[400px] transition-colors duration-300 ${darkMode ? "bg-foreground" : "bg-background"}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`stage-title ${darkMode ? "text-background" : "text-foreground"}`}>
            계정 설정
          </h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className={`text-sm ${darkMode ? "text-background" : "text-foreground"}`}>
              다크 모드
            </span>
            <div
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${darkMode ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-background absolute top-0.5 transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
            </div>
          </label>
        </div>

        <div className="space-y-3 mb-8">
          {["프로필 수정", "알림 설정", "개인정보 관리", "비밀번호 변경"].map(item => (
            <div
              key={item}
              className={`py-3 px-4 rounded-md border text-sm ${
                darkMode ? "border-background/20 text-background/80" : "border-border text-foreground"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Hidden in light mode (black text on white bg), visible in dark mode (now white-ish) */}
        <button
          onClick={onClear}
          className={`text-sm underline transition-colors duration-300 ${
            darkMode ? "text-background" : "text-background"
          }`}
        >
          회원탈퇴
        </button>

        {!darkMode && (
          <p className="text-xs text-muted-foreground mt-8 text-center">
            💡 힌트: 이 페이지에 무언가가 숨겨져 있습니다. 다크 모드를 시도해보세요.
          </p>
        )}
      </div>
    </BrowserFrame>
  );
};

export default Stage17;
