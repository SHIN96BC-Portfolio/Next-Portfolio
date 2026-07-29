// import ModalOverlay from '@FsdShared/modal/ui/ModalOverlay';
import { RadialMenuType } from '@FsdFeatures/radial-menu/model';
import { dataRadialMenu } from '@FsdFeatures/radial-menu/redial-menu.setup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// 3개 이하로는 깨짐
type MenuCountStr = '4' | '5' | '6' | '7' | '8';

const MENU_ELEMENT_STYLE: Record<MenuCountStr, string> = {
  '4': 'flex-1 flex items-center justify-center border-[#F5F6F6] border-l-2 mt-[15px] mr-[15px] pb-[40px] pl-[40px]',
  '5': 'flex-1 flex items-center justify-center border-[#F5F6F6] border-l-2 mt-[20px] mr-[20px] pb-[25px] pl-[25px]',
  '6': 'flex-1 flex items-center justify-center border-[#F5F6F6] border-l-2 mt-[20px] mr-[10px]',
  '7': 'flex-1 flex items-center justify-center border-[#F5F6F6] border-l-2 mt-[20px] mr-[10px] pt-[20px] pr-[10px]',
  '8': 'flex-1 flex items-center justify-center border-[#F5F6F6] border-l-2 mt-[20px] mr-[10px] pt-[25px] pr-[20px]',
};

// 12시 정중앙 보정(개수 무관): baseShift = 270/slice - 0.5 = (3/4)*count - 0.5
const getBaseShift = (count: number) => (3 * count) / 4 - 0.5;

export default function RadialMenu({ active, onClose }: { active?: boolean; onClose?: () => void }) {
  const radiaMenus = dataRadialMenu;

  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [select, setSelect] = useState<RadialMenuType>(radiaMenus[0]);

  // 개수 변화 대응
  const count = radiaMenus.length;
  const slice = 360 / count; // 각 섹터 각도
  const skew = 90 - slice; // 동적 스큐(8=45, 7≈37.14, 6=30)

  const baseShift = getBaseShift(count);

  // 밖으로 쏠림 보정(필요 시만 조정)
  const INWARD_K = 6; // 6개=12px, 7개=6px, 8개=0px
  const inwardShift = Math.max(0, (8 - count) * INWARD_K);

  // 12시를 0°로 사용하는 공통 좌표계
  const [dialCurrentRotation, setDialCurrentRotation] = useState<number>(0);

  // 개수 변경 시 초기화(선택)
  useEffect(() => {
    setDialCurrentRotation(0);
  }, [count]);

  // 중심 좌표 계산용 ref (하나만)
  const centerAnchorRef = useRef<HTMLDivElement>(null);

  const dialPrevRotationRef = useRef(0);
  const roundCountRef = useRef<number>(0);
  const initialTouchRef = useRef({ rot: 0, offset: 0, isFirstMoveFrame: true });
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');

  // 개수에 맞게 스타일 조정
  const styleKey =
    radiaMenus.length < 4 || radiaMenus.length > 8
      ? ('8' as MenuCountStr)
      : (String(radiaMenus.length) as MenuCountStr);

  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      if (event.data === 'closeIframe') {
        setIsIframeVisible(false);
        setIframeUrl('');
      }
    };
    window.addEventListener('message', handlePostMessage);
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);

  useEffect(() => {
    if (!active) {
      setIsOpenModal(false);
      setIframeUrl('');
    }
  }, [active]);

  return (
    <div className={`flex items-center justify-center`}>
      {active &&
        (isOpenModal ? (
          <div />
          // <ModalOverlay
          //   centered
          //   closable={false}
          //   footer={false}
          //   maskStyle={{ zIndex: 1000 }}
          //   onCancel={onClose}
          //   open={active}
          //   style={{ marginBottom: '150px' }}
          //   wrapClassName="!z-[1000]"
          // >
          //   <div className="w-full mt-auto mb-[20px] ">{select?.content}</div>
          // </ModalOverlay>
        ) : isIframeVisible ? (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex justify-center items-center"
            onClick={() => {
              setIsIframeVisible(false);
              setIframeUrl('');
            }}
          >
            <div className="relative w-[400px] h-[calc(100vh-65px)]">
              <iframe
                src={iframeUrl}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                title="Frequently Asked Qusetion"
              />
            </div>
          </div>
        ) : (
          <div
            className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-[rgba(0,0,0,0.45)]"
            onClick={onClose}
            role="presentation"
          />
        ))}

      <div className="relative w-full h-full flex items-center justify-center ">
        {/* 로고 (터치 중심 ref는 아래 흰 원에만) */}
        <div
          className={`absolute  ${active ? 'z-[999] w-[87px] h-[87px] ' : 'w-0 h-0 '} rounded-full bg-[linear-gradient(180deg,#009c75,#cfdb08)] shadow-[inset_0_3px_6px_#005d46,0_0_50px_#009c7580]`}
        />
        <div
          className={`absolute bg-white rounded-full ${active ? 'z-[995] w-[140px] h-[140px] ' : 'w-0 h-0 '}`}
          ref={centerAnchorRef}
        />
        <div
          className={`relative overflow-hidden rounded-full m-0 bg-white shadow-[0_3px_6px_#111111] [-webkit-mask-image:-webkit-radial-gradient(white,black)]
          ${active && 'active animate-[open_0.8s] w-[335px] h-[335px]'}
          `}
          onClick={() => onClose?.()}
          onTouchEnd={() => {
            const snapped = Math.round(dialCurrentRotation / slice) * slice;
            const idx = Math.round(snapped / slice);
            const sel = (count - (idx % count) + count) % count;
            setSelect(radiaMenus[sel]);
            setDialCurrentRotation(snapped);
          }}
          onTouchMove={(e) => {
            const centerBtnBoundingRect = centerAnchorRef.current?.getBoundingClientRect();
            if (!centerBtnBoundingRect) return;
            const { x: xBtn, y: yBtn, width: wBtn, height: hBtn } = centerBtnBoundingRect;

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const angle = (Math.atan2(y - (yBtn + hBtn / 2), x - (xBtn + wBtn / 2)) / Math.PI) * 180;

            if (Math.abs(angle) > 90) {
              if (angle > 0 && dialPrevRotationRef.current < 0) roundCountRef.current -= 1;
              if (angle < 0 && dialPrevRotationRef.current > 0) roundCountRef.current += 1;
            }

            const ROTATION_THRESHOLD = 10;
            if (Math.abs(angle - dialPrevRotationRef.current) > ROTATION_THRESHOLD) {
              dialPrevRotationRef.current = angle;
              let dialRotation =
                roundCountRef.current * 360 +
                angle -
                ((initialTouchRef.current.offset - initialTouchRef.current.rot) % 360);
              if (initialTouchRef.current.isFirstMoveFrame) {
                initialTouchRef.current.isFirstMoveFrame = false;
                if (Math.abs(dialRotation - dialCurrentRotation) > 180) {
                  if (dialRotation < dialCurrentRotation) {
                    dialRotation += 360;
                    roundCountRef.current += 1;
                  } else {
                    dialRotation -= 360;
                    roundCountRef.current -= 1;
                  }
                }
              }
              setDialCurrentRotation(dialRotation);
            }
          }}
          onTouchStart={(e) => {
            const centerBtnBoundingRect = centerAnchorRef.current?.getBoundingClientRect();
            if (!centerBtnBoundingRect) return;
            const { x: xBtn, y: yBtn, width: wBtn, height: hBtn } = centerBtnBoundingRect;

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const pressedAngle = (Math.atan2(y - (yBtn + hBtn / 2), x - (xBtn + wBtn / 2)) / Math.PI) * 180;

            initialTouchRef.current = { rot: dialCurrentRotation, offset: pressedAngle, isFirstMoveFrame: true };
          }}
          role="presentation"
        >
          {radiaMenus.map((e, index) => {
            const theta = dialCurrentRotation + 90 + slice * (index + baseShift);

            return (
              <div
                className="absolute top-0 right-[15%] overflow-hidden border-white border flex items-stretch justify-center w-[35%] h-[50%] z-10 transition"
                key={e.key}
                style={{
                  transform: `rotate(${theta}deg) skewY(-${skew}deg)`,
                  transformOrigin: '0% 100%',
                  backgroundColor: `${e.colors}`,
                }}
              >
                {/* 스큐된 부모엔 padding 금지 → 개수별 스타일은 안쪽에만 */}
                <div className={MENU_ELEMENT_STYLE[styleKey]}>
                  <div
                    className="flex flex-col items-center justify-center transition space-y-[4px]"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelect(e);
                      setDialCurrentRotation((count - index) * slice);

                      if (e.content) setIsOpenModal(true);
                      if (e.link) {
                        if (e.link === '/customer-center') {
                          const targetHash = '#callcenterele';
                          router.push(`${e.link}${targetHash}`);
                        } else {
                          router.push(e.link);
                        }
                      }
                      if (e.iframeUrl) {
                        setIframeUrl(e.iframeUrl);
                        setIsIframeVisible(true);
                        setIsOpenModal(false);
                      }
                    }}
                    role="presentation"
                    style={{
                      // 아이콘/텍스트: 역회전도 동일 기준
                      transform: `translateY(${inwardShift}px) skewY(${skew}deg) rotate(${-theta}deg)`,
                    }}
                  >
                    <Image alt="" height={32} src={e.icon} width={32} />
                    <span
                      className={`text-center text-[12px] leading-[14px] font-semibold whitespace-pre-line ${
                        select?.key === e.key ? 'text-[#009C75]' : 'text-title'
                      }`}
                    >
                      {e.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
