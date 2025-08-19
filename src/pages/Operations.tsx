import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusIndicator from "@/components/StatusIndicator";
import { 
  ArrowLeft, 
  Power, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Phone,
  Wrench,
  Thermometer,
  Gauge,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Operations = () => {
  const navigate = useNavigate();

  const chillers = [
    { 
      id: "CH-01", 
      name: "冰水主機 #1", 
      status: "online", 
      load: 85, 
      tempIn: 12.1, 
      tempOut: 7.2, 
      flow: 245,
      power: 125.8,
      cop: 0.58
    },
    { 
      id: "CH-02", 
      name: "冰水主機 #2", 
      status: "online", 
      load: 72, 
      tempIn: 12.5, 
      tempOut: 7.5, 
      flow: 198,
      power: 102.3,
      cop: 0.62
    },
    { 
      id: "CH-03", 
      name: "冰水主機 #3", 
      status: "warning", 
      load: 45, 
      tempIn: 13.2, 
      tempOut: 8.1, 
      flow: 156,
      power: 78.9,
      cop: 0.55
    },
    { 
      id: "CH-04", 
      name: "冰水主機 #4", 
      status: "maintenance", 
      load: 0, 
      tempIn: 0, 
      tempOut: 0, 
      flow: 0,
      power: 0,
      cop: 0
    }
  ];

  const activeAlerts = [
    {
      id: 1,
      severity: "warning",
      title: "CH-03 效率降低",
      message: "能效比低於標準值 0.6，建議檢查冷凝器",
      time: "5分鐘前",
      equipment: "CH-03"
    },
    {
      id: 2,
      severity: "info",
      title: "定期維護提醒",
      message: "CH-04 預計維護時間：14:00 - 16:00",
      time: "1小時前",
      equipment: "CH-04"
    }
  ];

  const quickTasks = [
    { id: 1, task: "巡檢冷卻塔", status: "pending", priority: "high" },
    { id: 2, task: "記錄運轉參數", status: "completed", priority: "medium" },
    { id: 3, task: "清潔冷凝器", status: "pending", priority: "low" },
    { id: 4, task: "檢查水質", status: "in-progress", priority: "medium" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "success";
      case "warning": return "warning";
      case "offline": return "destructive";
      case "maintenance": return "secondary";
      default: return "secondary";
    }
  };

  const getAlertVariant = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "warning";
      case "info": return "secondary";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "in-progress": return "warning";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-glass backdrop-blur-sm border border-border/50 rounded-xl shadow-card">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-white/5 border-border/50 hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回總覽
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              現場操作中心
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              Field Operations Console - 即時監控中
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="bg-gradient-glass border-border/50 hover:shadow-glow transition-all duration-300">
            <Phone className="h-4 w-4 mr-2" />
            緊急聯絡
          </Button>
          <Button variant="destructive" size="sm" className="shadow-elevated hover:shadow-glow transition-all duration-300">
            <Power className="h-4 w-4 mr-2" />
            緊急停機
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Status Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg-gradient-secondary bg-clip-text text-transparent">設備即時狀態</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>5秒前更新</span>
            </div>
          </div>
          
          {chillers.map((chiller, index) => (
            <Card key={chiller.id} className="group bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <StatusIndicator 
                        status={chiller.status as any} 
                        label={chiller.name}
                        size="lg"
                      />
                      <div className="absolute -top-1 -right-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getStatusColor(chiller.status) as any} className="shadow-sm">
                      {chiller.status === "online" ? "運轉中" : 
                       chiller.status === "warning" ? "異常" :
                       chiller.status === "maintenance" ? "維護中" : "停機"}
                    </Badge>
                    {chiller.status === "online" && (
                      <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="bg-gradient-secondary/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Gauge className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">負載率</div>
                    <div className="text-2xl font-bold text-foreground mb-1">{chiller.load}<span className="text-sm text-muted-foreground">%</span></div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{width: `${chiller.load}%`}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-secondary/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-accent/10 rounded-full">
                        <Thermometer className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">進水溫度</div>
                    <div className="text-2xl font-bold text-foreground">{chiller.tempIn}<span className="text-sm text-muted-foreground">°C</span></div>
                  </div>
                  
                  <div className="bg-gradient-secondary/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-secondary/20 rounded-full">
                        <Thermometer className="h-5 w-5 text-secondary-foreground" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">出水溫度</div>
                    <div className="text-2xl font-bold text-foreground">{chiller.tempOut}<span className="text-sm text-muted-foreground">°C</span></div>
                  </div>
                  
                  <div className="bg-gradient-secondary/30 rounded-lg p-4 text-center border border-border/20 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">流量</div>
                    <div className="text-2xl font-bold text-foreground">{chiller.flow}<span className="text-sm text-muted-foreground">L/min</span></div>
                  </div>
                  
                  <div className="bg-gradient-secondary/30 rounded-lg p-4 text-center border border-border/20 hover:border-warning/30 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-warning/10 rounded-full">
                        <Zap className="h-5 w-5 text-warning" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">耗電</div>
                    <div className="text-2xl font-bold text-foreground">{chiller.power}<span className="text-sm text-muted-foreground">kW</span></div>
                  </div>
                  
                  <div className="bg-gradient-secondary/30 rounded-lg p-4 text-center border border-border/20 hover:border-success/30 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-success/10 rounded-full">
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">效率比</div>
                    <div className="text-2xl font-bold text-foreground">{chiller.cop}</div>
                  </div>
                </div>

                {chiller.status === "online" && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="bg-gradient-glass hover:bg-primary/5 border-border/50">
                      <Gauge className="h-4 w-4 mr-2" />
                      調整負載
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gradient-glass hover:bg-primary/5 border-border/50">
                      <Thermometer className="h-4 w-4 mr-2" />
                      設定溫度
                    </Button>
                  </div>
                )}
                
                {chiller.status === "warning" && (
                  <div className="mt-6 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                    <div className="flex items-center gap-2 text-warning text-sm font-medium">
                      <AlertTriangle className="h-4 w-4" />
                      建議檢查設備狀態
                    </div>
                  </div>
                )}
                
                {chiller.status === "maintenance" && (
                  <div className="mt-6 p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
                    <div className="flex items-center gap-2 text-secondary-foreground text-sm font-medium">
                      <Wrench className="h-4 w-4" />
                      維護作業進行中
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-warning animate-pulse" />
                  </div>
                  即時警報
                </h3>
                <Badge variant="warning" className="animate-bounce">
                  {activeAlerts.length} 項
                </Badge>
              </div>
              
              <div className="space-y-4">
                {activeAlerts.map((alert, index) => (
                  <div key={alert.id} className="group p-4 border border-border/50 rounded-xl bg-gradient-secondary/30 hover:bg-gradient-secondary/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={getAlertVariant(alert.severity) as any} className="text-xs font-medium shadow-sm">
                          {alert.equipment}
                        </Badge>
                        <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full">{alert.time}</span>
                    </div>
                    <div className="text-sm font-semibold mb-2 text-foreground">{alert.title}</div>
                    <div className="text-xs text-muted-foreground mb-3 leading-relaxed">{alert.message}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-gradient-glass hover:bg-primary/5">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        確認處理
                      </Button>
                      <Button variant="ghost" size="sm" className="px-3">
                        <AlertTriangle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Tasks */}
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  待辦任務
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {quickTasks.filter(task => task.status === "pending").length} 待處理
                </Badge>
              </div>
              
              <div className="space-y-4">
                {quickTasks.map((task, index) => (
                  <div key={task.id} className="group p-4 border border-border/50 rounded-xl bg-gradient-secondary/30 hover:bg-gradient-secondary/50 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <div className="text-sm font-semibold text-foreground">{task.task}</div>
                        </div>
                        <div className="flex items-center gap-2 ml-8">
                          <Badge variant={getTaskStatusColor(task.status) as any} className="text-xs shadow-sm">
                            {task.status === "completed" ? "✓ 已完成" :
                             task.status === "in-progress" ? "⏳ 進行中" : "⚫ 待處理"}
                          </Badge>
                          <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                            {task.priority === "high" ? "🔴 高優先" :
                             task.priority === "medium" ? "🟡 中優先" : "🟢 低優先"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {task.status === "pending" && (
                          <Button variant="outline" size="sm" className="bg-gradient-glass hover:bg-primary/5">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            開始
                          </Button>
                        )}
                        {task.status === "in-progress" && (
                          <Button variant="secondary" size="sm" disabled>
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            進行中
                          </Button>
                        )}
                        {task.status === "completed" && (
                          <Button variant="ghost" size="sm" disabled className="text-success">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
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

export default Operations;