import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import 'react-datetime/css/react-datetime.css';
import { AppContextProvider } from './context/AppContextProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import { TFormPages, TPages } from './types/TPages.ts';
import { MainPage } from './pages/Main/MainPage.tsx';
import { FormPage } from './pages/FormPage/FormPage.tsx';
import { ResumePreviewPage } from './pages/ResumePreviewPage/ResumePreviewPage.tsx';
import { getRouter } from './utils/getRouter.ts';
import { routerEnvironmentMap } from './constants/environmentMaps.ts';
import { PersonalInfoForm } from './features/ResumeForm/components/PersonalInfoForm/PersonalInfoForm.tsx';
import { ContactsForm } from './features/ResumeForm/components/ContactsForm/ContactsForm.tsx';
import { EducationForm } from './features/ResumeForm/components/EducationForm/EducationForm.tsx';
import { ExperienceForm } from './features/ResumeForm/components/ExperienceForm/ExperienceForm.tsx';
import { InterestsForm } from './features/ResumeForm/components/InterestsForm/InterestsForm.tsx';
import { SkillForm } from './features/ResumeForm/components/SkillForm/SkillForm.tsx';
import { NewForm } from './features/ResumeForm/components/NewForm/NewForm.tsx';

const environment = process.env.DEPLOY_ENVIRONMENT ?? process.env.NODE_ENV;
const routerType = environment ? routerEnvironmentMap[environment] : undefined;
const createRouter = getRouter(routerType);

const router = createRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: TPages.MAIN,
        element: <MainPage />,
      },
      {
        path: TPages.FORM,
        element: <FormPage />,
        children: [
          {
            path: TFormPages.NEW,
            element: <NewForm />,
          },
          {
            path: TFormPages.PERSONAL,
            element: <PersonalInfoForm />,
          },
          {
            path: TFormPages.CONTACTS,
            element: <ContactsForm />,
          },
          {
            path: TFormPages.EXPERIENCE,
            element: <ExperienceForm />,
          },
          {
            path: TFormPages.EDUCATION,
            element: <EducationForm />,
          },
          {
            path: TFormPages.INTERESTS,
            element: <InterestsForm />,
          },
          {
            path: TFormPages.SKILLS,
            element: <SkillForm />,
          },
        ],
      },
      {
        path: TPages.PREVIEW,
        element: <ResumePreviewPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
