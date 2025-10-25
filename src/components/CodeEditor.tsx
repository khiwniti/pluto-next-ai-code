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
  const [code, setCode] = useState(`// Engineering Simulation: Stress Distribution Analysis
// Finite Element Analysis (FEA) for structural components

// Material Properties
const materialProperties = {
  youngsModulus: 200e9,  // Pa (Steel)
  poissonRatio: 0.3,
  density: 7850,         // kg/m³
  yieldStrength: 250e6   // Pa
};

// Mesh Generation: 2D Plate Element
function generateStressField(nx, ny) {
  const stressData = [];
  
  // Applied load: 100 MPa tension
  const appliedLoad = 100e6;
  
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      const x = i / (nx - 1);
      const y = j / (ny - 1);
      
      // Von Mises stress distribution
      // Stress concentration near hole/notch
      const r = Math.sqrt((x - 0.5)**2 + (y - 0.5)**2);
      const stressConcentration = 1 + 2 * Math.exp(-r * 10);
      const vonMisesStress = appliedLoad * stressConcentration;
      
      stressData.push({
        x: x,
        y: y,
        stress: vonMisesStress / 1e6,  // Convert to MPa
        safetyFactor: materialProperties.yieldStrength / vonMisesStress
      });
    }
  }
  
  return stressData;
}

// Run FEA simulation
const results = generateStressField(30, 30);
const maxStress = Math.max(...results.map(r => r.stress));
const minSafetyFactor = Math.min(...results.map(r => r.safetyFactor));

console.log(\`Max Stress: \${maxStress.toFixed(2)} MPa\`);
console.log(\`Min Safety Factor: \${minSafetyFactor.toFixed(2)}\`);
console.log("Stress analysis complete - visualize results");
`);
  
  const [language, setLanguage] = useState("javascript");

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
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
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
