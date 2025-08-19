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
              現場操作面板
            </h1>
            <p className="text-muted-foreground">Field Operations Console</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-gradient-glass border-border/50">
            <Phone className="h-4 w-4 mr-2" />
            緊急聯絡
          </Button>
          <Button variant="destructive" size="sm">
            <Power className="h-4 w-4 mr-2" />
            緊急停機
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Status Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold mb-4">設備即時狀態</h2>
          
          {chillers.map((chiller) => (
            <Card key={chiller.id} className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <StatusIndicator 
                      status={chiller.status as any} 
                      label={chiller.name}
                      size="lg"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(chiller.status) as any}>
                      {chiller.status === "online" ? "運轉中" : 
                       chiller.status === "warning" ? "異常" :
                       chiller.status === "maintenance" ? "維護中" : "停機"}
                    </Badge>
                    {chiller.status === "online" && (
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="text-center">
                    <Gauge className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-xs text-muted-foreground mb-1">負載率</div>
                    <div className="text-lg font-bold text-foreground">{chiller.load}%</div>
                  </div>
                  
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-xs text-muted-foreground mb-1">進水溫度</div>
                    <div className="text-lg font-bold text-foreground">{chiller.tempIn}°C</div>
                  </div>
                  
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-2 text-accent" />
                    <div className="text-xs text-muted-foreground mb-1">出水溫度</div>
                    <div className="text-lg font-bold text-foreground">{chiller.tempOut}°C</div>
                  </div>
                  
                  <div className="text-center">
                    <RefreshCw className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-xs text-muted-foreground mb-1">流量</div>
                    <div className="text-lg font-bold text-foreground">{chiller.flow} L/min</div>
                  </div>
                  
                  <div className="text-center">
                    <Zap className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-xs text-muted-foreground mb-1">耗電</div>
                    <div className="text-lg font-bold text-foreground">{chiller.power} kW</div>
                  </div>
                  
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 mx-auto mb-2 text-success" />
                    <div className="text-xs text-muted-foreground mb-1">COP</div>
                    <div className="text-lg font-bold text-foreground">{chiller.cop}</div>
                  </div>
                </div>

                {chiller.status === "online" && (
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      調整負載
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      設定溫度
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                即時警報 ({activeAlerts.length})
              </h3>
              
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-border/50 rounded-lg bg-gradient-secondary">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getAlertVariant(alert.severity) as any} className="text-xs">
                        {alert.equipment}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <div className="text-sm font-medium mb-1">{alert.title}</div>
                    <div className="text-xs text-muted-foreground">{alert.message}</div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      確認處理
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Tasks */}
          <Card className="bg-gradient-glass backdrop-blur-sm border-border/50 shadow-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                待辦任務
              </h3>
              
              <div className="space-y-3">
                {quickTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-gradient-secondary">
                    <div>
                      <div className="text-sm font-medium">{task.task}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTaskStatusColor(task.status) as any} className="text-xs">
                          {task.status === "completed" ? "已完成" :
                           task.status === "in-progress" ? "進行中" : "待處理"}
                        </Badge>
                        <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                          {task.priority === "high" ? "高" :
                           task.priority === "medium" ? "中" : "低"}
                        </Badge>
                      </div>
                    </div>
                    {task.status === "pending" && (
                      <Button variant="outline" size="sm">
                        開始
                      </Button>
                    )}
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