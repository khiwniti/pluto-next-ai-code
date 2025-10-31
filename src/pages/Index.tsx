import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import AIChat from "@/components/AIChat";
import VisualizationPanel from "@/components/VisualizationPanel";
import { Code2, Sparkles, BookOpen, Menu, X } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="flex min-h-screen w-full bg-background flex-col lg:flex-row">
      {/* Main Content - Left Column */}
      <div className="flex-1 flex flex-col overflow-hidden lg:border-r lg:border-border">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur-sm z-10">
          <div className="px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                  title="Toggle sidebar"
                >
                  {sidebarOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                    Agentic AI Engineering Suite
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Autonomous FEA • CFD • Thermal Optimization
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-medium text-primary">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden md:inline">Edit or run</span>
                </button>
                <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors text-sm font-medium text-accent">
                  <Code2 className="w-4 h-4" />
                  <span className="hidden md:inline">View code</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-3 h-3 text-primary animate-pulse flex-shrink-0" />
                <span className="font-medium text-primary text-xs">Agent Active</span>
              </div>
              <span className="hidden sm:inline">NVIDIA-AWS Hackathon</span>
            </div>
          </div>
        </header>

        {/* Notebook Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
                              <h1 key={i} className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4">
                                {line.substring(2)}
                              </h1>
                            );
                          } else if (line.startsWith("## ")) {
                            return (
                              <h2 key={i} className="text-xl sm:text-2xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3">
                                {line.substring(3)}
                              </h2>
                            );
                          } else if (line.startsWith("### ")) {
                            return (
                              <h3 key={i} className="text-lg font-bold mt-3 sm:mt-4 mb-2">
                                {line.substring(4)}
                              </h3>
                            );
                          } else if (line.trim()) {
                            return (
                              <p key={i} className="text-sm sm:text-base text-foreground/80 mb-2">
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
                      <div className="bg-muted/50 px-3 sm:px-4 py-2 border-b border-border flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Cell {index + 1}
                        </span>
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-background rounded transition-colors">
                            <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm bg-background text-foreground/80 overflow-x-auto">
                        <pre className="whitespace-pre-wrap break-words">{cell.content}</pre>
                      </div>
                      {cell.output && (
                        <div className="p-3 sm:p-4 border-t border-border bg-muted/30 font-mono text-xs sm:text-sm text-foreground/70">
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
      <div
        className={`fixed lg:static inset-y-0 right-0 w-80 flex flex-col border-l border-border bg-muted/30 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-background rounded-lg transition-colors"
          title="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Table of Contents */}
        <div className="flex-1 overflow-y-auto border-b border-border pt-12 lg:pt-0">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setSidebarOpen(false)}
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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;

