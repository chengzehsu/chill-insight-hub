import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import KPICard from "@/components/KPICard";
import StatusIndicator from "@/components/StatusIndicator";
import heroImage from "@/assets/industrial-dashboard-hero.jpg";
import { 
  Activity, 
  Zap, 
  Settings, 
  TrendingUp, 
  Monitor,
  Users,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";

const Index = () => {
  // Mock real-time data
  const systemOverview = [
    {
      title: "系統狀態",
      value: "正常運作",
      unit: "",
      change: "4台設備監控中",
      icon: Shield,
      variant: "success" as const
    },
    {
      title: "即時耗電",
      value: "312.4",
      unit: "kW",
      change: "↓ 5.2% vs 平均值",
      trend: "down" as const,
      icon: Zap,
      variant: "default" as const
    },
    {
      title: "平均效率",
      value: "87.3",
      unit: "%",
      change: "高於目標值 85%",
      trend: "up" as const,
      icon: Activity,
      variant: "success" as const
    },
    {
      title: "線上人員",
      value: "2",
      unit: "人",
      change: "管理層 + 場務",
      icon: Users,
      variant: "default" as const
    }
  ];

  const recentActivity = [
    { time: "14:23", event: "CH-03 效率警告已確認", status: "warning" },
    { time: "13:45", event: "定期維護作業開始", status: "info" },
    { time: "12:30", event: "負載平衡調整完成", status: "success" },
    { time: "11:15", event: "日間運轉模式啟動", status: "info" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Industrial Control Room"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        
        <div className="relative px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  冰水主機監控系統
                </h1>
                <p className="text-xl text-white/90">
                  Industrial Chiller Management Platform
                </p>
              </div>
            </div>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              為管理層提供完整營運分析，為現場人員提供即時監控操作
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <StatusIndicator status="online" label="系統運作中" size="lg" />
              <div className="h-6 w-px bg-white/30" />
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="h-5 w-5" />
                <span>最後更新: {new Date().toLocaleTimeString('zh-TW')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Navigation */}
        <Navigation />

        {/* System Overview KPIs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">系統概況</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemOverview.map((item, index) => (
              <KPICard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Access */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">快速入口</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2 bg-gradient-secondary hover:bg-gradient-primary hover:text-white transition-all duration-300 border-border/50"
                    onClick={() => window.location.href = '/management'}
                  >
                    <TrendingUp className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">管理儀表板</div>
                      <div className="text-xs opacity-80">營運分析與報告</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2 bg-gradient-secondary hover:bg-gradient-primary hover:text-white transition-all duration-300 border-border/50"
                    onClick={() => window.location.href = '/operations'}
                  >
                    <Settings className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">現場操作</div>
                      <div className="text-xs opacity-80">設備監控與控制</div>
                    </div>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-gradient-secondary rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-medium">系統狀態良好</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    所有主要設備運作正常，3台冰水主機在線運轉，1台進行定期維護
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4">最近活動</h3>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-xs text-muted-foreground w-12">
                      {activity.time}
                    </div>
                    <div className={`h-2 w-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning animate-pulse' :
                      'bg-accent'
                    }`} />
                    <div className="text-sm flex-1">{activity.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
