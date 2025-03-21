
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ 
  title, 
  description, 
  icon = <Search className="h-12 w-12 text-muted-foreground/50" />, 
  className 
}: EmptyStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8",
      "min-h-[300px] rounded-lg border border-dashed animate-fade-in",
      className
    )}>
      <div className="mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-1">{title}</h3>
      <p className="text-muted-foreground max-w-sm text-balance">
        {description}
      </p>
    </div>
  );
};
