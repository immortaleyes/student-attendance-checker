
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CurrentAttendanceDisplayProps {
  currentAttendance: number;
}

export const CurrentAttendanceDisplay = ({ currentAttendance }: CurrentAttendanceDisplayProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Current Attendance</Label>
        <span className={cn(
          "text-sm font-medium px-2 py-0.5 rounded-full",
          currentAttendance >= 75 
            ? "bg-safe/10 text-safe" 
            : currentAttendance >= 65
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
          "h-3",
          currentAttendance >= 75 
            ? "bg-safe/20" 
            : currentAttendance >= 65
              ? "bg-warning/20" 
              : "bg-danger/20"
        )}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>0%</span>
        <span className="px-1 py-0.5 rounded-sm bg-foreground/5 text-xs font-medium">
          Threshold: 75%
        </span>
        <span>100%</span>
      </div>
    </div>
  );
};
