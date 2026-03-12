import { useState } from "react";
import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage13 = ({ onClear }: Props) => {
  const [surveyDone, setSurveyDone] = useState(false);
  const [trapTriggered, setTrapTriggered] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (trapTriggered) {
    return (
      <BrowserFrame title="감사합니다">
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="stage-title mb-2">소중한 의견 감사합니다!</h2>
          <p className="text-sm text-muted-foreground mb-4">
            고객님의 의견을 반영하여 더 나은 서비스를 제공하겠습니다.
          </p>
          <p className="text-xs text-destructive mb-4">
            ⚠️ 탈퇴 진행이 초기화되었습니다.
          </p>
          <button
            onClick={() => {
              setTrapTriggered(false);
              setAttempts(prev => prev + 1);
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            다시 시도
          </button>
          {attempts >= 1 && (
            <p className="text-xs text-muted-foreground mt-4">
              💡 힌트: 설문조사에 응하지 마세요. 무시하고 바로 탈퇴 버튼을 누르세요.
            </p>
          )}
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame title="회원탈퇴 - 사유 선택">
      <div className="p-6">
        <h2 className="stage-title mb-2">더 나은 서비스를 위해</h2>
        <p className="text-sm text-muted-foreground mb-4">
          탈퇴 사유를 알려주세요 (필수)
        </p>

        <div className="space-y-2 mb-6">
          {[
            "서비스 이용이 불편해서",
            "다른 서비스를 이용하려고",
            "개인정보 유출이 걱정되어서",
            "사용 빈도가 낮아서",
            "기타",
          ].map(reason => (
            <label key={reason} className="flex items-center gap-2 p-3 bg-card rounded-md border border-border cursor-pointer">
              <input
                type="radio"
                name="reason"
                onChange={() => setSurveyDone(true)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm">{reason}</span>
            </label>
          ))}
        </div>

        {surveyDone && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setTrapTriggered(true)}
            className="w-full py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium mb-3"
          >
            의견 제출 후 탈퇴 진행
          </motion.button>
        )}

        <button
          onClick={onClear}
          className="w-full py-3 text-sm text-muted-foreground hover:underline"
        >
          설문 건너뛰고 바로 탈퇴
        </button>
      </div>
    </BrowserFrame>
  );
};

export default Stage13;
