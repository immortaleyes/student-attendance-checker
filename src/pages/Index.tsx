
import { Header } from "@/components/Header";
import { AttendanceCalculator } from "@/components/AttendanceCalculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container max-w-6xl px-4 py-8 mx-auto flex flex-col flex-grow">
        <Header 
          title="Student Attendance Calculator" 
          subtitle="Check your current attendance status and find out if you're at risk of being debarred from examinations."
        />
        
        <div className="mt-8 flex-grow">
          <AttendanceCalculator />
        </div>
      </div>
      
      <footer className="py-6 bg-primary/5 border-t border-primary/10 text-center">
        <p className="text-muted-foreground font-medium">
          © {new Date().getFullYear()} - Designed & Developed by Ajay Shriram Kushwaha
        </p>
      </footer>
    </div>
  );
};

export default Index;
