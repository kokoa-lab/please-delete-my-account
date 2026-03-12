import { useState } from "react";
import { motion } from "framer-motion";

interface Props { onClear: () => void }

const Stage18 = ({ onClear }: Props) => {
  const [windowSize, setWindowSize] = useState({ w: 700, h: 500 });
  const [shrunk, setShrunk] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleDelete = () => {
    if (!shrunk) {
      setShrunk(true);
      setWindowSize({ w: 150, h: 80 });
      setClickCount(prev => prev + 1);
    } else {
      onClear();
    }
  };

  const expand = (dir: "w" | "h") => {
    setWindowSize(prev => ({
      w: dir === "w" ? Math.min(prev.w + 100, 700) : prev.w,
      h: dir === "h" ? Math.min(prev.h + 80, 500) : prev.h,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-muted-foreground mb-4 text-center">
        {shrunk ? "💡 창을 다시 키워서 탈퇴 버튼을 찾으세요! (가장자리를 클릭)" : "회원탈퇴를 진행하세요."}
      </p>

      <motion.div
        animate={{ width: windowSize.w, height: windowSize.h }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative bg-card border border-border rounded-md overflow-hidden"
      >
        {/* Title bar */}
        <div className="bg-muted px-3 py-1.5 flex items-center gap-1.5 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          <span className="text-[10px] text-muted-foreground ml-2 truncate">회원탈퇴</span>
        </div>

        <div className="p-4 overflow-hidden">
          {windowSize.w > 300 && windowSize.h > 200 ? (
            <div className="text-center">
              <h3 className="text-sm font-bold mb-2">계정 삭제</h3>
              <p className="text-xs text-muted-foreground mb-4">
                정말 삭제하시겠습니까?
              </p>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-xs font-medium"
              >
                {shrunk ? "탈퇴 완료" : "회원탈퇴"}
              </button>
            </div>
          ) : (
            <p className="text-[8px] text-muted-foreground text-center">...</p>
          )}
        </div>

        {/* Resize handles */}
        {shrunk && (
          <>
            <button
              onClick={() => expand("w")}
              className="absolute right-0 top-0 bottom-0 w-3 cursor-e-resize hover:bg-primary/10"
            />
            <button
              onClick={() => expand("h")}
              className="absolute bottom-0 left-0 right-0 h-3 cursor-s-resize hover:bg-primary/10"
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Stage18;
