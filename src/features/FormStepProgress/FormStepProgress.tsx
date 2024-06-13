import { FC } from 'react';
import styles from './FormStepProgress.module.scss';
import cn from 'classnames';
import { IFormStepsState } from '../../reducers/formStepsReducer/formStepsReducer.ts';

type TFormStepProgressProps = IFormStepsState;

export const FormStepProgress: FC<TFormStepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className={styles.FormProgress}>
      {steps.map(step => (
        <div key={step.id} className={styles.FormProgress_step}>
          <div
            className={cn(
              styles.FormProgress_circle,
              step.number === currentStep && styles.current,
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
