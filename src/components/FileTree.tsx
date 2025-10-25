import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
}

interface FileTreeProps {
  data: FileNode[];
  onFileSelect: (path: string, name: string) => void;
  selectedFile?: string;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onFileSelect: (path: string, name: string) => void;
  selectedFile?: string;
}

const FileTreeItem = ({ node, level, onFileSelect, selectedFile }: FileTreeItemProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleClick = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(node.path, node.name);
    }
  };

  const isSelected = selectedFile === node.path;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-muted/50 rounded-sm transition-colors",
          isSelected && "bg-primary/20 text-primary font-medium"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === "folder" && (
          <span className="w-4 h-4 flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        
        {node.type === "folder" ? (
          isOpen ? (
            <FolderOpen className="w-4 h-4 text-accent flex-shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-accent flex-shrink-0" />
          )
        ) : (
          <File className="w-4 h-4 text-primary flex-shrink-0 ml-4" />
        )}
        
        <span className="text-sm truncate">{node.name}</span>
      </div>

      {node.type === "folder" && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeItem
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree = ({ data, onFileSelect, selectedFile }: FileTreeProps) => {
  return (
    <div className="w-full">
      {data.map((node, index) => (
        <FileTreeItem
          key={`${node.path}-${index}`}
          node={node}
          level={0}
          onFileSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};

export default FileTree;
export type { FileNode };
