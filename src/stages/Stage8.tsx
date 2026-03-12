import { useState } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage8 = ({ onClear }: Props) => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // The trick: checkbox 1 says "탈퇴를 취소" so you must UNCHECK it
    // checkbox 2 is real consent
    // checkbox 3 is "계속 이용" trap
    if (!checked1 && checked2 && !checked3) {
      onClear();
    } else {
      if (checked1) setError("체크박스 내용을 다시 한번 꼼꼼히 읽어주세요.");
      else if (checked3) setError("해당 항목을 다시 확인해주세요.");
      else setError("필수 동의 항목을 확인해주세요.");
    }
  };

  return (
    <BrowserFrame title="회원탈퇴 - 동의서">
      <div className="p-6">
        <h2 className="stage-title mb-4">탈퇴 동의서</h2>

        <div className="space-y-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer p-3 bg-card rounded-md border border-border">
            <input
              type="checkbox"
              checked={checked1}
              onChange={(e) => { setChecked1(e.target.checked); setError(""); }}
              className="w-4 h-4 mt-0.5 accent-primary"
            />
            <span className="text-sm leading-relaxed">
              회원 탈퇴에 따른 모든 혜택(포인트 13,472P, 쿠폰 3장)을 포기하고{" "}
              <strong className="text-destructive">탈퇴를 취소</strong>하는 것에 동의합니다.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer p-3 bg-card rounded-md border border-border">
            <input
              type="checkbox"
              checked={checked2}
              onChange={(e) => { setChecked2(e.target.checked); setError(""); }}
              className="w-4 h-4 mt-0.5 accent-primary"
            />
            <span className="text-sm leading-relaxed">
              본인은 서비스 이용약관 제7조에 따라 회원탈퇴를 신청하며, 이에 따른 모든 결과를 이해하고 동의합니다.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer p-3 bg-card rounded-md border border-border">
            <input
              type="checkbox"
              checked={checked3}
              onChange={(e) => { setChecked3(e.target.checked); setError(""); }}
              className="w-4 h-4 mt-0.5 accent-primary"
            />
            <span className="text-sm leading-relaxed">
              회원탈퇴를 철회하고 서비스를 계속 이용하겠습니다. (선택)
            </span>
          </label>
        </div>

        {error && (
          <p className="text-xs text-destructive mb-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          제출
        </button>
      </div>
    </BrowserFrame>
  );
};

export default Stage8;
