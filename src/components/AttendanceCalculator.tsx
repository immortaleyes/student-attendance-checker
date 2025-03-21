
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  Clock, 
  CalendarCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="totalClasses" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Total Classes Held
              </Label>
              <Input
                id="totalClasses"
                type="number"
                min="0"
                value={totalClasses || ''}
                onChange={(e) => setTotalClasses(parseInt(e.target.value) || 0)}
                placeholder="e.g., 40"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attendedClasses" className="flex items-center gap-1.5">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                Classes Attended
              </Label>
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
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remainingClasses" className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Remaining Classes
              </Label>
              <Input
                id="remainingClasses"
                type="number"
                min="0"
                value={remainingClasses || ''}
                onChange={(e) => setRemainingClasses(parseInt(e.target.value) || 0)}
                placeholder="e.g., 10"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
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
            
            {isAtRisk && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg glass">
                  <h3 className="font-medium mb-2 flex items-center gap-2 text-primary">
                    <Info className="h-4 w-4" />
                    Classes Needed
                  </h3>
                  
                  {canAvoidDebarment ? (
                    <p className="text-sm">
                      You need to attend <strong className="text-primary font-semibold">{classesToAttend}</strong> out 
                      of the <strong>{remainingClasses}</strong> remaining classes to avoid debarment.
                    </p>
                  ) : (
                    <div>
                      <p className="text-sm text-danger mb-2">
                        Unfortunately, even if you attend all remaining {remainingClasses} classes, 
                        you will not be able to reach the 75% attendance threshold.
                      </p>
                      <p className="text-sm">
                        <strong>See the remedial classes section below for possible solutions.</strong>
                      </p>
                    </div>
                  )}
                </div>
                
                {canAvoidDebarment && (
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
                        onValueChange={(value) => setPlannedAttendance(value[0])}
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
                )}
                
                {/* Remedial Classes Section */}
                {!canAvoidDebarment && remedialClasses > 0 && (
                  <div className="mt-6 p-5 border-2 border-info/20 rounded-lg bg-info/5 space-y-4">
                    <h3 className="font-medium flex items-center gap-2 text-info">
                      <BookOpen className="h-4 w-4" />
                      Remedial Classes Option
                    </h3>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>You need remedial classes</AlertTitle>
                      <AlertDescription>
                        Regular attendance alone won't be enough to avoid debarment.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="bg-background p-4 rounded-md border">
                      <p className="text-sm mb-3">
                        You will need to attend <strong className="text-info font-semibold">{remedialClasses} remedial classes</strong> in 
                        addition to all your remaining {remainingClasses} regular classes to reach the 75% threshold.
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm mt-4 text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <p>Consult with your department about remedial class options.</p>
                      </div>
                    </div>
                  </div>
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
