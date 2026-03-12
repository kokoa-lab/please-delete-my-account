import { useState, useRef } from "react";
import BrowserFrame from "@/components/BrowserFrame";

interface Props { onClear: () => void }

const TERMS = `
제1조 (목적)
본 약관은 ㈜해피서비스(이하 "회사")가 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
① "서비스"란 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 "회원"이 이용할 수 있는 회사가 제공하는 제반 서비스를 의미합니다.
② "회원"이라 함은 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다.
③ "아이디(ID)"라 함은 "회원"의 식별과 "서비스" 이용을 위하여 "회원"이 정하고 "회사"가 승인하는 문자와 숫자의 조합을 의미합니다.

제3조 (약관 등의 명시와 설명 및 개정)
① "회사"는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자 등을 이용자가 쉽게 알 수 있도록 "서비스" 초기 화면에 게시합니다.
② 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래 기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.

제4조 (서비스의 제공 및 변경)
① 회사는 다음과 같은 업무를 수행합니다.
1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
2. 구매계약이 체결된 재화 또는 용역의 배송
3. 기타 회사가 정하는 업무

제5조 (서비스의 중단)
① 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
② 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.

제6조 (회원가입)
① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.

제7조 (회원 탈퇴 및 자격 상실 등)
① 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다. 단, 회원이 본 약관의 모든 조항을 숙지하고 동의한 경우에 한합니다. 회원은 탈퇴 전 반드시 다음 사항을 확인해야 합니다:
가. 잔여 포인트 및 혜택의 소멸
나. 구매 이력 및 리뷰 데이터의 영구 삭제
다. 연동된 제3자 서비스와의 연결 해제
라. 미결제 금액의 정산
마. 진행 중인 거래의 완료 또는 취소
바. 고객지원 문의 이력의 삭제
사. 작성한 게시글 및 댓글의 처리
아. 이벤트 참여 내역 및 당첨 혜택의 소멸
자. 추천인 보상 및 등급 혜택의 소멸
차. 구독 서비스의 자동 해지 및 환불 불가

② 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.

제8조 (개인정보보호)
회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다. 다만, 회원탈퇴 시에도 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 동안 안전하게 보관됩니다.

제9조 (회사의 의무)
① 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화·용역을 제공하는데 최선을 다하여야 합니다.

제10조 (회원의 의무)
① 회원은 다음 행위를 하여서는 안됩니다.
1. 신청 또는 변경시 허위 내용의 등록
2. 타인의 정보 도용
3. 회사가 게시한 정보의 변경
4. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
5. 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해

부칙
본 약관은 2024년 1월 1일부터 시행합니다.

※ 본 약관을 끝까지 읽으신 회원님께 감사드립니다. 약관 하단의 동의 체크박스를 선택해주세요.
`.trim();

const Stage3 = ({ onClear }: Props) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [checked, setChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    if (atBottom) setScrolledToBottom(true);
  };

  return (
    <BrowserFrame title="회원탈퇴 - 이용약관 동의">
      <div className="p-6">
        <h2 className="stage-title mb-1">서비스 이용약관 확인</h2>
        <p className="text-xs text-muted-foreground mb-4">
          탈퇴를 진행하시려면 아래 약관을 끝까지 읽고 동의해주세요.
        </p>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="border border-border rounded-md p-4 h-64 overflow-y-auto bg-card"
          style={{ scrollbarWidth: "none" }}
        >
          <pre className="whitespace-pre-wrap text-xs text-foreground/80 leading-relaxed font-sans">
            {TERMS}
          </pre>
        </div>

        {!scrolledToBottom && (
          <p className="text-xs text-destructive mt-2">
            * 약관을 끝까지 읽어주세요. (스크롤을 내려주세요)
          </p>
        )}

        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => scrolledToBottom && setChecked(e.target.checked)}
            disabled={!scrolledToBottom}
            className="w-4 h-4 accent-primary"
          />
          <span className={`text-sm ${scrolledToBottom ? "text-foreground" : "text-muted-foreground"}`}>
            위 약관을 모두 읽었으며, 이에 동의합니다.
          </span>
        </label>

        <button
          onClick={onClear}
          disabled={!checked}
          className={`mt-4 w-full py-3 rounded-md text-sm font-medium transition-colors ${
            checked
              ? "bg-destructive text-destructive-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          탈퇴 진행
        </button>
      </div>
    </BrowserFrame>
  );
};

export default Stage3;
