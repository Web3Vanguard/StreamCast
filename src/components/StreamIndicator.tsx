import { Activity } from "lucide-react";

interface StreamIndicatorProps {
  label?: string;
  value?: string | number;
  className?: string;
}

export const StreamIndicator = ({ label = "Live Stream", value, className = "" }: StreamIndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Activity className="h-4 w-4 text-accent animate-pulse" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{label}:</span>
        {value && (
          <span className="text-sm font-mono font-medium text-primary">{value}</span>
        )}
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
      </div>
    </div>
  );
};
