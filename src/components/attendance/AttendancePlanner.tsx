
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendancePlannerProps {
  remainingClasses: number;
  initialPlannedAttendance: number;
  projectedAttendance: number;
  onPlannedAttendanceChange: (value: number) => void;
}

export const AttendancePlanner = ({ 
  remainingClasses, 
  initialPlannedAttendance,
  projectedAttendance,
  onPlannedAttendanceChange 
}: AttendancePlannerProps) => {
  const [plannedAttendance, setPlannedAttendance] = useState(initialPlannedAttendance);

  useEffect(() => {
    setPlannedAttendance(initialPlannedAttendance);
  }, [initialPlannedAttendance]);

  const handleAttendanceChange = (value: number[]) => {
    const newValue = value[0];
    setPlannedAttendance(newValue);
    onPlannedAttendanceChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">
          Plan to attend <span className="text-primary font-medium">{plannedAttendance}</span> out of {remainingClasses} remaining classes
        </Label>
        <Slider
          value={[plannedAttendance]}
          min={0}
          max={remainingClasses}
          step={1}
          onValueChange={handleAttendanceChange}
          className="py-2"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">0 Classes</span>
          <span className="text-xs text-muted-foreground">All {remainingClasses} Classes</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Projected Attendance</Label>
          <span className={cn(
            "text-sm font-medium px-2 py-0.5 rounded-full",
            projectedAttendance >= 75 
              ? "bg-safe/10 text-safe" 
              : "bg-danger/10 text-danger"
          )}>
            {projectedAttendance.toFixed(2)}%
          </span>
        </div>
        <Progress 
          value={projectedAttendance} 
          max={100} 
          className={projectedAttendance >= 75 ? "bg-safe/20 h-3" : "bg-danger/20 h-3"}
        />
        
        <div className="mt-2 text-sm">
          {projectedAttendance >= 75 ? (
            <p className="text-safe flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              You will meet the attendance requirement
            </p>
          ) : (
            <p className="text-danger flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              You will still be debarred
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
