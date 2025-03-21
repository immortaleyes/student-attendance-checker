
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <header className="mb-8">
      <div className={cn(
        "transition-all duration-700 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}>
        <h1 className="text-3xl font-semibold tracking-tight mb-1">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-balance">{subtitle}</p>
        )}
      </div>
    </header>
  );
};
