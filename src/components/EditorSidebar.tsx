import { Files, Plus, FolderPlus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import FileTree, { FileNode } from "./FileTree";

interface EditorSidebarProps {
  files: FileNode[];
  onFileSelect: (path: string, name: string) => void;
  selectedFile?: string;
  onNewFile?: () => void;
  onNewFolder?: () => void;
}

export function EditorSidebar({
  files,
  onFileSelect,
  selectedFile,
  onNewFile,
  onNewFolder,
}: EditorSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <Files className="w-4 h-4 text-primary" />
            {open && <span className="text-sm font-semibold">FILES</span>}
          </div>
          
          {open && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onNewFile}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onNewFolder}
              >
                <FolderPlus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground px-2">
            {open ? "EXPLORER" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {open ? (
              <FileTree
                data={files}
                onFileSelect={onFileSelect}
                selectedFile={selectedFile}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                {files.slice(0, 5).map((file, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onFileSelect(file.path, file.name)}
                  >
                    <Files className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
