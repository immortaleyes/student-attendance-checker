
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
  threshold: number;
}

export const AttendancePlanner = ({ 
  remainingClasses, 
  initialPlannedAttendance,
  projectedAttendance,
  onPlannedAttendanceChange,
  threshold
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
    <div className="space-y-4 p-5 border-2 border-primary/10 rounded-lg bg-background">
      <div>
        <Label className="mb-3 block text-lg">
          Plan to attend <span className="text-primary font-medium text-lg">{plannedAttendance}</span> out of {remainingClasses} remaining classes
        </Label>
        <Slider
          value={[plannedAttendance]}
          min={0}
          max={remainingClasses}
          step={1}
          onValueChange={handleAttendanceChange}
          className="py-4"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-muted-foreground">0 Classes</span>
          <span className="text-sm text-muted-foreground">All {remainingClasses} Classes</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-lg">Projected Attendance</Label>
          <span className={cn(
            "text-md font-medium px-3 py-1 rounded-full",
            projectedAttendance >= threshold 
              ? "bg-safe/10 text-safe" 
              : "bg-danger/10 text-danger"
          )}>
            {projectedAttendance.toFixed(2)}%
          </span>
        </div>
        <Progress 
          value={projectedAttendance} 
          max={100} 
          className={projectedAttendance >= threshold ? "bg-safe/20 h-4" : "bg-danger/20 h-4"}
          indicatorClassName={projectedAttendance >= threshold ? "bg-safe" : "bg-danger"}
        />
        
        <div className="mt-3 text-md">
          {projectedAttendance >= threshold ? (
            <p className="text-safe flex items-center gap-2 font-medium">
              <CheckCircle className="h-5 w-5" />
              You will meet the attendance requirement
            </p>
          ) : (
            <p className="text-danger flex items-center gap-2 font-medium">
              <AlertCircle className="h-5 w-5" />
              You will still be debarred
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
