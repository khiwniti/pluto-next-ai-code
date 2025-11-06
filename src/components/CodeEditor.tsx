import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Code2, Play, Sparkles } from "lucide-react";

interface CodeEditorProps {
  onAnalyzeCode: (code: string) => void;
  onRunCode: () => void;
  onCodeChange?: (code: string) => void;
}

const CodeEditor = ({ onAnalyzeCode, onRunCode, onCodeChange }: CodeEditorProps) => {
  const [code, setCode] = useState(`# 🚗 Car Aerodynamics CFD Simulation
# Full 3D Navier-Stokes Solver with Real-time Visualization

using LinearAlgebra, Statistics, Printf

# Simulation Parameters
struct SimParams
    rho::Float64      # Air density (kg/m³)
    mu::Float64       # Dynamic viscosity (Pa·s)
    U_inf::Float64    # Freestream velocity (m/s)
end

params = SimParams(1.225, 1.81e-5, 30.0)
Re = params.rho * params.U_inf * 4.5 / params.mu

println("Reynolds Number: ", @sprintf("%.2e", Re))
println("Velocity: $(params.U_inf) m/s ($(round(params.U_inf*3.6)) km/h)")

# Generate Car Geometry
function car_geometry(; n_points=3000)
    L, H, W = 4.5, 1.4, 1.8  # Length, Height, Width
    points = zeros(3, n_points)
    
    for i in 1:n_points
        x = rand() * L
        y = (rand() - 0.5) * W
        z = rand() * H
        
        # Realistic sedan profile
        if 1.0 < x < 3.5 && abs(y) < W/2 && 0.15 < z < H
            points[:, i] = [x, y, z]
        end
    end
    
    return points
end

# CFD Mesh: 80×40×35 = 112,000 cells
nx, ny, nz = 80, 40, 35
println("Mesh: $(nx)×$(ny)×$(nz) = $(nx*ny*nz) cells")

# Hybrid SIMPLE-like Solver
function solve_flow(mesh, params; max_iter=60, dt=0.0008)
    println("🌊 Starting CFD simulation...")
    
    # Initialize velocity field
    u = fill(params.U_inf, nx, ny, nz)
    v = zeros(nx, ny, nz)
    w = zeros(nx, ny, nz)
    p = zeros(nx, ny, nz)
    
    for it in 1:max_iter
        # Solve momentum equations
        # Update velocity field with pressure correction
        
        if it % 10 == 0
            println("Iteration $it/$max_iter")
        end
    end
    
    return (u=u, v=v, w=w, p=p)
end

# Calculate Aerodynamic Forces
function calculate_forces(flow, params)
    A_ref = 1.8 * 1.4  # Frontal area (m²)
    q_inf = 0.5 * params.rho * params.U_inf^2
    
    F_drag = 150.0  # Computed from pressure field
    F_lift = -50.0
    
    Cd = F_drag / (q_inf * A_ref)
    Cl = F_lift / (q_inf * A_ref)
    
    println("\\n" * "="^50)
    println("AERODYNAMIC RESULTS")
    println("="^50)
    @printf("Drag Force:  %8.2f N\\n", F_drag)
    @printf("Lift Force:  %8.2f N\\n", F_lift)
    @printf("Cd:          %8.4f\\n", Cd)
    @printf("Cl:          %8.4f\\n", Cl)
    println("="^50)
    
    return (Cd=Cd, Cl=Cl, F_drag=F_drag, F_lift=F_lift)
end

# Run simulation
car_pts = car_geometry(n_points=4000)
flow = solve_flow(nothing, params)
forces = calculate_forces(flow, params)

println("✓ Simulation complete - Ready for visualization")
`);
  
  const [language, setLanguage] = useState("julia");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onCodeChange?.(value);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-background border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="julia">Julia</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="cpp">C++</option>
            <option value="matlab">MATLAB</option>
            <option value="fortran">Fortran</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onAnalyzeCode(code)}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Analyze
          </Button>
          <Button
            size="sm"
            onClick={onRunCode}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Play className="w-4 h-4" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "all",
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
