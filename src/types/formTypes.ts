import { IPositionExplore, IUserEducation, TResumeData } from './TResumeData.ts';
import { Control, FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { HTMLProps } from 'react';
import { Area } from 'react-easy-crop';

interface IIconOption {
  value: string;
  label: string;
}
interface IExperienceFormData extends Omit<IPositionExplore, 'workingPeriod'> {
  startDate: string;
  endDate: string;
}
interface IEducationFormData extends Omit<IUserEducation, 'educationPeriod'> {
  startDate: string;
  endDate: string;
}

interface IFormData
  extends Omit<TResumeData, 'contacts' | 'photoLink' | 'info' | 'experience' | 'education' | 'interests'> {
  photoLink: { photo?: FileList | string; crop?: Area };
  contacts: {
    icon: string;
    info: string;
  }[];
  dayOfBirth: string;
  city: string;
  languages: string;
  experience: IExperienceFormData[];
  education: IEducationFormData[];
  interests: { name: string; icon: FileList | string }[];
}

interface IStampedFormData extends IFormData {
  appStamp?: string;
}

interface IFormAttributes {
  label?: string;
  description?: string;
  error?: FieldError;
}

type TFormElement<T extends HTMLElement> = ReturnType<UseFormRegister<IFormData>> &
  Omit<HTMLProps<T>, 'name' | 'onBlur' | 'onChange' | 'ref'> &
  IFormAttributes;

interface IFormComponent {
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
  errors?: FieldErrors<IFormData>;
}

export type { TFormElement, IIconOption, IFormData, IFormAttributes, IFormComponent, IStampedFormData };
