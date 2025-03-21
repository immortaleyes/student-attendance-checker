
import { Header } from "@/components/Header";
import { AttendanceCalculator } from "@/components/AttendanceCalculator";

const Index = () => {
  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto min-h-screen">
      <Header 
        title="Student Attendance Calculator" 
        subtitle="Check your current attendance status and find out if you're at risk of being debarred from examinations."
      />
      
      <div className="mt-8">
        <AttendanceCalculator />
      </div>
    </div>
  );
};

export default Index;
