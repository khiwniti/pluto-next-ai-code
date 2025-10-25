import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import AIChat from "@/components/AIChat";
import { Code2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [codeContext, setCodeContext] = useState<string>();
  const { toast } = useToast();

  const handleAnalyzeCode = (code: string) => {
    setCodeContext(code);
    toast({
      title: "Code Analysis",
      description: "AI is analyzing your code...",
    });
  };

  const handleRunCode = () => {
    toast({
      title: "Code Execution",
      description: "Code execution is not yet implemented in this demo.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Code Editor
                </h1>
                <p className="text-xs text-muted-foreground">Powered by AI Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">AI Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Code Editor - Takes 2/3 on large screens */}
          <div className="lg:col-span-2 h-full min-h-[400px]">
            <CodeEditor
              onAnalyzeCode={handleAnalyzeCode}
              onRunCode={handleRunCode}
            />
          </div>

          {/* AI Chat - Takes 1/3 on large screens */}
          <div className="lg:col-span-1 h-full min-h-[400px]">
            <AIChat codeContext={codeContext} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
