
import { Header } from "@/components/Header";
import { AttendanceCalculator } from "@/components/AttendanceCalculator";

const Index = () => {
  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto min-h-screen flex flex-col">
      <Header 
        title="Student Attendance Calculator" 
        subtitle="Check your current attendance status and find out if you're at risk of being debarred from examinations."
      />
      
      <div className="mt-8 flex-grow">
        <AttendanceCalculator />
      </div>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground pb-4">
        <p>© {new Date().getFullYear()} - Designed & Developed by Ajay Shriram Kushwaha</p>
      </footer>
    </div>
  );
};

export default Index;
