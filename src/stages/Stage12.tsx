import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";

interface Props { onClear: () => void }

const Stage12 = ({ onClear }: Props) => {
  const [screen, setScreen] = useState<"browser" | "home" | "app" | "settings" | "delete">("browser");

  if (screen === "browser") {
    return (
      <div className="stage-container text-center">
        <div className="bg-card border border-border rounded-md p-8 mb-4">
          <h2 className="stage-title mb-2">안내</h2>
          <p className="text-sm text-muted-foreground mb-4">
            회원탈퇴는 '해피페이' 앱에서만 가능합니다.<br />
            모바일 기기에서 앱을 실행해주세요.
          </p>
          <button
            onClick={() => setScreen("home")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            모바일 앱 열기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <PhoneFrame appName={screen === "home" ? undefined : "해피페이"}>
        {screen === "home" && (
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-4 text-center">홈 화면</p>
            <div className="grid grid-cols-4 gap-4">
              {["카메라", "설정", "사진", "메모", "지도", "음악", "메일", "해피페이", "쇼핑", "은행", "날씨", "시계"].map(app => (
                <button
                  key={app}
                  onClick={() => app === "해피페이" ? setScreen("app") : null}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                    app === "해피페이" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    {app === "해피페이" ? "💰" : app === "카메라" ? "📷" : app === "설정" ? "⚙️" : app === "사진" ? "🖼️" : app === "메모" ? "📝" : app === "지도" ? "🗺️" : app === "음악" ? "🎵" : app === "메일" ? "📧" : app === "쇼핑" ? "🛒" : app === "은행" ? "🏦" : app === "날씨" ? "☀️" : "⏰"}
                  </div>
                  <span className="text-[10px]">{app}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === "app" && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setScreen("home")} className="text-primary text-sm">← 뒤로</button>
            </div>
            <h3 className="text-lg font-bold mb-4">해피페이</h3>
            <div className="space-y-3">
              {["결제 내역", "포인트 관리", "쿠폰함", "이벤트", "설정"].map(item => (
                <button
                  key={item}
                  onClick={() => item === "설정" ? setScreen("settings") : null}
                  className="w-full text-left py-3 px-4 bg-card rounded-md border border-border text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === "settings" && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setScreen("app")} className="text-primary text-sm">← 뒤로</button>
              <span className="text-sm font-medium">설정</span>
            </div>
            <div className="space-y-3">
              {["알림 설정", "보안 설정", "앱 정보", "로그아웃", "회원탈퇴"].map(item => (
                <button
                  key={item}
                  onClick={() => item === "회원탈퇴" ? setScreen("delete") : null}
                  className={`w-full text-left py-3 px-4 rounded-md border border-border text-sm ${
                    item === "회원탈퇴" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === "delete" && (
          <div className="p-4 text-center">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setScreen("settings")} className="text-primary text-sm">← 뒤로</button>
            </div>
            <div className="text-4xl mb-4">😢</div>
            <h3 className="text-lg font-bold mb-2">정말 떠나시나요?</h3>
            <p className="text-xs text-muted-foreground mb-6">
              해피페이와 함께한 소중한 시간이 사라집니다.
            </p>
            <button
              onClick={onClear}
              className="w-full py-3 bg-destructive text-destructive-foreground rounded-md text-sm font-medium"
            >
              회원 탈퇴
            </button>
          </div>
        )}
      </PhoneFrame>
    </div>
  );
};

export default Stage12;
