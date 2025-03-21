
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, CalendarCheck } from "lucide-react";

// Import the refactored components
import { InputFields } from "./attendance/InputFields";
import { AttendanceStatusAlert } from "./attendance/AttendanceStatusAlert";
import { CurrentAttendanceDisplay } from "./attendance/CurrentAttendanceDisplay";
import { ClassesNeededInfo } from "./attendance/ClassesNeededInfo";
import { AttendancePlanner } from "./attendance/AttendancePlanner";
import { RemedialClassesInfo } from "./attendance/RemedialClassesInfo";

export const AttendanceCalculator = () => {
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [attendedClasses, setAttendedClasses] = useState<number>(0);
  const [remainingClasses, setRemainingClasses] = useState<number>(0);
  const [remedialClasses, setRemedialClasses] = useState<number>(0);
  const [plannedAttendance, setPlannedAttendance] = useState<number>(0);
  const [currentAttendance, setCurrentAttendance] = useState<number>(0);
  const [projectedAttendance, setProjectedAttendance] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [classesToAttend, setClassesToAttend] = useState<number>(0);
  const [canBeHelped, setCanBeHelped] = useState<boolean>(false);
  
  // Calculate current attendance
  const calculateAttendance = () => {
    if (totalClasses === 0) return 0;
    return (attendedClasses / totalClasses) * 100;
  };
  
  // Calculate the projected attendance after remaining classes
  const calculateProjectedAttendance = () => {
    const totalFutureClasses = totalClasses + remainingClasses;
    const totalFutureAttendance = attendedClasses + plannedAttendance;
    
    if (totalFutureClasses === 0) return 0;
    return (totalFutureAttendance / totalFutureClasses) * 100;
  };
  
  // Calculate how many classes needed to attend to reach 75%
  const calculateClassesNeeded = () => {
    const threshold = 0.75; // 75%
    const totalFutureClasses = totalClasses + remainingClasses;
    
    // Calculate how many classes student needs to attend to reach 75%
    // Formula: (attendedClasses + x) / (totalClasses + remainingClasses) >= 0.75
    // Solve for x: x >= 0.75 * (totalClasses + remainingClasses) - attendedClasses
    
    const classesNeeded = Math.ceil(threshold * totalFutureClasses - attendedClasses);
    
    // If classesNeeded is negative, student already meets the threshold
    return Math.max(0, classesNeeded);
  };
  
  // Calculate remedial classes needed
  const calculateRemedialClassesNeeded = () => {
    const threshold = 0.75; // 75%
    const totalFutureClasses = totalClasses + remainingClasses;
    const maxPossibleAttendance = attendedClasses + remainingClasses;
    
    // If it's impossible to reach 75% even with perfect attendance
    if ((maxPossibleAttendance / totalFutureClasses) < threshold) {
      // Calculate how many extra classes needed
      const totalNeeded = Math.ceil(threshold * totalFutureClasses);
      const extraClassesNeeded = totalNeeded - maxPossibleAttendance;
      setCanBeHelped(true);
      return extraClassesNeeded;
    }
    
    setCanBeHelped(false);
    return 0;
  };
  
  const handleCalculate = () => {
    if (totalClasses <= 0 || attendedClasses < 0 || remainingClasses < 0) {
      return;
    }
    
    // Set initial planned attendance to the calculated number of classes needed
    const needed = calculateClassesNeeded();
    const remedialNeeded = calculateRemedialClassesNeeded();
    
    setPlannedAttendance(Math.min(needed, remainingClasses));
    setCurrentAttendance(calculateAttendance());
    setProjectedAttendance(calculateProjectedAttendance());
    setClassesToAttend(needed);
    setRemedialClasses(remedialNeeded);
    setIsCalculated(true);
  };
  
  // Update projected attendance when planned attendance changes
  const handlePlannedAttendanceChange = (value: number) => {
    setPlannedAttendance(value);
    setProjectedAttendance(calculateProjectedAttendance());
  };
  
  // Determine if student is at risk of debarment
  const isAtRisk = currentAttendance < 75;
  
  // Determine if there's a chance to avoid debarment
  const canAvoidDebarment = classesToAttend <= remainingClasses;
  
  return (
    <Card className="max-w-xl mx-auto shadow-lg border-opacity-50 overflow-hidden bg-card">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Attendance Calculator</CardTitle>
        </div>
        <CardDescription className="mt-2 text-balance">
          Calculate your current attendance and check if you're at risk of debarment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <InputFields 
            totalClasses={totalClasses}
            attendedClasses={attendedClasses}
            remainingClasses={remainingClasses}
            onTotalClassesChange={setTotalClasses}
            onAttendedClassesChange={setAttendedClasses}
            onRemainingClassesChange={setRemainingClasses}
          />
          
          <Button
            onClick={handleCalculate}
            className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all"
            disabled={totalClasses <= 0}
          >
            <span className="relative z-10 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4" />
              Calculate Attendance Status
            </span>
          </Button>
        </div>
        
        {isCalculated && (
          <div className="space-y-6 animate-fade-in">
            <AttendanceStatusAlert 
              isAtRisk={isAtRisk} 
              currentAttendance={currentAttendance} 
            />
            
            <CurrentAttendanceDisplay currentAttendance={currentAttendance} />
            
            {isAtRisk && (
              <div className="space-y-6">
                <ClassesNeededInfo 
                  canAvoidDebarment={canAvoidDebarment}
                  classesToAttend={classesToAttend}
                  remainingClasses={remainingClasses}
                />
                
                {canAvoidDebarment && (
                  <AttendancePlanner 
                    remainingClasses={remainingClasses}
                    initialPlannedAttendance={plannedAttendance}
                    projectedAttendance={projectedAttendance}
                    onPlannedAttendanceChange={handlePlannedAttendanceChange}
                  />
                )}
                
                {/* Remedial Classes Section */}
                {!canAvoidDebarment && remedialClasses > 0 && (
                  <RemedialClassesInfo 
                    remedialClasses={remedialClasses}
                    remainingClasses={remainingClasses}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="text-center text-sm text-muted-foreground max-w-md">
          <p>University policy requires a minimum attendance of 75% to be eligible for examinations.</p>
        </div>
      </CardFooter>
    </Card>
  );
};
