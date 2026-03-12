import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

interface StageWrapperProps {
  stageNum: number;
  title: string;
  children: (onClear: () => void) => ReactNode;
  onClear: () => void;
}

// Generate a short glitch/success beep using Web Audio API
function playClearSound() {
  try {
    const ctx = new AudioContext();
    
    // Glitch noise burst
    const noiseLen = 0.15;
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * noiseLen, ctx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseData.length * 0.3));
    }
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuf;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.15;
    noiseNode.connect(noiseGain).connect(ctx.destination);
    noiseNode.start();

    // Success tone (ascending two-note)
    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    playTone(523, ctx.currentTime + 0.1, 0.15); // C5
    playTone(784, ctx.currentTime + 0.22, 0.25); // G5

    setTimeout(() => ctx.close(), 2000);
  } catch {}
}

const StageWrapper = ({ stageNum, title, children, onClear }: StageWrapperProps) => {
  const [cleared, setCleared] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const prevStageRef = useRef(stageNum);
  const navigate = useNavigate();

  // Reset state when stageNum changes
  useEffect(() => {
    if (prevStageRef.current !== stageNum) {
      setCleared(false);
      setGlitching(false);
      setShowIntro(true);
      prevStageRef.current = stageNum;
    }
  }, [stageNum]);

  // Auto-dismiss intro after delay
  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => setShowIntro(false), 1800);
    return () => clearTimeout(timer);
  }, [showIntro, stageNum]);

  const handleClear = useCallback(() => {
    // Glitch phase
    setGlitching(true);
    playClearSound();

    setTimeout(() => {
      setGlitching(false);
      setCleared(true);
    }, 500);

    setTimeout(() => {
      onClear();
    }, 2000);
  }, [onClear]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Top nav bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>메인</span>
        </button>
        <span className="text-xs text-muted-foreground font-medium">
          STAGE {stageNum}/20
        </span>
      </div>

      {/* Glitch overlay */}
      {glitching && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.1) 2px, hsl(var(--foreground) / 0.1) 4px)",
              animation: "glitch 0.4s ease-in-out",
            }}
          />
          {/* Color shift blocks */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/20"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 40}%`,
                height: `${2 + Math.random() * 8}%`,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                x: [0, (Math.random() - 0.5) * 40, 0],
              }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          ))}
          {/* Screen flash */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.3, delay: 0.15 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key={`intro-${stageNum}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center flex flex-col items-center gap-4"
          >
            {/* Stage number */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-6xl font-black text-primary tabular-nums tracking-tighter"
              style={{
                textShadow: "0 0 40px hsl(var(--primary) / 0.3)",
              }}
            >
              {String(stageNum).padStart(2, "0")}
            </motion.div>

            {/* Divider line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="h-0.5 bg-primary/40"
            />

            {/* Stage title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-sm text-muted-foreground font-medium tracking-wide"
            >
              {title}
            </motion.p>
          </motion.div>
        ) : cleared ? (
          <motion.div
            key={`cleared-${stageNum}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              className="text-5xl font-bold text-accent mb-3"
              animate={{
                textShadow: [
                  "0 0 0px hsl(var(--accent))",
                  "0 0 20px hsl(var(--accent))",
                  "0 0 5px hsl(var(--accent))",
                ],
              }}
              transition={{ duration: 0.6 }}
            >
              탈퇴 성공!
            </motion.div>
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Stage {stageNum} Clear
            </motion.p>
            <motion.div
              className="mt-4 h-0.5 bg-accent/30 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`stage-${stageNum}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`w-full max-w-4xl ${glitching ? "animate-glitch" : ""}`}
          >
            {children(handleClear)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StageWrapper;
