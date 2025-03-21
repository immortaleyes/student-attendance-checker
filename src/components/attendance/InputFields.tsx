
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
          onChange={(e) => onTotalClassesChange(parseInt(e.target.value) || 0)}
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
            onAttendedClassesChange(Math.min(value, totalClasses));
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
          onChange={(e) => onRemainingClassesChange(parseInt(e.target.value) || 0)}
          placeholder="e.g., 10"
          className="transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};
