
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThresholdSliderProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export const ThresholdSlider = ({ threshold, onThresholdChange }: ThresholdSliderProps) => {
  const handleSliderChange = (value: number[]) => {
    onThresholdChange(value[0]);
  };

  return (
    <div className="space-y-3 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
      <div className="flex items-center justify-between">
        <Label className="font-medium flex items-center gap-2 text-primary text-lg">
          <Sliders className="h-5 w-5" />
          Debarment Threshold
        </Label>
        <span className={cn(
          "px-3 py-1 rounded-full font-semibold text-md", 
          threshold >= 80 ? "bg-danger/15 text-danger" :
          threshold >= 75 ? "bg-warning/15 text-warning" :
          "bg-safe/15 text-safe"
        )}>
          {threshold}%
        </span>
      </div>
      
      <Slider
        value={[threshold]}
        min={50}
        max={90}
        step={1}
        onValueChange={handleSliderChange}
        className="py-2"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>50% (Lenient)</span>
        <span className="bg-foreground/10 px-2 py-1 rounded text-xs font-medium">
          Standard: 75%
        </span>
        <span>90% (Strict)</span>
      </div>
    </div>
  );
};
