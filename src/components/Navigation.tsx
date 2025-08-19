import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Monitor, Wrench, BarChart3, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "系統總覽",
      icon: Monitor,
      description: "System Overview"
    },
    {
      path: "/management",
      label: "管理儀表板",
      icon: BarChart3,
      description: "Management Dashboard"
    },
    {
      path: "/operations",
      label: "現場操作",
      icon: Wrench,
      description: "Field Operations"
    }
  ];

  return (
    <Card className="bg-gradient-glass backdrop-blur-sm border-0 shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              冰水主機監控系統
            </h1>
            <p className="text-sm text-muted-foreground">Chiller Monitoring System</p>
          </div>
        </div>
        
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col gap-2 transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-primary shadow-primary border-0" 
                    : "bg-gradient-glass hover:bg-gradient-secondary border-border/50"
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className={`h-6 w-6 ${
                  isActive ? "text-primary-foreground" : "text-primary"
                }`} />
                <div className="text-center">
                  <div className={`font-medium ${
                    isActive ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-xs opacity-80 ${
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};

export default Navigation;