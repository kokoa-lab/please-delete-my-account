import { useState } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage9 = ({ onClear }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", reason: "", detail: "",
    rating: "", suggestion: "", date: "", time: "", confirm: false,
  });

  if (submitted) {
    return (
      <div className="stage-container">
        <div className="bg-card border border-border rounded-md p-8 text-center">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">502</h1>
          <h2 className="text-xl font-bold mb-2">Bad Gateway</h2>
          <p className="text-sm text-muted-foreground mb-6">
            서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            nginx/1.18.0 (Ubuntu)
          </p>
          <div className="mt-8 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              💡 힌트: 개발자 도구(F12)의 콘솔을 확인해보세요... 라고 하지만, 
              실은 이 페이지 아래에 진짜 버튼이 있습니다.
            </p>
          </div>
          <div className="mt-32 opacity-5 hover:opacity-100 transition-opacity duration-500">
            <button
              onClick={onClear}
              className="text-xs text-muted-foreground underline"
            >
              실제 탈퇴 처리
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserFrame title="회원탈퇴 신청서">
      <div className="p-6">
        <h2 className="stage-title mb-4">탈퇴 신청서 작성</h2>
        <p className="text-xs text-muted-foreground mb-6">모든 항목을 빠짐없이 작성해주세요.</p>

        <div className="space-y-3">
          {[
            { label: "이름", key: "name", type: "text" },
            { label: "이메일", key: "email", type: "email" },
            { label: "전화번호", key: "phone", type: "tel" },
            { label: "탈퇴 사유 (20자 이상)", key: "reason", type: "text" },
            { label: "상세 내용 (50자 이상)", key: "detail", type: "text" },
            { label: "서비스 만족도 (1-10)", key: "rating", type: "text" },
            { label: "개선 제안사항", key: "suggestion", type: "text" },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs font-medium text-foreground">{field.label}</label>
              <input
                type={field.type}
                value={(form as any)[field.key]}
                onChange={(e) => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="input-corporate mt-1"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          제출하기
        </button>
      </div>
    </BrowserFrame>
  );
};

export default Stage9;
