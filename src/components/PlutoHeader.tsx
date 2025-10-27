import { Code2, BookOpen, Download, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlutoHeaderProps {
  title?: string;
  subtitle?: string;
  onEdit?: () => void;
  onViewCode?: () => void;
  onExport?: () => void;
}

const PlutoHeader = ({
  title = "Agentic AI Engineering Suite",
  subtitle = "Autonomous FEA • CFD • Thermal Optimization",
  onEdit,
  onViewCode,
  onExport,
}: PlutoHeaderProps) => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm z-10">
      <div className="px-6 py-4">
        {/* Top Row - Title and Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={onEdit}
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Edit or run this notebook
              </Button>
            )}
            {onViewCode && (
              <Button
                size="sm"
                variant="outline"
                onClick={onViewCode}
                className="gap-2"
              >
                <Code2 className="w-4 h-4" />
                View code
              </Button>
            )}
            {onExport && (
              <Button
                size="sm"
                variant="outline"
                onClick={onExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Row - Status and Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-medium text-primary">Agent Active</span>
          </div>
          <span>NVIDIA-AWS Hackathon</span>
          <span className="ml-auto">Last updated: Just now</span>
        </div>
      </div>
    </header>
  );
};

export default PlutoHeader;

