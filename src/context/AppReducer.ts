import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { Reducer } from 'react';

export enum AppActionTypes {
  SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA',
  LOAD_SAVED_FORM_DATA = 'LOAD_SAVED_FORM_DATA',
}

export type AppAction =
  | {
      type: AppActionTypes.SUBMIT_FORM_DATA;
      payload: {
        formData: IFormData;
        resumeData: TResumeData;
      };
    }
  | {
      type: AppActionTypes.LOAD_SAVED_FORM_DATA;
      payload: IFormData;
    };

export interface IAppState {
  resumeData: TResumeData;
  formData: IFormData;
  isFormDataLoaded?: boolean;
}

export const appReducer: Reducer<IAppState, AppAction> = (state, action) => {
  switch (action.type) {
    case AppActionTypes.SUBMIT_FORM_DATA:
      return {
        formData: action.payload.formData,
        resumeData: action.payload.resumeData,
      };
    case AppActionTypes.LOAD_SAVED_FORM_DATA:
      return {
        ...state,
        isFormDataLoaded: true,
        formData: action.payload,
      };
    default:
      return state;
  }
};
