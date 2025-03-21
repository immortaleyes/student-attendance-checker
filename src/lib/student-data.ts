
import { StudentData } from "@/components/StudentCard";

// Mock student data for the application
export const mockStudents: StudentData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    rollNumber: "CS2201",
    course: "Computer Science",
    totalClasses: 45,
    attendedClasses: 38,
    threshold: 0.75 // 75%
  },
  {
    id: "2",
    name: "Sarah Williams",
    rollNumber: "CS2202",
    course: "Computer Science",
    totalClasses: 45,
    attendedClasses: 30,
    threshold: 0.75
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    rollNumber: "CS2203",
    course: "Computer Science",
    totalClasses: 45,
    attendedClasses: 20,
    threshold: 0.75
  },
  {
    id: "4",
    name: "Priya Patel",
    rollNumber: "EE2201",
    course: "Electrical Engineering",
    totalClasses: 40,
    attendedClasses: 37,
    threshold: 0.75
  },
  {
    id: "5",
    name: "David Chen",
    rollNumber: "EE2202",
    course: "Electrical Engineering",
    totalClasses: 40,
    attendedClasses: 28,
    threshold: 0.75
  },
  {
    id: "6",
    name: "Emma Wilson",
    rollNumber: "ME2201",
    course: "Mechanical Engineering",
    totalClasses: 42,
    attendedClasses: 32,
    threshold: 0.75
  },
  {
    id: "7",
    name: "James Smith",
    rollNumber: "ME2202",
    course: "Mechanical Engineering",
    totalClasses: 42,
    attendedClasses: 26,
    threshold: 0.75
  },
  {
    id: "8",
    name: "Olivia Davis",
    rollNumber: "BT2201",
    course: "Biotechnology",
    totalClasses: 38,
    attendedClasses: 36,
    threshold: 0.75
  },
  {
    id: "9",
    name: "Ethan Brown",
    rollNumber: "BT2202",
    course: "Biotechnology",
    totalClasses: 38,
    attendedClasses: 21,
    threshold: 0.75
  },
  {
    id: "10",
    name: "Sophia Miller",
    rollNumber: "CH2201",
    course: "Chemistry",
    totalClasses: 40,
    attendedClasses: 31,
    threshold: 0.75
  }
];

// Helper to filter students based on search query
export const filterStudents = (students: StudentData[], query: string): StudentData[] => {
  if (!query.trim()) return students;
  
  const lowerCaseQuery = query.toLowerCase().trim();
  
  return students.filter(student => 
    student.name.toLowerCase().includes(lowerCaseQuery) ||
    student.rollNumber.toLowerCase().includes(lowerCaseQuery)
  );
};

// Helper to get student attendance status
export const getAttendanceStatus = (student: StudentData) => {
  const percentage = (student.attendedClasses / student.totalClasses) * 100;
  
  if (percentage >= 75) {
    return {
      status: "Safe",
      colorClass: "text-safe",
      bgClass: "bg-safe/10",
      icon: "check-circle"
    };
  } else if (percentage >= 65) {
    return {
      status: "Warning",
      colorClass: "text-warning",
      bgClass: "bg-warning/10",
      icon: "alert-triangle"
    };
  } else {
    return {
      status: "At Risk",
      colorClass: "text-danger",
      bgClass: "bg-danger/10",
      icon: "alert-circle"
    };
  }
};

// Helper to calculate if a student will be debarred
export const checkDebarredStatus = (student: StudentData) => {
  const attendancePercentage = (student.attendedClasses / student.totalClasses) * 100;
  const thresholdPercentage = student.threshold * 100;
  
  return {
    isDebarred: attendancePercentage < thresholdPercentage,
    attendancePercentage: Math.round(attendancePercentage),
    thresholdPercentage
  };
};
