import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/KPICard";
import StatusIndicator from "@/components/StatusIndicator";
import Navigation from "@/components/Navigation";
import { 
  Zap, 
  Gauge, 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowLeft,
  Download,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const kpis = [
    {
      title: "總耗電量",
      value: "1,247",
      unit: "kWh",
      change: "↓ 8.5% vs 昨日",
      trend: "down" as const,
      icon: Zap,
      variant: "success" as const
    },
    {
      title: "整體效率",
      value: "87.3",
      unit: "%",
      change: "↑ 2.1% vs 上週",
      trend: "up" as const,
      icon: Gauge,
      variant: "default" as const
    },
    {
      title: "運轉設備",
      value: "3/4",
      unit: "台",
      change: "1台維護中",
      trend: "neutral" as const,
      icon: Settings,
      variant: "warning" as const
    },
    {
      title: "節能成效",
      value: "NT$12,450",
      change: "本月節省",
      trend: "up" as const,
      icon: TrendingUp,
      variant: "success" as const
    }
  ];

  const chillers = [
    { id: "CH-01", name: "冰水主機 #1", status: "online", load: 85, temp: 7.2, efficiency: 0.58 },
    { id: "CH-02", name: "冰水主機 #2", status: "online", load: 72, temp: 7.5, efficiency: 0.62 },
    { id: "CH-03", name: "冰水主機 #3", status: "warning", load: 45, temp: 8.1, efficiency: 0.55 },
    { id: "CH-04", name: "冰水主機 #4", status: "maintenance", load: 0, temp: 0, efficiency: 0 }
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-gradient-glass border-border/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回總覽
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              管理儀表板
            </h1>
            <p className="text-muted-foreground">Executive Dashboard</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-gradient-glass border-border/50">
            <RefreshCw className="h-4 w-4 mr-2" />
            重新整理
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-primary shadow-primary">
            <Download className="h-4 w-4 mr-2" />
            匯出報告
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Status */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">設備監控總覽</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">即時更新</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {chillers.map((chiller) => (
                  <div 
                    key={chiller.id} 
                    className="p-4 bg-gradient-secondary rounded-lg border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <StatusIndicator 
                          status={chiller.status as any} 
                          label={chiller.name}
                          size="md"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chiller.id}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">負載率</div>
                        <div className="text-lg font-semibold">{chiller.load}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">出水溫度</div>
                        <div className="text-lg font-semibold">{chiller.temp}°C</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">COP效率</div>
                        <div className="text-lg font-semibold">{chiller.efficiency}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <div className="space-y-6">
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                即時警報
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-gradient-status-warning rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-white">CH-03 效率警告</span>
                  </div>
                  <p className="text-xs text-white/80">能效比低於標準值，建議檢查</p>
                </div>
                
                <div className="p-3 bg-gradient-secondary rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 bg-accent rounded-full" />
                    <span className="text-sm font-medium">CH-04 定期維護</span>
                  </div>
                  <p className="text-xs text-muted-foreground">預計 14:00 完成維護作業</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4">本日摘要</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">平均負載</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">能效達成率</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-status-good h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Management;