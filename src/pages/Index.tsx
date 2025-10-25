import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import AIChat from "@/components/AIChat";
import VisualizationPanel from "@/components/VisualizationPanel";
import { EditorSidebar } from "@/components/EditorSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Code2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { FileNode } from "@/components/FileTree";

const Index = () => {
  const [codeContext, setCodeContext] = useState<string>();
  const [currentCode, setCurrentCode] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("/examples/heatmap.js");
  const { toast } = useToast();

  // Sample file structure
  const [fileStructure] = useState<FileNode[]>([
    {
      name: "examples",
      type: "folder",
      path: "/examples",
      children: [
        {
          name: "heatmap.js",
          type: "file",
          path: "/examples/heatmap.js",
        },
        {
          name: "3d-surface.js",
          type: "file",
          path: "/examples/3d-surface.js",
        },
        {
          name: "scatter.js",
          type: "file",
          path: "/examples/scatter.js",
        },
      ],
    },
    {
      name: "projects",
      type: "folder",
      path: "/projects",
      children: [
        {
          name: "my-visualization.js",
          type: "file",
          path: "/projects/my-visualization.js",
        },
        {
          name: "data-analysis",
          type: "folder",
          path: "/projects/data-analysis",
          children: [
            {
              name: "index.js",
              type: "file",
              path: "/projects/data-analysis/index.js",
            },
            {
              name: "utils.js",
              type: "file",
              path: "/projects/data-analysis/utils.js",
            },
          ],
        },
      ],
    },
    {
      name: "README.md",
      type: "file",
      path: "/README.md",
    },
  ]);

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

  const handleFileSelect = (path: string, name: string) => {
    setSelectedFile(path);
    toast({
      title: "File Opened",
      description: `Opened ${name}`,
    });
  };

  const handleNewFile = () => {
    toast({
      title: "New File",
      description: "File creation coming soon!",
    });
  };

  const handleNewFolder = () => {
    toast({
      title: "New Folder",
      description: "Folder creation coming soon!",
    });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <EditorSidebar
          files={fileStructure}
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm z-10">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="h-8 w-8" />
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
          <main className="flex-1 p-4 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
              {/* Code Editor - Takes 5/12 on large screens */}
              <div className="lg:col-span-5 h-full min-h-[400px]">
                <CodeEditor
                  onAnalyzeCode={handleAnalyzeCode}
                  onRunCode={handleRunCode}
                  onCodeChange={handleCodeChange}
                />
              </div>

              {/* Visualization Panel - Takes 4/12 on large screens */}
              <div className="lg:col-span-4 h-full min-h-[400px]">
                <VisualizationPanel
                  code={currentCode}
                  onExecute={handleRunCode}
                />
              </div>

              {/* AI Chat - Takes 3/12 on large screens */}
              <div className="lg:col-span-3 h-full min-h-[400px]">
                <AIChat codeContext={codeContext} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
