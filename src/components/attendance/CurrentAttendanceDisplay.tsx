
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CurrentAttendanceDisplayProps {
  currentAttendance: number;
  threshold: number;
}

export const CurrentAttendanceDisplay = ({ currentAttendance, threshold }: CurrentAttendanceDisplayProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-lg">Current Attendance</Label>
        <span className={cn(
          "text-md font-medium px-3 py-1 rounded-full",
          currentAttendance >= threshold 
            ? "bg-safe/10 text-safe" 
            : currentAttendance >= threshold - 10
              ? "bg-warning/10 text-warning" 
              : "bg-danger/10 text-danger"
        )}>
          {currentAttendance.toFixed(2)}%
        </span>
      </div>
      <Progress 
        value={currentAttendance} 
        max={100} 
        className={cn(
          "h-4",
          currentAttendance >= threshold 
            ? "bg-safe/20" 
            : currentAttendance >= threshold - 10
              ? "bg-warning/20" 
              : "bg-danger/20"
        )}
        indicatorClassName={cn(
          currentAttendance >= threshold 
            ? "bg-safe" 
            : currentAttendance >= threshold - 10
              ? "bg-warning" 
              : "bg-danger"
        )}
      />
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>0%</span>
        <span className="px-2 py-0.5 rounded-sm bg-foreground/10 text-sm font-medium">
          Threshold: {threshold}%
        </span>
        <span>100%</span>
      </div>
    </div>
  );
};
