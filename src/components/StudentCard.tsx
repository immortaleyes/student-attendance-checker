
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface StudentData {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  totalClasses: number;
  attendedClasses: number;
  threshold: number;
}

interface StudentCardProps {
  student: StudentData;
  onViewDetails?: (student: StudentData) => void;
}

export const StudentCard = ({ student, onViewDetails }: StudentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const attendancePercentage = Math.round((student.attendedClasses / student.totalClasses) * 100);
  const remainingClassesNeeded = Math.ceil((student.threshold * student.totalClasses - student.attendedClasses) / (1 - student.threshold));
  
  const isDebarred = attendancePercentage < student.threshold * 100;
  
  const statusColor = attendancePercentage >= 75 
    ? "safe" 
    : attendancePercentage >= 65 
      ? "warning" 
      : "danger";
      
  const getStatusText = () => {
    if (attendancePercentage >= 75) {
      return "Good Standing";
    } else if (attendancePercentage >= 65) {
      return "Warning";
    } else {
      return "At Risk";
    }
  };
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(student);
    } else {
      toast.info(`Viewing details for ${student.name}`);
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 h-full", 
        isHovered ? "shadow-lg translate-y-[-4px]" : "shadow",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium mb-1">{student.name}</CardTitle>
            <CardDescription>{student.rollNumber}</CardDescription>
          </div>
          <Badge 
            variant={statusColor === "safe" ? "default" : statusColor === "warning" ? "outline" : "destructive"}
            className={cn(
              "rounded-full transition-all duration-300",
              statusColor === "safe" && "bg-safe text-safe-foreground",
              statusColor === "warning" && "bg-warning/10 text-warning border-warning",
              statusColor === "danger" && "bg-danger text-danger-foreground"
            )}
          >
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Course</span>
            <span className="font-medium">{student.course}</span>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm text-muted-foreground">Attendance</span>
              <span className={cn(
                "text-sm font-semibold",
                statusColor === "safe" && "text-safe",
                statusColor === "warning" && "text-warning",
                statusColor === "danger" && "text-danger"
              )}>
                {attendancePercentage}%
              </span>
            </div>
            <Progress
              value={attendancePercentage}
              max={100}
              className={cn(
                "h-2 transition-all duration-500",
                statusColor === "safe" && "bg-safe/20",
                statusColor === "warning" && "bg-warning/20",
                statusColor === "danger" && "bg-danger/20"
              )}
              indicatorClassName={cn(
                statusColor === "safe" && "bg-safe",
                statusColor === "warning" && "bg-warning",
                statusColor === "danger" && "bg-danger"
              )}
            />
          </div>
          
          <div className={cn(
            "text-sm p-3 rounded-md flex items-start gap-2.5 transition-all",
            isDebarred 
              ? "bg-danger/10 text-danger-foreground" 
              : "bg-safe/10 text-safe-foreground"
          )}>
            {isDebarred ? (
              <AlertCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="h-5 w-5 text-safe shrink-0 mt-0.5" />
            )}
            <div>
              {isDebarred ? (
                <>
                  <p className="font-medium text-foreground">Needs {remainingClassesNeeded} more classes</p>
                  <p className="text-muted-foreground mt-0.5">To avoid being debarred</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-foreground">Good attendance</p>
                  <p className="text-muted-foreground mt-0.5">Student is in good standing</p>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleViewDetails}
          variant="outline" 
          className="w-full transition-all"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
