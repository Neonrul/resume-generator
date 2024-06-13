import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TFormPages, TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { FormStepProgress } from '../../features/FormStepProgress/FormStepProgress.tsx';
import useAppContext from '../../context/useAppContext.tsx';

export const Navbar: FC = () => {
  const location = useLocation();
  const state = location?.state ? (location.state as { isPreview?: boolean }) : {};
  const match = useMatch('/:mainRoute/:formRoute');
  const formRoute = match?.params?.formRoute as TFormPages;
  const mainRoute = match?.params?.mainRoute as TPages;
  const isMainPage = mainRoute === TPages.MAIN;
  const isFormPage = mainRoute === TPages.FORM;
  const isPreviewPage = mainRoute === TPages.PREVIEW;
  const isNewFormPage = formRoute === TFormPages.NEW;
  const navigate = useNavigate();
  const { formSteps } = useAppContext();

  return (
    <section className={styles.Navbar}>
      <section className={styles.Navbar_leftSection}>
        {!isMainPage && <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>}
      </section>

      {isFormPage && !isNewFormPage ? (
        <FormStepProgress steps={formSteps} currentStep={formRoute} />
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
