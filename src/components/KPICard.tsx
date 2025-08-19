import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "critical";
  className?: string;
}

const KPICard = ({ 
  title, 
  value, 
  unit, 
  change, 
  trend, 
  icon: Icon, 
  variant = "default",
  className 
}: KPICardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-gradient-status-good border-success/20 shadow-glow";
      case "warning":
        return "bg-gradient-status-warning border-warning/20 shadow-elevated";
      case "critical":
        return "bg-gradient-status-critical border-destructive/20 shadow-elevated";
      default:
        return "bg-gradient-glass border-border/50 shadow-card";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "success":
      case "warning":
      case "critical":
        return "text-white";
      default:
        return "text-primary";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "success":
      case "warning":
      case "critical":
        return "text-white";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card className={cn(
      "backdrop-blur-sm transition-all duration-300 hover:shadow-elevated",
      getVariantStyles(),
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              variant === "default" ? "bg-primary/10" : "bg-white/20"
            )}>
              <Icon className={cn("h-5 w-5", getIconColor())} />
            </div>
            <h3 className={cn(
              "text-sm font-medium",
              getTextColor(),
              variant !== "default" && "opacity-90"
            )}>
              {title}
            </h3>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-2xl font-bold",
              getTextColor()
            )}>
              {value}
            </span>
            {unit && (
              <span className={cn(
                "text-sm",
                getTextColor(),
                variant !== "default" && "opacity-70"
              )}>
                {unit}
              </span>
            )}
          </div>
          
          {change && (
            <div className={cn(
              "text-xs font-medium",
              variant !== "default" ? "text-white/80" : getTrendColor()
            )}>
              {change}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default KPICard;