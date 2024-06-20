import { FC } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { IFormData } from '../../types/formTypes.ts';
import styles from './ResumeForm.module.scss';
import useAppContext from '../../context/useAppContext.tsx';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.tsx';
import arrowIcon from '../../assets/icons/arrow.svg';
import cn from 'classnames';
import { TFormPages, TPages } from '../../types/TPages.ts';

export const ResumeForm: FC = () => {
  const { submitResume, formSteps, completeStep, restartStep } = useAppContext();
  const { handleSubmit } = useFormContext<IFormData>();
  const navigate = useNavigate();
  const match = useMatch('/form/:formRoute');
  const formRoute = match?.params?.formRoute as TFormPages;
  const currentStep = formSteps.find(step => step.id === formRoute);

  const goToNextForm = () => {
    if (currentStep) completeStep(currentStep.id);
    const nextStep = formSteps.find(step => step.number === Number(currentStep?.number) + 1);
    if (nextStep) {
      navigate(`/${TPages.FORM}/${nextStep.id}`);
    }
  };

  const goToPreviousForm = () => {
    if (currentStep) restartStep(currentStep.id);
    const prevStep = formSteps.find(step => step.number === Number(currentStep?.number) - 1);
    if (prevStep) {
      navigate(`/${TPages.FORM}/${prevStep.id}`);
    }
  };

  const onSubmit: SubmitHandler<IFormData> = async data => {
    await submitResume(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resumeForm}>
      <Button className={styles.resumeForm_button} onClick={() => goToPreviousForm()}>
        <img className={styles.icon} src={arrowIcon} alt={'left arrow icon'} />
      </Button>
      <Outlet />
      <Button className={styles.resumeForm_button} onClick={() => goToNextForm()}>
        <img className={cn(styles.icon, styles.right)} src={arrowIcon} alt={'left arrow icon'} />
      </Button>
    </form>
  );
};
