import { createContext } from 'react';
import { IFormData, IFormStep } from '../types/formTypes.ts';
import { initialFormData, initialFormSteps } from '../constants/formConstants.ts';
import { IAppState } from './AppReducer.ts';
import { TResumeData } from '../types/TResumeData.ts';
import { TFormPages } from '../types/TPages.ts';

export interface IAppContext extends Omit<IAppState, 'resumeData'> {
  resumeData?: TResumeData;
  submitResume: (data: IFormData) => Promise<void>;
  loadSavedFormData: (data: IFormData) => void;
  formSteps: IFormStep[];
  completeStep: (id: TFormPages) => void;
  restartStep: (id: TFormPages) => void;
}

const initialAppContext: IAppContext = {
  formData: initialFormData,
  formSteps: initialFormSteps,
  submitResume: async () => {
    /* stub function*/
  },
  loadSavedFormData: () => {
    /* stub function*/
  },
  completeStep: () => {
    /* stub function*/
  },
  restartStep: () => {
    /* stub function*/
  },
};

export const AppContext = createContext<IAppContext>(initialAppContext);
