
import { Info } from "lucide-react";

interface ClassesNeededInfoProps {
  canAvoidDebarment: boolean;
  classesToAttend: number;
  remainingClasses: number;
  threshold: number;
}

export const ClassesNeededInfo = ({ canAvoidDebarment, classesToAttend, remainingClasses, threshold }: ClassesNeededInfoProps) => {
  return (
    <div className="p-5 rounded-lg glass border-2 border-primary/10">
      <h3 className="font-medium mb-3 flex items-center gap-2 text-primary text-lg">
        <Info className="h-5 w-5" />
        Classes Needed
      </h3>
      
      {canAvoidDebarment ? (
        <p className="text-md">
          You need to attend <strong className="text-primary font-semibold text-lg">{classesToAttend}</strong> out 
          of the <strong>{remainingClasses}</strong> remaining classes to avoid debarment.
        </p>
      ) : (
        <div>
          <p className="text-md text-danger mb-3">
            Unfortunately, even if you attend all remaining {remainingClasses} classes, 
            you will not be able to reach the {threshold}% attendance threshold.
          </p>
          <p className="text-md font-medium">
            <strong>See the remedial classes section below for possible solutions.</strong>
          </p>
        </div>
      )}
    </div>
  );
};
