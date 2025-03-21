
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, BookOpen, Info } from "lucide-react";

interface RemedialClassesInfoProps {
  remedialClasses: number;
  remainingClasses: number;
}

export const RemedialClassesInfo = ({ remedialClasses, remainingClasses }: RemedialClassesInfoProps) => {
  return (
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
  );
};
