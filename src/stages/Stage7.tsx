import { useState } from "react";
import BrowserFrame from "@/components/BrowserFrame";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface Props { onClear: () => void }

interface MenuItem {
  label: string;
  children?: MenuItem[];
  isWithdraw?: boolean;
}

const MENU: MenuItem[] = [
  {
    label: "프로필 수정",
    children: [
      { label: "프로필 사진 변경" },
      { label: "닉네임 변경" },
      { label: "자기소개 수정" },
      { label: "SNS 연동" },
    ],
  },
  {
    label: "알림 설정",
    children: [
      { label: "푸시 알림" },
      { label: "이메일 알림" },
      { label: "SMS 알림" },
      { label: "야간 알림 차단" },
      { label: "마케팅 수신 동의" },
    ],
  },
  {
    label: "개인정보 수정",
    children: [
      { label: "이메일 변경" },
      { label: "전화번호 변경" },
      { label: "주소 변경" },
      { label: "생년월일 수정" },
    ],
  },
  {
    label: "비밀번호 변경",
    children: [
      { label: "현재 비밀번호 확인" },
      { label: "새 비밀번호 설정" },
      { label: "2단계 인증 설정" },
    ],
  },
  {
    label: "연동 서비스 관리",
    children: [
      { label: "Google 연동" },
      { label: "Apple 연동" },
      { label: "카카오 연동" },
      { label: "네이버 연동" },
    ],
  },
  {
    label: "결제 수단 관리",
    children: [
      { label: "카드 등록/변경" },
      { label: "결제 내역 조회" },
      { label: "자동 결제 해지" },
      {
        label: "기타 결제 설정",
        children: [
          { label: "포인트 관리" },
          { label: "쿠폰 관리" },
          { label: "환불 정책 안내" },
          {
            label: "계정 관련 기타",
            children: [
              { label: "휴면 계정 전환" },
              { label: "로그인 기록 조회" },
              { label: "회원탈퇴", isWithdraw: true },
            ],
          },
        ],
      },
    ],
  },
];

const Stage7 = ({ onClear }: Props) => {
  const [path, setPath] = useState<number[]>([]);

  const getCurrentMenu = (): MenuItem[] => {
    let items = MENU;
    for (const idx of path) {
      const item = items[idx];
      if (item?.children) {
        items = item.children;
      }
    }
    return items;
  };

  const getCurrentTitle = (): string => {
    if (path.length === 0) return "계정 설정";
    let items = MENU;
    let title = "계정 설정";
    for (const idx of path) {
      title = items[idx].label;
      if (items[idx].children) items = items[idx].children!;
    }
    return title;
  };

  const goBack = () => setPath(prev => prev.slice(0, -1));

  const handleClick = (item: MenuItem, index: number) => {
    if (item.isWithdraw) {
      onClear();
      return;
    }
    if (item.children) {
      setPath(prev => [...prev, index]);
    }
  };

  const currentItems = getCurrentMenu();

  return (
    <BrowserFrame title="마이페이지 > 설정">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {path.length > 0 && (
            <button onClick={goBack} className="p-1 hover:bg-muted rounded-md transition-colors">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          <h2 className="stage-title">{getCurrentTitle()}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {path.length === 0
            ? "아래에서 원하시는 설정을 변경하세요."
            : "항목을 선택하세요."}
        </p>

        <div className="space-y-2">
          {currentItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item, i)}
              className={`w-full flex items-center justify-between py-3 px-4 rounded-md border transition-colors text-left ${
                item.isWithdraw
                  ? "border-border/30 text-muted-foreground/60 text-xs hover:border-destructive hover:text-destructive"
                  : "bg-card border-border hover:bg-muted"
              }`}
            >
              <span className={`${item.isWithdraw ? "text-xs" : "text-sm"}`}>{item.label}</span>
              {item.children ? (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              ) : item.isWithdraw ? null : (
                <span className="text-muted-foreground text-sm">→</span>
              )}
            </button>
          ))}
        </div>

        {path.length === 0 && (
          <p className="text-xs text-muted-foreground mt-6 text-center">
            💡 힌트: 회원탈퇴 버튼은 메뉴 깊은 곳에 숨겨져 있습니다.
          </p>
        )}
      </div>
    </BrowserFrame>
  );
};

export default Stage7;
