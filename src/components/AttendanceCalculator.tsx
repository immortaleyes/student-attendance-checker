
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, CalendarCheck, Sliders } from "lucide-react";

// Import the refactored components
import { InputFields } from "./attendance/InputFields";
import { AttendanceStatusAlert } from "./attendance/AttendanceStatusAlert";
import { CurrentAttendanceDisplay } from "./attendance/CurrentAttendanceDisplay";
import { ClassesNeededInfo } from "./attendance/ClassesNeededInfo";
import { AttendancePlanner } from "./attendance/AttendancePlanner";
import { RemedialClassesInfo } from "./attendance/RemedialClassesInfo";
import { ThresholdSlider } from "./attendance/ThresholdSlider";

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
  const [threshold, setThreshold] = useState<number>(75);
  
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
  
  // Calculate how many classes needed to attend to reach threshold%
  const calculateClassesNeeded = () => {
    const thresholdDecimal = threshold / 100; // Convert to decimal
    const totalFutureClasses = totalClasses + remainingClasses;
    
    // Calculate how many classes student needs to attend to reach threshold%
    // Formula: (attendedClasses + x) / (totalClasses + remainingClasses) >= threshold
    // Solve for x: x >= threshold * (totalClasses + remainingClasses) - attendedClasses
    
    const classesNeeded = Math.ceil(thresholdDecimal * totalFutureClasses - attendedClasses);
    
    // If classesNeeded is negative, student already meets the threshold
    return Math.max(0, classesNeeded);
  };
  
  // Calculate remedial classes needed
  const calculateRemedialClassesNeeded = () => {
    const thresholdDecimal = threshold / 100; // Convert to decimal
    const totalFutureClasses = totalClasses + remainingClasses;
    const maxPossibleAttendance = attendedClasses + remainingClasses;
    
    // If it's impossible to reach threshold% even with perfect attendance
    if ((maxPossibleAttendance / totalFutureClasses) < thresholdDecimal) {
      // Calculate how many extra classes needed
      const totalNeeded = Math.ceil(thresholdDecimal * totalFutureClasses);
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
  
  // Handle threshold change
  const handleThresholdChange = (value: number) => {
    setThreshold(value);
    if (isCalculated) {
      // Recalculate everything when threshold changes
      const needed = calculateClassesNeeded();
      const remedialNeeded = calculateRemedialClassesNeeded();
      setPlannedAttendance(Math.min(needed, remainingClasses));
      setClassesToAttend(needed);
      setRemedialClasses(remedialNeeded);
      setProjectedAttendance(calculateProjectedAttendance());
    }
  };
  
  // Determine if student is at risk of debarment
  const isAtRisk = currentAttendance < threshold;
  
  // Determine if there's a chance to avoid debarment
  const canAvoidDebarment = classesToAttend <= remainingClasses;
  
  return (
    <Card className="w-full shadow-lg border-opacity-50 overflow-hidden bg-card">
      <CardHeader className="bg-gradient-to-r from-primary/15 to-primary/5 border-b">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold">Attendance Calculator</CardTitle>
        </div>
        <CardDescription className="mt-2 text-balance text-base">
          Calculate your current attendance and check if you're at risk of debarment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-5">
          <ThresholdSlider 
            threshold={threshold}
            onThresholdChange={handleThresholdChange}
          />

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
            className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all text-lg py-6"
            disabled={totalClasses <= 0}
          >
            <span className="relative z-10 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5" />
              Calculate Attendance Status
            </span>
          </Button>
        </div>
        
        {isCalculated && (
          <div className="space-y-6 animate-fade-in">
            <AttendanceStatusAlert 
              isAtRisk={isAtRisk} 
              currentAttendance={currentAttendance}
              threshold={threshold}
            />
            
            <CurrentAttendanceDisplay 
              currentAttendance={currentAttendance} 
              threshold={threshold} 
            />
            
            {isAtRisk && (
              <div className="space-y-6">
                <ClassesNeededInfo 
                  canAvoidDebarment={canAvoidDebarment}
                  classesToAttend={classesToAttend}
                  remainingClasses={remainingClasses}
                  threshold={threshold}
                />
                
                {canAvoidDebarment && (
                  <AttendancePlanner 
                    remainingClasses={remainingClasses}
                    initialPlannedAttendance={plannedAttendance}
                    projectedAttendance={projectedAttendance}
                    onPlannedAttendanceChange={handlePlannedAttendanceChange}
                    threshold={threshold}
                  />
                )}
                
                {/* Remedial Classes Section */}
                {!canAvoidDebarment && remedialClasses > 0 && (
                  <RemedialClassesInfo 
                    remedialClasses={remedialClasses}
                    remainingClasses={remainingClasses}
                    threshold={threshold}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-6 bg-gradient-to-r from-primary/10 to-primary/15">
        <div className="text-center text-md text-muted-foreground max-w-md font-medium">
          <p>University policy requires a minimum attendance of {threshold}% to be eligible for examinations.</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} - Designed & Developed by Ajay Shriram Kushwaha</p>
        </div>
      </CardFooter>
    </Card>
  );
};
