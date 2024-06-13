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
  const { submitResume } = useAppContext();
  const { handleSubmit } = useFormContext<IFormData>();
  const navigate = useNavigate();
  const match = useMatch('/form/:route');

  const formRoutes = Object.values(TFormPages);
  const currentIndex = formRoutes.indexOf(match?.params?.route as TFormPages);

  const goToNextForm = () => {
    if (currentIndex < formRoutes.length - 1) {
      navigate(`/${TPages.FORM}/${formRoutes[currentIndex + 1]}`);
    }
  };

  const goToPreviousForm = () => {
    if (currentIndex > 0) {
      navigate(`/${TPages.FORM}/${formRoutes[currentIndex - 1]}`);
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
