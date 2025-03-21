
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { StudentSearch } from "@/components/StudentSearch";
import { StudentCard, StudentData } from "@/components/StudentCard";
import { StudentDetails } from "@/components/StudentDetails";
import { EmptyState } from "@/components/EmptyState";
import { mockStudents, filterStudents } from "@/lib/student-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>(mockStudents);
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update filtered students when search query or tab changes
  useEffect(() => {
    let result = filterStudents(mockStudents, searchQuery);
    
    if (currentTab === "at-risk") {
      result = result.filter(student => 
        (student.attendedClasses / student.totalClasses) * 100 < 75
      );
    } else if (currentTab === "good") {
      result = result.filter(student => 
        (student.attendedClasses / student.totalClasses) * 100 >= 75
      );
    }
    
    setFilteredStudents(result);
  }, [searchQuery, currentTab]);
  
  const handleViewDetails = (student: StudentData) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };
  
  const getStatusCounts = () => {
    const atRiskCount = mockStudents.filter(s => 
      (s.attendedClasses / s.totalClasses) * 100 < s.threshold * 100
    ).length;
    
    const goodCount = mockStudents.length - atRiskCount;
    
    return { atRiskCount, goodCount };
  };
  
  const { atRiskCount, goodCount } = getStatusCounts();
  
  return (
    <div className="container max-w-7xl px-4 py-12 mx-auto min-h-screen">
      <Header 
        title="Student Debarment Status" 
        subtitle="Check and monitor students' attendance status and risk of debarment from examinations."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
        <div className={cn(
          "col-span-3 md:col-span-1 p-6 rounded-xl border transition-all duration-500",
          "bg-gradient-to-br from-background to-card"
        )}>
          <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background border">
              <p className="text-sm text-muted-foreground mb-1">Total Students</p>
              <p className="text-2xl font-semibold">{mockStudents.length}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-safe/5 border border-safe/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Good Standing</p>
                  <p className="text-2xl font-semibold">{goodCount}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-safe" />
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-danger/5 border border-danger/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">At Risk</p>
                  <p className="text-2xl font-semibold">{atRiskCount}</p>
                </div>
                <AlertCircle className="h-5 w-5 text-danger" />
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-info/5 border border-info/20">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Attendance Policy</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Students need a minimum of 75% attendance to be eligible for examinations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-3 md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              onValueChange={setCurrentTab}
            >
              <TabsList className="grid w-full grid-cols-3 mb-2 sm:mb-0">
                <TabsTrigger value="all">
                  All
                </TabsTrigger>
                <TabsTrigger value="at-risk" className="flex items-center gap-1.5">
                  At Risk
                  {atRiskCount > 0 && (
                    <Badge variant="outline" className="ml-1 bg-danger/10 text-danger border-danger/20">
                      {atRiskCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="good">Good Standing</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <StudentSearch 
              onSearch={setSearchQuery} 
              className="w-full sm:w-auto sm:min-w-[300px]"
            />
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[1, 2, 3,
              4].map((i) => (
                <div key={i} className="h-72 rounded-xl bg-muted/50"></div>
              ))}
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {filteredStudents.map((student) => (
                <div 
                  key={student.id}
                  className="transition-all duration-500 animate-slide-up"
                  style={{
                    animationDelay: `${parseInt(student.id) * 50}ms`
                  }}
                >
                  <StudentCard 
                    student={student} 
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No students found"
              description={searchQuery ? "Try adjusting your search query or filters." : "There are no students to display."}
            />
          )}
        </div>
      </div>
      
      <StudentDetails 
        student={selectedStudent} 
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
