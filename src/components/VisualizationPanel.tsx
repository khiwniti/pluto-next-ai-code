import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
} from "recharts";

interface VisualizationPanelProps {
  code: string;
  onExecute: () => void;
}

const VisualizationPanel = ({ code, onExecute }: VisualizationPanelProps) => {
  const [visualizationType, setVisualizationType] = useState<"heatmap" | "scatter" | "3d">("heatmap");
  const [chartData, setChartData] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    generateDefaultVisualization();
  }, []);

  const generateDefaultVisualization = () => {
    // Create sample heatmap-style scatter data
    const data: any[] = [];
    const size = 20;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const value = Math.sin(i / 2) * Math.cos(j / 2) * 10;
        data.push({
          x: i,
          y: j,
          z: value,
          value: Math.abs(value),
        });
      }
    }

    setChartData(data);
    setVisualizationType("heatmap");
  };

  const executeCodeVisualization = () => {
    try {
      if (code.includes("heatmap")) {
        generateDefaultVisualization();
        toast({
          title: "Visualization Updated",
          description: "Heatmap generated successfully",
        });
      } else if (code.includes("3d") || code.includes("surface")) {
        generate3DVisualization();
        toast({
          title: "Visualization Updated",
          description: "3D-style plot generated successfully",
        });
      } else if (code.includes("scatter")) {
        generateScatterPlot();
        toast({
          title: "Visualization Updated",
          description: "Scatter plot generated successfully",
        });
      } else {
        toast({
          title: "No visualization detected",
          description: "Try adding 'heatmap', '3d', or 'scatter' to your code",
          variant: "destructive",
        });
      }
      
      onExecute();
    } catch (error) {
      console.error("Visualization error:", error);
      toast({
        title: "Visualization Error",
        description: "Failed to generate visualization",
        variant: "destructive",
      });
    }
  };

  const generate3DVisualization = () => {
    // Create 3D-style scatter data with depth
    const data: any[] = [];
    const size = 30;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = (i - size/2) / 5;
        const y = (j - size/2) / 5;
        const z = Math.sin(Math.sqrt(x*x + y*y)) * 10;
        
        data.push({
          x: i,
          y: j,
          z: Math.abs(z),
          value: Math.abs(z),
        });
      }
    }

    setChartData(data);
    setVisualizationType("3d");
  };

  const generateScatterPlot = () => {
    // Create random scatter data
    const n = 100;
    const data: any[] = [];

    for (let i = 0; i < n; i++) {
      const x = Math.random() * 100;
      const y = x * 2 + Math.random() * 20;
      data.push({
        x,
        y,
        z: x,
        value: x / 10,
      });
    }

    setChartData(data);
    setVisualizationType("scatter");
  };

  const downloadPlot = () => {
    toast({
      title: "Export Feature",
      description: "Right-click the chart and select 'Save as image' in your browser",
    });
  };

  const getColorForValue = (value: number) => {
    const colors = ["#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd", "#a78bfa"];
    const index = Math.min(Math.floor(value / 2), colors.length - 1);
    return colors[Math.max(0, index)];
  };

  return (
    <Card className="flex flex-col h-full bg-card border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Visualization</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={executeCodeVisualization}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Update
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={downloadPlot}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-4 overflow-auto bg-background/50">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis
                type="number"
                dataKey="x"
                name="X"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Y"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
              />
              <ZAxis
                type="number"
                dataKey="z"
                range={[50, 400]}
                name="Value"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "0.5rem",
                  color: "#e2e8f0",
                }}
              />
              <Scatter data={chartData} fill="#3b82f6">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorForValue(entry.value)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No visualization data</p>
              <p className="text-sm mt-2">Click Update to generate visualization</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VisualizationPanel;
