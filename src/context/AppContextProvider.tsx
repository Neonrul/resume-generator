import { FC, PropsWithChildren, useCallback, useMemo, useReducer } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { initialFormData } from '../constants/formConstants.ts';
import { resumePreviewData } from '../constants/resumePreviewData.tsx';
import { convertToImageString } from '../utils/convertToImageString.ts';
import { AppAction, AppActionTypes, appReducer, IAppState } from './AppReducer.ts';
import {
  FormStepsAction,
  formStepsInitialState,
  formStepsReducer,
  IFormStepsState,
} from '../reducers/formStepsReducer/formStepsReducer.ts';
import { combineReducers } from '../store/combineReducers.ts';

const normalizeFormData: (data: IFormData) => Promise<TResumeData> = async data => {
  const { interests, experience, education, contacts, photoLink, dayOfBirth, city, languages, ...rest } = data;
  const parser = new DOMParser();
  return {
    ...rest,
    photoLink: await convertToImageString(photoLink.photo, { size: { width: 416, height: 300 }, crop: photoLink.crop }),
    info: [
      { type: 'dayOfBirth', value: dayOfBirth },
      { type: 'city', value: city },
      { type: 'languages', value: languages },
    ],
    experience: experience.map(exp => {
      const doc = parser.parseFromString(exp.description, 'text/html');
      const liElements = doc.querySelectorAll('li');
      liElements.forEach(li => {
        li.setAttribute('data-id', 'list-item');
      });
      return { ...exp, description: doc.body.innerHTML, workingPeriod: `${exp.startDate} - ${exp.endDate}` };
    }),
    education: education.map(edu => ({
      ...edu,
      educationPeriod: `${edu.startDate} - ${edu.endDate}`,
    })),
    contacts: await Promise.all(
      contacts.map(async contact => ({
        ...contact,
        icon: await convertToImageString(contact.icon, { size: { width: 24, height: 24 }, color: 'white' }),
      }))
    ),
    interests: await Promise.all(
      interests.map(async interest => ({
        ...interest,
        icon: await convertToImageString(interest.icon, { size: { width: 60, height: 60 } }),
      }))
    ),
  };
};
interface AppState {
  formSteps: IFormStepsState;
  app: IAppState;
}

type AppActions = {
  formSteps: FormStepsAction;
  app: AppAction;
};

type ActionsMap<A> = {
  [K in keyof A]: A[K] extends Record<keyof A[K], (...arg: any[]) => infer R> ? R : any;
}[keyof A];

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  // const [state, dispatch] = useReducer(appReducer, {
  //   formData: initialFormData,
  //   resumeData: resumePreviewData,
  // });
  const initialState = {
    app: {
      formData: initialFormData,
      resumeData: resumePreviewData,
    },
    formSteps: formStepsInitialState,
  };
  const [state, dispatch] = combineReducers<AppState, ActionsMap<AppActions>>({
    formSteps: formStepsReducer,
    app: appReducer,
  })(initialState);

  const submitResume = useCallback(
    async (formData: IFormData) => {
      const resumeData = await normalizeFormData(formData);
      dispatch({ type: AppActionTypes.SUBMIT_FORM_DATA, payload: { resumeData, formData } });
    },
    [dispatch]
  );

  const loadSavedFormData = useCallback(
    (formData: IFormData) => {
      dispatch({ type: AppActionTypes.LOAD_SAVED_FORM_DATA, payload: formData });
    },
    [dispatch]
  );

  const appContext = useMemo<IAppContext>(
    () => ({
      ...state.app,
      formSteps: state.formSteps.steps,
      completeStep: id => dispatch({ type: 'COMPLETE_STEP', id }),
      restartStep: id => dispatch({ type: 'RESTART_STEP', id }),
      submitResume,
      loadSavedFormData,
    }),
    [dispatch, submitResume, state, loadSavedFormData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
