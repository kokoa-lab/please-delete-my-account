import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage2 = ({ onClear }: Props) => {
  const [swapped, setSwapped] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapped(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleWrongClick = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
  };

  return (
    <BrowserFrame title="회원탈퇴 확인">
      <div className="p-8 text-center">
        <h2 className="stage-title mb-2">정말로 탈퇴하시겠습니까?</h2>
        <p className="text-sm text-muted-foreground mb-8">
          탈퇴 시 모든 데이터가 영구적으로 삭제됩니다.
        </p>

        <motion.div 
          className={`flex gap-4 justify-center ${shaking ? "animate-shake" : ""}`}
          layout
        >
          {swapped ? (
            <>
              <motion.button
                layout
                className="btn-primary-dark rounded-md px-12"
                onClick={handleWrongClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                아니오
              </motion.button>
              <motion.button
                layout
                className="bg-secondary text-secondary-foreground px-12 py-4 rounded-md text-lg font-medium"
                onClick={onClear}
              >
                네
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                layout
                className="bg-secondary text-secondary-foreground px-12 py-4 rounded-md text-lg font-medium"
                onClick={onClear}
              >
                네
              </motion.button>
              <motion.button
                layout
                className="btn-primary-dark rounded-md px-12"
                onClick={handleWrongClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                아니오
              </motion.button>
            </>
          )}
        </motion.div>

        <p className="text-xs text-muted-foreground mt-4">
          * 버튼 위치가 변경될 수 있습니다. 신중하게 선택해주세요.
        </p>
      </div>
    </BrowserFrame>
  );
};

export default Stage2;
