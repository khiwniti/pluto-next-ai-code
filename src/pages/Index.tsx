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
  const [selectedFile, setSelectedFile] = useState<string>("/simulations/structural-analysis/stress-distribution.js");
  const { toast } = useToast();

  // Engineering simulation file structure
  const [fileStructure] = useState<FileNode[]>([
    {
      name: "simulations",
      type: "folder",
      path: "/simulations",
      children: [
        {
          name: "structural-analysis",
          type: "folder",
          path: "/simulations/structural-analysis",
          children: [
            {
              name: "stress-distribution.js",
              type: "file",
              path: "/simulations/structural-analysis/stress-distribution.js",
            },
            {
              name: "beam-deflection.js",
              type: "file",
              path: "/simulations/structural-analysis/beam-deflection.js",
            },
            {
              name: "modal-analysis.js",
              type: "file",
              path: "/simulations/structural-analysis/modal-analysis.js",
            },
          ],
        },
        {
          name: "thermal-analysis",
          type: "folder",
          path: "/simulations/thermal-analysis",
          children: [
            {
              name: "heat-transfer.js",
              type: "file",
              path: "/simulations/thermal-analysis/heat-transfer.js",
            },
            {
              name: "temperature-field.js",
              type: "file",
              path: "/simulations/thermal-analysis/temperature-field.js",
            },
          ],
        },
        {
          name: "fluid-dynamics",
          type: "folder",
          path: "/simulations/fluid-dynamics",
          children: [
            {
              name: "velocity-field.js",
              type: "file",
              path: "/simulations/fluid-dynamics/velocity-field.js",
            },
            {
              name: "pressure-contour.js",
              type: "file",
              path: "/simulations/fluid-dynamics/pressure-contour.js",
            },
          ],
        },
      ],
    },
    {
      name: "materials",
      type: "folder",
      path: "/materials",
      children: [
        {
          name: "steel-properties.js",
          type: "file",
          path: "/materials/steel-properties.js",
        },
        {
          name: "aluminum-alloy.js",
          type: "file",
          path: "/materials/aluminum-alloy.js",
        },
      ],
    },
    {
      name: "mesh-generation",
      type: "folder",
      path: "/mesh-generation",
      children: [
        {
          name: "structured-mesh.js",
          type: "file",
          path: "/mesh-generation/structured-mesh.js",
        },
        {
          name: "adaptive-refinement.js",
          type: "file",
          path: "/mesh-generation/adaptive-refinement.js",
        },
      ],
    },
    {
      name: "post-processing",
      type: "folder",
      path: "/post-processing",
      children: [
        {
          name: "results-export.js",
          type: "file",
          path: "/post-processing/results-export.js",
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
                      Agentic AI Engineering Suite
                    </h1>
                    <p className="text-xs text-muted-foreground">Autonomous FEA • CFD • Thermal Optimization</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs font-medium text-primary">Agent Active</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">NVIDIA-AWS Hackathon</span>
                  </div>
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
