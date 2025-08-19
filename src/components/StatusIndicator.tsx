import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "maintenance";
  label: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const StatusIndicator = ({ 
  status, 
  label, 
  size = "md", 
  showLabel = true, 
  className 
}: StatusIndicatorProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "online":
        return "bg-success shadow-glow animate-pulse";
      case "warning":
        return "bg-warning shadow-elevated animate-pulse";
      case "offline":
        return "bg-destructive";
      case "maintenance":
        return "bg-accent animate-pulse";
      default:
        return "bg-muted";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-2 w-2";
      case "lg":
        return "h-4 w-4";
      default:
        return "h-3 w-3";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "online":
        return "運轉中";
      case "warning":
        return "警告";
      case "offline":
        return "停機";
      case "maintenance":
        return "維護中";
      default:
        return "未知";
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-full transition-all duration-300",
        getSizeClasses(),
        getStatusStyles()
      )} />
      {showLabel && (
        <span className="text-sm font-medium text-foreground">
          {label} - <span className="text-muted-foreground">{getStatusText()}</span>
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;