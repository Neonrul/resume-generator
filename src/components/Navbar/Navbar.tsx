import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TFormPages, TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { FormStepProgress } from '../../features/FormStepProgress/FormStepProgress.tsx';
import { initialFormSteps } from '../../constants/formConstants.ts';

export const Navbar: FC = () => {
  const location = useLocation();
  const state = location?.state ? (location.state as { isPreview?: boolean }) : {};
  const match = useMatch('/:mainRoute/:formRoute');
  const isMainPage = (match?.params?.mainRoute as TPages) === TPages.MAIN;
  const isFormPage = (match?.params?.mainRoute as TPages) === TPages.FORM;
  const isPreviewPage = (match?.params?.mainRoute as TPages) === TPages.PREVIEW;
  const isNewFormPage = (match?.params?.formRoute as TFormPages) === TFormPages.NEW;
  const navigate = useNavigate();

  return (
    <section className={styles.Navbar}>
      <section className={styles.Navbar_leftSection}>
        {!isMainPage && <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>}
      </section>

      {isFormPage && !isNewFormPage ? (
        <FormStepProgress steps={initialFormSteps} currentStep={3} />
      ) : (
        <p className={styles.Navbar_text}>Resume Generator</p>
      )}

      <section className={styles.Navbar_rightSection}>
        {isFormPage && <Button onClick={() => navigate(TPages.PREVIEW)}>Go to Preview</Button>}
        {isPreviewPage && !state?.isPreview && <Button onClick={() => navigate(TPages.FORM)}>Edit Resume</Button>}
      </section>
    </section>
  );
};
