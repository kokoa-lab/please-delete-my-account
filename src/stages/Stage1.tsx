import { motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const Stage1 = ({ onClear }: Props) => {
  return (
    <BrowserFrame url="https://happy-service.co.kr/mypage/settings" title="HappyService - 마이페이지">
      <div className="p-8">
        <h2 className="stage-title mb-2">회원님, 정말 떠나시겠습니까?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          고객님께서 포기하시는 혜택은 <strong className="text-foreground">13,472P</strong>의 포인트와 <strong className="text-foreground">골드 등급</strong> 회원 자격입니다.
        </p>
        
        <div className="corporate-card mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">😊</div>
            <div>
              <p className="font-medium text-sm">HappyService와 함께한 지 1,247일</p>
              <p className="text-xs text-muted-foreground">소중한 추억이 사라집니다</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-dark rounded-full w-full max-w-md"
            onClick={() => {}}
          >
            혜택 유지하고 계속 이용하기 💝
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-dark rounded-md w-full max-w-md"
            onClick={() => {}}
          >
            다음에 탈퇴하기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-dark rounded-none w-full max-w-md"
            onClick={() => {}}
          >
            고객센터에 의견 보내기
          </motion.button>
        </div>

        {/* The actual solution */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <span>고객센터</span>
            <button onClick={onClear} className="btn-hidden">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
};

export default Stage1;
