import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  appName?: string;
  time?: string;
}

const PhoneFrame = ({ children, appName, time = "오후 3:42" }: PhoneFrameProps) => {
  return (
    <div className="phone-frame bg-background">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 py-2 bg-card">
        <span className="text-xs font-medium">{time}</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 border border-foreground/40 rounded-sm relative">
            <div className="absolute inset-0.5 bg-foreground/40 rounded-sm" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
      {appName && (
        <div className="text-center py-2 border-b border-border bg-card">
          <span className="text-sm font-medium">{appName}</span>
        </div>
      )}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100% - 60px)" }}>
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
