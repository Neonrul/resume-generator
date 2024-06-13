import { FC } from 'react';
import styles from './FormStepProgress.module.scss';
import cn from 'classnames';
import { IFormStep } from '../../types/formTypes.ts';
import { TFormPages } from '../../types/TPages.ts';

interface IFormStepProgressProps {
  steps: IFormStep[];
  currentStep?: TFormPages;
}

export const FormStepProgress: FC<IFormStepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className={styles.FormProgress}>
      {steps.map(step => (
        <div key={step.id} className={styles.FormProgress_step}>
          <div
            className={cn(
              styles.FormProgress_circle,
              step.id === currentStep && styles.current,
              step.complete && styles.complete
            )}
          ></div>
          {step.number < steps.length && (
            <div className={cn(styles.FormProgress_line, step.complete && styles.complete)}></div>
          )}
        </div>
      ))}
    </div>
  );
};
