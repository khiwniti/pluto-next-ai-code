import { useState } from "react";
import { Code2, ChevronDown, ChevronUp, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotebookCellProps {
  id: string;
  type: "code" | "markdown";
  content: string;
  output?: string;
  cellNumber: number;
  onDelete?: (id: string) => void;
  onRun?: (id: string, code: string) => void;
}

const NotebookCell = ({
  id,
  type,
  content,
  output,
  cellNumber,
  onDelete,
  onRun,
}: NotebookCellProps) => {
  const [showCode, setShowCode] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (type === "markdown") {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <div className="text-foreground">
          {content.split("\n").map((line, i) => {
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
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mb-6 group">
      {/* Cell Header */}
      <div className="bg-muted/50 px-3 sm:px-4 py-2 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium text-muted-foreground flex-shrink-0">
            Cell {cellNumber}
          </span>
          <Code2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => setShowCode(!showCode)}
            title={showCode ? "Hide code" : "Show code"}
          >
            {showCode ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={handleCopy}
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </Button>
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={() => onDelete(id)}
              title="Delete cell"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Code Content */}
      {showCode && (
        <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm bg-background text-foreground/80 overflow-x-auto border-b border-border">
          <pre className="whitespace-pre-wrap break-words">{content}</pre>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="p-3 sm:p-4 border-t border-border bg-muted/30 font-mono text-xs sm:text-sm text-foreground/70">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Output:
          </div>
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default NotebookCell;

