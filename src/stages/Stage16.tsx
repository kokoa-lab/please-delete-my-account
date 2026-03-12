import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Props { onClear: () => void }

const Stage16 = ({ onClear }: Props) => {
  const [filePos, setFilePos] = useState({ x: 50, y: 160 });
  const [folderPos, setFolderPos] = useState({ x: 350, y: 160 });
  const [dropped, setDropped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || dropped || attempts >= 8) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - (folderPos.x + 32);
    const dy = mouseY - (folderPos.y + 32);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 140) {
      const angle = Math.atan2(dy, dx);
      const newX = Math.max(20, Math.min(rect.width - 80, folderPos.x - Math.cos(angle) * 90));
      const newY = Math.max(40, Math.min(rect.height - 80, folderPos.y - Math.sin(angle) * 90));
      setFolderPos({ x: newX, y: newY });
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    setDragging(false);
    setAttempts(prev => prev + 1);

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate final file position based on drag offset
    const finalX = filePos.x + info.offset.x;
    const finalY = filePos.y + info.offset.y;

    const dx = Math.abs(finalX - folderPos.x);
    const dy = Math.abs(finalY - folderPos.y);

    if (dx < 80 && dy < 80) {
      setDropped(true);
      setFilePos({ x: folderPos.x, y: folderPos.y });
      setTimeout(onClear, 600);
    }
  };

  return (
    <div className="stage-container">
      <div className="text-center mb-4">
        <h2 className="stage-title mb-2">데이터 삭제</h2>
        <p className="text-sm text-muted-foreground">
          '회원 정보' 파일을 '탈퇴 처리' 폴더로 드래그하세요.
          {attempts >= 4 && attempts < 8 && (
            <span className="block text-xs text-primary mt-1">💡 계속 시도하세요, 곧 잡을 수 있습니다!</span>
          )}
          {attempts >= 8 && (
            <span className="block text-xs text-accent mt-1">✓ 폴더가 더 이상 도망가지 않습니다!</span>
          )}
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative bg-card border border-border rounded-md"
        style={{ height: 400 }}
      >
        {/* File icon - draggable */}
        {!dropped && (
          <motion.div
            drag
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            className="absolute cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 z-10"
            style={{ left: filePos.x, top: filePos.y }}
            whileDrag={{ scale: 1.1 }}
          >
            <div className="w-16 h-20 bg-primary/10 border border-primary/30 rounded-md flex items-center justify-center text-2xl">
              📄
            </div>
            <span className="text-xs font-medium">회원 정보</span>
          </motion.div>
        )}

        {/* Folder icon */}
        <motion.div
          animate={{ x: folderPos.x, y: folderPos.y }}
          transition={attempts >= 8 ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: 0, top: 0 }}
        >
          <div className={`w-16 h-16 rounded-md flex items-center justify-center text-2xl border-2 border-dashed ${
            dropped ? "border-accent bg-accent/10" : "border-destructive/50 bg-destructive/5"
          }`}>
            {dropped ? "✅" : "📁"}
          </div>
          <span className="text-xs font-medium">탈퇴 처리</span>
        </motion.div>

        {dropped && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-accent font-bold text-xl">삭제 완료!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stage16;
