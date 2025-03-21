
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentSearchProps {
  onSearch: (query: string) => void;
  className?: string;
}

export const StudentSearch = ({ onSearch, className }: StudentSearchProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className={cn(
        "relative transition-all duration-300 rounded-md",
        isFocused ? "ring-2 ring-primary/30 shadow-sm" : ""
      )}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <Input
          type="text"
          placeholder="Search by name or roll number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-10 pr-10 h-11 transition-all duration-300 bg-background",
            "border-border focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        />
        
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 h-auto"
          >
            <X className="w-4 h-4 text-muted-foreground" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  );
};
