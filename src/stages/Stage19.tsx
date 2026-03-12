import { useState } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const FRIENDS = [
  { name: "김민수", emoji: "👨‍💼", status: "방금 결제 완료" },
  { name: "이수진", emoji: "👩‍💻", status: "골드 등급 달성" },
  { name: "박지훈", emoji: "👨‍🎓", status: "포인트 5만P 적립" },
];

const Stage19 = ({ onClear }: Props) => {
  const [clickedFriends, setClickedFriends] = useState<number[]>([]);
  const [showClose, setShowClose] = useState(false);

  const handleFriendClick = (index: number) => {
    if (!clickedFriends.includes(index)) {
      const newClicked = [...clickedFriends, index];
      setClickedFriends(newClicked);
      // Hidden close button is on the 2nd friend's profile picture
      if (index === 1) {
        setShowClose(true);
      }
    }
  };

  return (
    <BrowserFrame title="회원탈퇴">
      <div className="p-6">
        {/* Overlay popup */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg relative">
          <h2 className="stage-title mb-2 text-center">잠깐만요! 🥺</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            당신의 친구 {FRIENDS.length}명이 우리 서비스를 즐겁게 이용하고 있습니다.<br />
            정말 떠나시겠습니까?
          </p>

          <div className="flex justify-center gap-6 mb-6">
            {FRIENDS.map((friend, i) => (
              <button
                key={i}
                onClick={() => handleFriendClick(i)}
                className="flex flex-col items-center gap-2 relative"
              >
                <div className={`w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl border-2 ${
                  clickedFriends.includes(i) ? "border-primary" : "border-transparent"
                }`}>
                  {friend.emoji}
                </div>
                <span className="text-xs font-medium">{friend.name}</span>
                <span className="text-[10px] text-muted-foreground">{friend.status}</span>
                {/* Hidden X button on friend index 1 */}
                {i === 1 && showClose && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onClear(); }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium">
              친구들과 계속 함께하기 💕
            </button>
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              특별 혜택 받고 계속 이용하기
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            💡 힌트: 친구들의 프로필을 자세히 살펴보세요.
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
};

export default Stage19;
