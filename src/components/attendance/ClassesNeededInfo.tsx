
import { Info } from "lucide-react";

interface ClassesNeededInfoProps {
  canAvoidDebarment: boolean;
  classesToAttend: number;
  remainingClasses: number;
}

export const ClassesNeededInfo = ({ canAvoidDebarment, classesToAttend, remainingClasses }: ClassesNeededInfoProps) => {
  return (
    <div className="p-4 rounded-lg glass">
      <h3 className="font-medium mb-2 flex items-center gap-2 text-primary">
        <Info className="h-4 w-4" />
        Classes Needed
      </h3>
      
      {canAvoidDebarment ? (
        <p className="text-sm">
          You need to attend <strong className="text-primary font-semibold">{classesToAttend}</strong> out 
          of the <strong>{remainingClasses}</strong> remaining classes to avoid debarment.
        </p>
      ) : (
        <div>
          <p className="text-sm text-danger mb-2">
            Unfortunately, even if you attend all remaining {remainingClasses} classes, 
            you will not be able to reach the 75% attendance threshold.
          </p>
          <p className="text-sm">
            <strong>See the remedial classes section below for possible solutions.</strong>
          </p>
        </div>
      )}
    </div>
  );
};
