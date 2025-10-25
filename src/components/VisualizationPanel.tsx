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
    // Engineering simulation: Stress distribution heatmap
    const data: any[] = [];
    const size = 30;
    
    // Simulate stress concentration around a circular hole
    const centerX = size / 2;
    const centerY = size / 2;
    const holeRadius = size / 6;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const dx = i - centerX;
        const dy = j - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Stress concentration factor around hole
        let stress;
        if (distance < holeRadius) {
          stress = 0; // No stress inside hole
        } else {
          // Stress increases near hole boundary
          const stressConcentration = 1 + (holeRadius * holeRadius) / (distance * distance);
          stress = 100 * stressConcentration; // Base stress 100 MPa
        }
        
        data.push({
          x: i,
          y: j,
          z: Math.min(stress, 300), // Cap at 300 MPa for visualization
          value: Math.min(stress / 30, 10), // Normalize for color scale
        });
      }
    }

    setChartData(data);
    setVisualizationType("heatmap");
  };

  const executeCodeVisualization = () => {
      try {
      if (code.includes("heatmap") || code.includes("stress") || code.includes("strain")) {
        generateDefaultVisualization();
        toast({
          title: "Stress Analysis Complete",
          description: "Von Mises stress distribution generated",
        });
      } else if (code.includes("3d") || code.includes("thermal") || code.includes("temperature")) {
        generate3DVisualization();
        toast({
          title: "Thermal Analysis Complete",
          description: "Temperature field distribution generated",
        });
      } else if (code.includes("scatter") || code.includes("fluid") || code.includes("velocity")) {
        generateScatterPlot();
        toast({
          title: "Fluid Dynamics Complete",
          description: "Velocity field visualization generated",
        });
      } else {
        toast({
          title: "Run Simulation",
          description: "Add keywords: stress, thermal, or fluid to your code",
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
    // Thermal analysis: Temperature distribution in 3D
    const data: any[] = [];
    const size = 35;
    const hotspotX = size * 0.3;
    const hotspotY = size * 0.5;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const dx = i - hotspotX;
        const dy = j - hotspotY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Heat dissipation from hotspot (thermal conduction)
        const temperature = 100 * Math.exp(-distance / 10) + 20; // Base temp 20°C
        
        data.push({
          x: i,
          y: j,
          z: temperature,
          value: temperature / 10,
        });
      }
    }

    setChartData(data);
    setVisualizationType("3d");
  };

  const generateScatterPlot = () => {
    // Fluid dynamics: Velocity vectors/particles
    const n = 150;
    const data: any[] = [];

    for (let i = 0; i < n; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Simulate flow around obstacle at center
      const dx = x - 50;
      const dy = y - 50;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const velocity = Math.max(0, 10 - distance / 5); // m/s
      
      data.push({
        x,
        y,
        z: velocity * 10, // Scale for visualization
        value: velocity,
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
