import { ReactNode } from "react";

interface BrowserFrameProps {
  url?: string;
  children: ReactNode;
  title?: string;
}

const BrowserFrame = ({ url = "https://please-delete-my-account.코드.kr", children, title }: BrowserFrameProps) => {
  return (
    <div className="browser-frame">
      <div className="browser-toolbar">
        <div className="flex gap-1.5">
          <div className="browser-dot bg-destructive/60" />
          <div className="browser-dot bg-yellow-400/60" />
          <div className="browser-dot bg-accent/60" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-secondary rounded-md px-3 py-1 text-xs text-muted-foreground truncate text-center">
            {url}
          </div>
        </div>
      </div>
      {title && (
        <div className="bg-card border-b border-border px-4 py-2">
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
      <div className="bg-background min-h-[400px] overflow-y-auto max-h-[70vh]">
        {children}
      </div>
    </div>
  );
};

export default BrowserFrame;
