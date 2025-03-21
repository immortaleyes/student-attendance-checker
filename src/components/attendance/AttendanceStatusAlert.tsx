
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

interface AttendanceStatusAlertProps {
  isAtRisk: boolean;
  currentAttendance: number;
}

export const AttendanceStatusAlert = ({ isAtRisk, currentAttendance }: AttendanceStatusAlertProps) => {
  return (
    <Alert
      className={cn(
        "border-2 shadow-sm",
        isAtRisk ? "bg-danger/5 border-danger/20" : "bg-safe/5 border-safe/20"
      )}
    >
      <div className="flex items-start gap-3">
        {isAtRisk ? (
          <AlertCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
        ) : (
          <CheckCircle className="h-5 w-5 text-safe shrink-0 mt-0.5" />
        )}
        <div>
          <AlertTitle className="text-sm font-semibold">
            {isAtRisk ? "You're at risk of debarment" : "You're in good standing"}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground mt-1">
            Current attendance: <span className="font-medium">{currentAttendance.toFixed(2)}%</span> 
            {isAtRisk && " (below 75% threshold)"}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};
