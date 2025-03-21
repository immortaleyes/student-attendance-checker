
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const AttendanceCalculator = () => {
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [attendedClasses, setAttendedClasses] = useState<number>(0);
  const [remainingClasses, setRemainingClasses] = useState<number>(0);
  const [plannedAttendance, setPlannedAttendance] = useState<number>(0);
  const [currentAttendance, setCurrentAttendance] = useState<number>(0);
  const [projectedAttendance, setProjectedAttendance] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [classesToAttend, setClassesToAttend] = useState<number>(0);
  
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
  
  const handleCalculate = () => {
    if (totalClasses <= 0 || attendedClasses < 0 || remainingClasses < 0) {
      return;
    }
    
    // Set initial planned attendance to the calculated number of classes needed
    const needed = calculateClassesNeeded();
    setPlannedAttendance(Math.min(needed, remainingClasses));
    setCurrentAttendance(calculateAttendance());
    setProjectedAttendance(calculateProjectedAttendance());
    setClassesToAttend(needed);
    setIsCalculated(true);
  };
  
  // Update projected attendance when planned attendance changes
  useEffect(() => {
    if (isCalculated) {
      setProjectedAttendance(calculateProjectedAttendance());
    }
  }, [plannedAttendance]);
  
  // Determine if student is at risk of debarment
  const isAtRisk = currentAttendance < 75;
  
  // Determine if there's a chance to avoid debarment
  const canAvoidDebarment = classesToAttend <= remainingClasses;
  
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Student Attendance Calculator</CardTitle>
        <CardDescription>
          Calculate your current attendance percentage and check if you're at risk of debarment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="totalClasses">Total Classes Held</Label>
              <Input
                id="totalClasses"
                type="number"
                min="0"
                value={totalClasses || ''}
                onChange={(e) => setTotalClasses(parseInt(e.target.value) || 0)}
                placeholder="e.g., 40"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attendedClasses">Classes Attended</Label>
              <Input
                id="attendedClasses"
                type="number"
                min="0"
                max={totalClasses}
                value={attendedClasses || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setAttendedClasses(Math.min(value, totalClasses));
                }}
                placeholder="e.g., 30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remainingClasses">Remaining Classes</Label>
              <Input
                id="remainingClasses"
                type="number"
                min="0"
                value={remainingClasses || ''}
                onChange={(e) => setRemainingClasses(parseInt(e.target.value) || 0)}
                placeholder="e.g., 10"
              />
            </div>
          </div>
          
          <Button
            onClick={handleCalculate}
            className="w-full"
            disabled={totalClasses <= 0}
          >
            Calculate
          </Button>
        </div>
        
        {isCalculated && (
          <div className="space-y-6 animate-fade-in">
            <div className={cn(
              "p-4 rounded-lg border",
              isAtRisk ? "bg-danger/10 border-danger/20" : "bg-safe/10 border-safe/20"
            )}>
              <div className="flex items-start gap-3">
                {isAtRisk ? (
                  <AlertCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-safe shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {isAtRisk ? "You're at risk of debarment" : "You're in good standing"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current attendance: <span className="font-medium">{currentAttendance.toFixed(2)}%</span> 
                    {isAtRisk && " (below 75% threshold)"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Current Attendance</Label>
                <span className={cn(
                  "text-sm font-medium",
                  currentAttendance >= 75 ? "text-safe" : "text-danger"
                )}>
                  {currentAttendance.toFixed(2)}%
                </span>
              </div>
              <Progress 
                value={currentAttendance} 
                max={100} 
                className={currentAttendance >= 75 ? "bg-safe/20" : "bg-danger/20"}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="px-1 py-0.5 rounded-sm bg-foreground/10">
                  Threshold: 75%
                </span>
                <span>100%</span>
              </div>
            </div>
            
            {isAtRisk && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-background border">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    Classes Needed
                  </h3>
                  
                  {canAvoidDebarment ? (
                    <p>
                      You need to attend <strong className="text-foreground">{classesToAttend}</strong> out 
                      of the <strong>{remainingClasses}</strong> remaining classes to avoid debarment.
                    </p>
                  ) : (
                    <p className="text-danger">
                      Unfortunately, even if you attend all remaining {remainingClasses} classes, 
                      you will not be able to reach the 75% attendance threshold.
                    </p>
                  )}
                </div>
                
                {canAvoidDebarment && (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">
                        Plan to attend {plannedAttendance} out of {remainingClasses} remaining classes
                      </Label>
                      <Slider
                        value={[plannedAttendance]}
                        min={0}
                        max={remainingClasses}
                        step={1}
                        onValueChange={(value) => setPlannedAttendance(value[0])}
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
                          "text-sm font-medium",
                          projectedAttendance >= 75 ? "text-safe" : "text-danger"
                        )}>
                          {projectedAttendance.toFixed(2)}%
                        </span>
                      </div>
                      <Progress 
                        value={projectedAttendance} 
                        max={100} 
                        className={projectedAttendance >= 75 ? "bg-safe/20" : "bg-danger/20"}
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
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-6">
        <div className="text-center text-sm text-muted-foreground max-w-md">
          <p>University policy requires a minimum attendance of 75% to be eligible for examinations.</p>
        </div>
      </CardFooter>
    </Card>
  );
};
