import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TFormPages, TPages } from '../../types/TPages.ts';
import styles from './MainPage.module.scss';
import formPreview from '../../assets/images/formPreview.png';
import resumePreview from '../../assets/images/resumePreview.png';
import ChoiceSection from '../../components/ChoiceSection/ChoiceSection.tsx';

export const MainPage: FC = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.mainPage}>
      <section className={styles.mainPage_textSection}>
        <h2>Welcome to Resume Generator</h2>
        <p>Your tool for tool for quick and easy CV creation!</p>
      </section>
      <ChoiceSection
        firstChoice={{
          type: 'GraphicButton',
          onClick: () => navigate(TPages.PREVIEW, { state: { isPreview: true } }),
          label: 'See preview',
          image: resumePreview,
          descriptions: 'Review how CV will look like before you start creating yours',
        }}
        secondChoice={{
          type: 'GraphicButton',
          onClick: () => navigate(`${TPages.FORM}/${TFormPages.NEW}`),
          label: 'Go to form',
          image: formPreview,
          descriptions: 'Create a new resume or update an existing one',
        }}
      />
      <section className={styles.mainPage_textSection}>
        <h3>About the App:</h3>
        <p>
          Resume Generator - a user-friendly web app built with React and TypeScript. Fill out the form and get a
          template-based stylish resume instantly.
        </p>
        <p>
          <strong>Key Features:</strong>
        </p>
        <ul>
          <li>
            <strong>Resume Creation:</strong> Fill out the form, get a resume with just one click.
          </li>
          <li>
            <strong>Manual Save:</strong> Save the form data and continue editing or add new experience.
          </li>
          <li>
            <strong>Export to PDF:</strong> Export your finished resume to PDF.
          </li>
        </ul>
        <p>Start building your career with Resume Generator. Create your resume now!</p>
      </section>
    </section>
  );
};
