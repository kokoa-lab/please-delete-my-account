import { useState } from "react";

interface Props { onClear: () => void }

const Stage11 = ({ onClear }: Props) => {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="stage-container">
      <div className="bg-card border border-border rounded-md p-8 text-center">
        <h1 className="text-8xl font-bold text-muted-foreground/30 mb-4">404</h1>
        <h2 className="text-xl font-bold mb-2">페이지를 찾을 수 없습니다</h2>
        <p className="text-sm text-muted-foreground mb-6">
          요청하신 '회원탈퇴' 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <button
          onClick={() => {}}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium mb-8"
        >
          홈으로 돌아가기
        </button>

        <div className="border-t border-border pt-4">
          <button
            onClick={() => setShowSource(!showSource)}
            className="text-xs text-muted-foreground hover:underline"
          >
            {showSource ? "소스 숨기기" : "💡 페이지 소스 보기"}
          </button>
        </div>

        {showSource && (
          <div className="mt-4 bg-foreground/5 rounded-md p-4 text-left overflow-x-auto">
            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
{`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title></head>
<body>
  <h1>404</h1>
  <p>Page not found</p>
  <!-- 
    진짜 탈퇴 페이지 주소: 
    아래 버튼을 클릭하세요 
  -->
</body>
</html>`}
            </pre>
            <button
              onClick={onClear}
              className="mt-3 text-xs text-primary underline font-medium"
            >
              진짜 탈퇴 페이지로 이동
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stage11;
