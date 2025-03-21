
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, AlertCircle, CheckCircle, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { StudentData } from "./StudentCard";

interface StudentDetailsProps {
  student: StudentData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudentDetails = ({ student, open, onOpenChange }: StudentDetailsProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
    }
  }, [open]);

  if (!student) return null;
  
  const attendancePercentage = Math.round((student.attendedClasses / student.totalClasses) * 100);
  const threshold = student.threshold * 100;
  const isDebarred = attendancePercentage < threshold;
  const remainingClassesNeeded = Math.ceil((student.threshold * student.totalClasses - student.attendedClasses) / (1 - student.threshold));
  const absences = student.totalClasses - student.attendedClasses;
  
  const handleSendReminder = () => {
    toast.success(`Reminder sent to ${student.name}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {student.name}
            {isDebarred ? (
              <Badge variant="destructive" className="ml-2">At Risk</Badge>
            ) : (
              <Badge variant="default" className="ml-2 bg-safe text-safe-foreground">Good Standing</Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-base">{student.rollNumber}</DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <div className={cn(
            "rounded-xl p-4 text-foreground space-y-4 transition-all duration-500 transform",
            showAnimation ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            isDebarred 
              ? "bg-danger/10 border border-danger/20" 
              : "bg-safe/10 border border-safe/20"
          )}>
            <div className="flex items-start gap-3">
              {isDebarred ? (
                <AlertCircle className="h-6 w-6 text-danger shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="h-6 w-6 text-safe shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-medium text-lg">
                  {isDebarred ? "Debarment Status: At Risk" : "Debarment Status: Safe"}
                </h3>
                <p className="text-muted-foreground">
                  {isDebarred
                    ? `Attendance is below threshold of ${threshold}%.`
                    : `Attendance is above threshold of ${threshold}%.`}
                </p>
              </div>
            </div>
            
            {isDebarred && (
              <div className="pl-9">
                <div className="rounded-md bg-background p-3 text-sm">
                  <p className="font-medium">Action Required</p>
                  <p className="text-muted-foreground mt-1">
                    Needs to attend <span className="font-semibold text-foreground">{remainingClassesNeeded} more classes</span> to avoid being debarred.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className={cn(
            "space-y-4 transition-all duration-500 transform delay-100",
            showAnimation ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Attendance</span>
                <span className={cn(
                  "text-sm font-semibold",
                  attendancePercentage >= threshold ? "text-safe" : "text-danger"
                )}>
                  {attendancePercentage}%
                </span>
              </div>
              <Progress
                value={attendancePercentage}
                max={100}
                className={cn(
                  "h-2.5",
                  attendancePercentage >= threshold ? "bg-safe/20" : "bg-danger/20"
                )}
                indicatorClassName={cn(
                  attendancePercentage >= threshold ? "bg-safe" : "bg-danger"
                )}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0%</span>
                <span className="text-xs bg-foreground/10 px-1.5 py-0.5 rounded-sm">
                  Min {threshold}%
                </span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Course</span>
                </div>
                <p className="text-sm">{student.course}</p>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Total Classes</span>
                </div>
                <p className="text-sm">{student.totalClasses}</p>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Classes Attended</span>
                </div>
                <p className="text-sm">{student.attendedClasses}</p>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Absences</span>
                </div>
                <p className="text-sm">{absences}</p>
              </div>
            </div>
          </div>
          
          <Separator className={cn(
            "transition-all duration-500 transform delay-200",
            showAnimation ? "opacity-100" : "opacity-0"
          )} />
          
          <div className={cn(
            "flex justify-end gap-3 transition-all duration-500 transform delay-300",
            showAnimation ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {isDebarred && (
              <Button onClick={handleSendReminder}>
                Send Reminder
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
