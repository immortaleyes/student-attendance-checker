
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, BookOpen, Info } from "lucide-react";

interface RemedialClassesInfoProps {
  remedialClasses: number;
  remainingClasses: number;
  threshold: number;
}

export const RemedialClassesInfo = ({ remedialClasses, remainingClasses, threshold }: RemedialClassesInfoProps) => {
  return (
    <div className="mt-6 p-5 border-2 border-info/20 rounded-lg bg-info/5 space-y-4">
      <h3 className="font-medium flex items-center gap-2 text-info text-lg">
        <BookOpen className="h-5 w-5" />
        Remedial Classes Option
      </h3>
      
      <Alert className="border-2 border-danger/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg">You need remedial classes</AlertTitle>
        <AlertDescription className="text-md">
          Regular attendance alone won't be enough to avoid debarment.
        </AlertDescription>
      </Alert>
      
      <div className="bg-background p-5 rounded-md border-2 border-info/20">
        <p className="text-md mb-4">
          You will need to attend <strong className="text-info font-semibold text-lg">{remedialClasses} remedial classes</strong> in 
          addition to all your remaining {remainingClasses} regular classes to reach the {threshold}% threshold.
        </p>
        
        <div className="flex items-center gap-2 text-md mt-4 text-muted-foreground">
          <Info className="h-5 w-5" />
          <p>Consult with your department about remedial class options.</p>
        </div>
      </div>
    </div>
  );
};
