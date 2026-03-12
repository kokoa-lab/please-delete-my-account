import { useState } from "react";
import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const REQUIREMENTS = [
  "18자 이상",
  "대문자 2개 이상 포함",
  "소문자 1개 이상 포함",
  "숫자 3개 이상 포함",
  "특수문자 (!@#$% 중) 2개 이상 포함",
  "이모지 (🐢만 허용) 2개 이상 포함",
  "연속된 같은 문자 2개 이상 불가",
  "본인 이름 포함 불가 (홍길동)",
  "첫 글자는 대문자여야 함",
  "마지막 글자는 느낌표(!)여야 함",
  "숫자의 합이 짝수여야 함",
  "한글 1글자 이상 포함 (이름 제외)",
];

function validatePassword(pw: string): boolean[] {
  const digits = (pw.match(/[0-9]/g) ?? []) as string[];
  const digitSum = digits.reduce((s, d) => s + parseInt(d), 0);
  const specials = (pw.match(/[!@#$%]/g) ?? []) as string[];
  const turtles = ((pw.match(/🐢/g) ?? []) as string[]).length;
  const uppers = (pw.match(/[A-Z]/g) || []).length;
  const koreanChars = pw.replace(/홍길동/g, "").match(/[가-힣]/g) || [];

  return [
    pw.length >= 18,
    uppers >= 2,
    /[a-z]/.test(pw),
    digits.length >= 3,
    specials.length >= 2,
    turtles >= 2,
    !/(.)\1/.test(pw),
    !pw.includes("홍길동"),
    /^[A-Z]/.test(pw),
    pw.endsWith("!"),
    digitSum % 2 === 0,
    koreanChars.length >= 1,
  ];
}

const Stage4 = ({ onClear }: Props) => {
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  const checks = validatePassword(password);
  const allValid = checks.every(Boolean);
  const failCount = checks.filter(c => !c).length;

  const handleSubmit = () => {
    setAttempted(true);
    if (allValid) {
      onClear();
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      if (revealedHints < REQUIREMENTS.length) {
        setRevealedHints(prev => Math.min(prev + 3, REQUIREMENTS.length));
      }
    }
  };

  return (
    <BrowserFrame title="회원탈퇴 - 본인 확인">
      <div className="p-6">
        <h2 className="stage-title mb-1">비밀번호 확인</h2>
        <p className="text-xs text-muted-foreground mb-6">
          탈퇴를 위해 비밀번호를 다시 입력해주세요.
        </p>

        <motion.div animate={shaking ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className={`input-corporate mb-4 ${attempted && !allValid ? "border-destructive ring-1 ring-destructive" : ""}`}
          />
        </motion.div>

        <div className="space-y-1 mb-6">
          <p className="text-xs font-medium text-foreground mb-2">
            비밀번호 요구사항 ({checks.filter(Boolean).length}/{REQUIREMENTS.length}):
          </p>
          {REQUIREMENTS.map((req, i) => {
            // Initially show only first 4, reveal more on failed attempts
            if (i >= 4 && i >= revealedHints + 4) {
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">?</span>
                  <span className="text-muted-foreground italic">???</span>
                </div>
              );
            }
            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className={checks[i] ? "text-accent" : "text-destructive"}>
                  {checks[i] ? "✓" : "✗"}
                </span>
                <span className={checks[i] ? "text-muted-foreground line-through" : "text-foreground"}>
                  {req}
                </span>
              </div>
            );
          })}
        </div>

        {attempted && failCount > 0 && (
          <p className="text-xs text-destructive mb-2">
            {failCount}개 조건이 충족되지 않았습니다. {revealedHints < REQUIREMENTS.length && "실패할수록 숨겨진 조건이 공개됩니다..."}
          </p>
        )}

        <p className="text-xs text-muted-foreground mb-2">
          💡 🐢 이모지: Windows Win+. / Mac Ctrl+Cmd+Space
        </p>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          확인
        </button>
      </div>
    </BrowserFrame>
  );
};

export default Stage4;
