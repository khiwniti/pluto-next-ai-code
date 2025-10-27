import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import AIChat from "@/components/AIChat";
import VisualizationPanel from "@/components/VisualizationPanel";
import { Code2, Sparkles, Download, Share2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotebookCell {
  id: string;
  type: "code" | "markdown";
  content: string;
  output?: string;
}

const Index = () => {
  const [codeContext, setCodeContext] = useState<string>();
  const [currentCode, setCurrentCode] = useState<string>("");
  const [cells, setCells] = useState<NotebookCell[]>([
    {
      id: "1",
      type: "markdown",
      content: "# Agentic AI Engineering Suite\n\nAutonomous FEA • CFD • Thermal Optimization",
    },
    {
      id: "2",
      type: "code",
      content: "// Structural analysis simulation\nconst stressAnalysis = (load) => {\n  return load * 1.5;\n};",
    },
    {
      id: "3",
      type: "markdown",
      content: "## Using three.js in Pluto\n\nPluto makes it really easy to use existing JavaScript libraries to add visualisations to your Julia project!",
    },
  ]);

  const [tableOfContents] = useState([
    { id: "1", title: "Agentic AI Engineering Suite", level: 1 },
    { id: "2", title: "Using three.js in Pluto", level: 2 },
    { id: "3", title: "Creating the scene", level: 3 },
    { id: "4", title: "Adding a cube", level: 3 },
    { id: "5", title: "Using data from Julia", level: 2 },
    { id: "6", title: "Demo of visualise_shapes", level: 3 },
  ]);

  const { toast } = useToast();

  const handleAnalyzeCode = (code: string) => {
    setCodeContext(code);
    setCurrentCode(code);
    toast({
      title: "Code Analysis",
      description: "AI is analyzing your code...",
    });
  };

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
  };

  const handleRunCode = () => {
    toast({
      title: "Visualization Updated",
      description: "Check the visualization panel for results",
    });
  };

  const handleAddCell = () => {
    const newCell: NotebookCell = {
      id: String(cells.length + 1),
      type: "code",
      content: "// New cell",
    };
    setCells([...cells, newCell]);
    toast({
      title: "New Cell Added",
      description: "A new code cell has been created",
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Main Content - Left Column */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur-sm z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Agentic AI Engineering Suite
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Autonomous FEA • CFD • Thermal Optimization
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-medium text-primary">
                  <BookOpen className="w-4 h-4" />
                  Edit or run this notebook
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors text-sm font-medium text-accent">
                  <Code2 className="w-4 h-4" />
                  View code
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                <span className="font-medium text-primary">Agent Active</span>
              </div>
              <span>NVIDIA-AWS Hackathon</span>
            </div>
          </div>
        </header>

        {/* Notebook Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Notebook Cells */}
            <div className="space-y-6">
              {cells.map((cell, index) => (
                <div key={cell.id} className="group">
                  {cell.type === "markdown" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="text-foreground">
                        {cell.content.split("\n").map((line, i) => {
                          if (line.startsWith("# ")) {
                            return (
                              <h1 key={i} className="text-2xl font-bold mt-6 mb-4">
                                {line.substring(2)}
                              </h1>
                            );
                          } else if (line.startsWith("## ")) {
                            return (
                              <h2 key={i} className="text-xl font-bold mt-5 mb-3">
                                {line.substring(3)}
                              </h2>
                            );
                          } else if (line.startsWith("### ")) {
                            return (
                              <h3 key={i} className="text-lg font-bold mt-4 mb-2">
                                {line.substring(4)}
                              </h3>
                            );
                          } else if (line.trim()) {
                            return (
                              <p key={i} className="text-sm text-foreground/80 mb-2">
                                {line}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Cell {index + 1}
                        </span>
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-background rounded transition-colors">
                            <Code2 className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 font-mono text-sm bg-background text-foreground/80 overflow-x-auto">
                        <pre>{cell.content}</pre>
                      </div>
                      {cell.output && (
                        <div className="p-4 border-t border-border bg-muted/30 font-mono text-sm text-foreground/70">
                          {cell.output}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Cell Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAddCell}
                className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-medium text-primary"
              >
                + Add Cell
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Table of Contents & AI Chat */}
      <div className="w-80 flex flex-col border-l border-border bg-muted/30">
        {/* Table of Contents */}
        <div className="flex-1 overflow-y-auto border-b border-border">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-xs hover:text-primary transition-colors truncate ${
                    item.level === 1
                      ? "font-semibold text-foreground"
                      : item.level === 2
                        ? "text-foreground/80 pl-3"
                        : "text-foreground/60 pl-6"
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* AI Chat Panel */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <AIChat codeContext={codeContext} />
        </div>
      </div>
    </div>
  );
};

export default Index;

