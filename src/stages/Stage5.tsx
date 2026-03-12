import { useState, useRef, useEffect } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

interface Message {
  from: string;
  text: string;
  isSystem?: boolean;
}

const DEPT_NAMES = ["A부서 (고객지원)", "B부서 (회원관리)", "D부서 (보안팀)", "E부서 (서비스기획)"];

const Stage5 = ({ onClear }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "", text: "회원탈퇴 문의를 위해 담당 부서에 연결합니다.", isSystem: true },
  ]);
  const [currentDept, setCurrentDept] = useState(0);
  const [bounceCount, setBounceCount] = useState(0);
  const [showDeptC, setShowDeptC] = useState(false);
  const [waitingTransfer, setWaitingTransfer] = useState(false);
  const [waitTimer, setWaitTimer] = useState(0);
  const [inputText, setInputText] = useState("");
  const [awaitingInput, setAwaitingInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (!waitingTransfer) return;
    if (waitTimer <= 0) {
      setWaitingTransfer(false);
      const nextDept = (currentDept + 1) % DEPT_NAMES.length;
      setMessages(prev => [...prev,
        { from: "", text: `${DEPT_NAMES[nextDept]}에 연결되었습니다.`, isSystem: true },
        { from: DEPT_NAMES[nextDept] + " 상담원", text: getBounceLine(nextDept, bounceCount) },
      ]);
      setCurrentDept(nextDept);
      setBounceCount(prev => prev + 1);

      if (bounceCount >= 2 && !awaitingInput) {
        // Ask for employee number
        setTimeout(() => {
          setMessages(prev => [...prev, {
            from: DEPT_NAMES[nextDept] + " 상담원",
            text: "본인 확인을 위해 사원번호를 입력해주세요.",
          }]);
          setAwaitingInput(true);
          setInputPrompt("사원번호 입력");
        }, 800);
      }
      return;
    }
    const t = setInterval(() => setWaitTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [waitingTransfer, waitTimer]);

  useEffect(() => {
    if (bounceCount >= 5 && !showDeptC) {
      setShowDeptC(true);
      setMessages(prev => [...prev, {
        from: DEPT_NAMES[currentDept] + " 상담원",
        text: "아... 혹시 C부서(특수업무팀)에 문의해보셨나요? 화면 오른쪽을 확인해보세요.",
      }]);
    }
  }, [bounceCount]);

  function getBounceLine(dept: number, count: number): string {
    const lines = [
      "안녕하세요. 회원탈퇴 건은 저희 부서 소관이 아닌데요. 다른 부서로 연결해드리겠습니다.",
      "고객님, 확인해보니 해당 업무는 저희 담당이 아닙니다. 잠시만 기다려주세요.",
      "죄송합니다, 회원탈퇴 처리는 전문 부서에서 진행해야 합니다. 연결 도와드리겠습니다.",
      "네, 접수 확인했습니다만... 저희 팀 업무가 아니라서요. 담당 부서로 이관하겠습니다.",
      "고객님 정말 죄송합니다. 이 건은 다른 부서에서 처리해야 해서요...",
    ];
    return lines[count % lines.length];
  }

  const handleTalkToDept = () => {
    if (waitingTransfer) return;
    setMessages(prev => [...prev, { from: "나", text: "회원탈퇴 하고 싶습니다." }]);

    // Simulate transfer wait
    const wait = 3 + Math.floor(Math.random() * 3);
    setWaitTimer(wait);
    setWaitingTransfer(true);
    setMessages(prev => [...prev, { from: "", text: `${DEPT_NAMES[(currentDept + 1) % DEPT_NAMES.length]}(으)로 연결 중... (${wait}초)`, isSystem: true }]);
  };

  const handleInputSubmit = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { from: "나", text: inputText }]);
    setInputText("");
    setAwaitingInput(false);

    // Whatever they type, reject it
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: DEPT_NAMES[currentDept] + " 상담원",
        text: "확인 결과 유효하지 않은 정보입니다. 다시 담당 부서로 연결해드리겠습니다.",
      }]);
      setBounceCount(prev => prev + 1);
    }, 1000);
  };

  return (
    <BrowserFrame title="고객센터 실시간 상담">
      <div className="p-4 relative">
        <div className="flex gap-4">
          <div className="flex-1">
            <div ref={chatRef} className="bg-card rounded-md border border-border p-4 h-80 overflow-y-auto mb-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={msg.isSystem ? "text-center" : ""}>
                  {msg.isSystem ? (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{msg.text}</span>
                  ) : (
                    <div className={msg.from === "나" ? "flex justify-end" : ""}>
                      <div className={msg.from === "나" ? "max-w-[70%]" : ""}>
                        <span className="text-xs font-medium text-primary">{msg.from}</span>
                        <div className={`rounded-lg p-3 mt-1 text-sm ${msg.from === "나" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {waitingTransfer && (
                <div className="text-center">
                  <span className="text-xs text-muted-foreground animate-pulse">연결 대기 중... {waitTimer}초</span>
                </div>
              )}
            </div>

            {awaitingInput ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleInputSubmit()}
                  placeholder={inputPrompt}
                  className="flex-1 px-3 py-2 border border-border rounded-md text-sm bg-background"
                />
                <button onClick={handleInputSubmit} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                  전송
                </button>
              </div>
            ) : (
              <button
                onClick={handleTalkToDept}
                disabled={waitingTransfer}
                className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50"
              >
                {waitingTransfer ? "연결 중..." : `${DEPT_NAMES[currentDept]}에 문의하기`}
              </button>
            )}
          </div>

          {showDeptC && (
            <div className="w-48 bg-card border border-border rounded-md p-3 animate-in slide-in-from-right">
              <p className="text-xs font-medium mb-2">C부서 (특수업무팀)</p>
              <p className="text-xs text-muted-foreground mb-3">회원탈퇴 전문 처리</p>
              <button
                onClick={onClear}
                className="w-full py-2 bg-destructive text-destructive-foreground rounded-md text-xs font-medium"
              >
                탈퇴 처리 요청
              </button>
            </div>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
};

export default Stage5;
