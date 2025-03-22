
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookOpen, UserCheck, Clock } from "lucide-react";

interface InputFieldsProps {
  totalClasses: number;
  attendedClasses: number;
  remainingClasses: number;
  onTotalClassesChange: (value: number) => void;
  onAttendedClassesChange: (value: number) => void;
  onRemainingClassesChange: (value: number) => void;
}

export const InputFields = ({
  totalClasses,
  attendedClasses,
  remainingClasses,
  onTotalClassesChange,
  onAttendedClassesChange,
  onRemainingClassesChange
}: InputFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 p-4 border-2 border-primary/10 rounded-lg bg-background">
      <div className="space-y-2">
        <Label htmlFor="totalClasses" className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          Total Classes Held
        </Label>
        <Input
          id="totalClasses"
          type="number"
          min="0"
          value={totalClasses || ''}
          onChange={(e) => onTotalClassesChange(parseInt(e.target.value) || 0)}
          placeholder="e.g., 40"
          className="transition-all focus:ring-2 focus:ring-primary/20 text-lg py-6 font-medium"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="attendedClasses" className="flex items-center gap-2 text-lg">
          <UserCheck className="h-5 w-5 text-primary" />
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
            onAttendedClassesChange(Math.min(value, totalClasses));
          }}
          placeholder="e.g., 30"
          className="transition-all focus:ring-2 focus:ring-primary/20 text-lg py-6 font-medium"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="remainingClasses" className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Remaining Classes
        </Label>
        <Input
          id="remainingClasses"
          type="number"
          min="0"
          value={remainingClasses || ''}
          onChange={(e) => onRemainingClassesChange(parseInt(e.target.value) || 0)}
          placeholder="e.g., 10"
          className="transition-all focus:ring-2 focus:ring-primary/20 text-lg py-6 font-medium"
        />
      </div>
    </div>
  );
};
