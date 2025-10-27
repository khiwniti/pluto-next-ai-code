import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TOCItem {
  id: string;
  title: string;
  level: number;
  href?: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

const TableOfContents = ({
  items,
  activeId,
  onItemClick,
}: TableOfContentsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Table of Contents
        </h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <a
              key={item.id}
              href={item.href || `#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onItemClick?.(item.id);
              }}
              className={`block text-xs px-2 py-1.5 rounded transition-colors truncate ${
                activeId === item.id
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              } ${
                item.level === 1
                  ? "font-semibold"
                  : item.level === 2
                    ? "pl-4"
                    : "pl-8"
              }`}
              title={item.title}
            >
              {item.title}
            </a>
          ))
        ) : (
          <div className="text-xs text-muted-foreground text-center py-4">
            No results found
          </div>
        )}
      </nav>
    </div>
  );
};

export default TableOfContents;

