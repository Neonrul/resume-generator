import { IFormData, IFormStep, IIconOption } from '../types/formTypes.ts';
import { TFormPages } from '../types/TPages.ts';

const IconsOptions: IIconOption[] = [
  { label: 'Email', value: new URL('../assets/icons/email.svg', import.meta.url).href },
  { label: 'Phone', value: new URL('../assets/icons/phone.svg', import.meta.url).href },
  { label: 'GitHub', value: new URL('../assets/icons/github.svg', import.meta.url).href },
  { label: 'Instagram', value: new URL('../assets/icons/instagram.svg', import.meta.url).href },
  { label: 'LinkedIn', value: new URL('../assets/icons/linkedin.svg', import.meta.url).href },
  { label: 'Web site', value: new URL('../assets/icons/website.svg', import.meta.url).href },
  { label: 'Facebook', value: new URL('../assets/icons/facebook.svg', import.meta.url).href },
];

const initialFormData: IFormData = {
  userName: '',
  desiredJob: '',
  profile: '',
  photoLink: {},
  dayOfBirth: '',
  city: '',
  languages: '',
  contacts: [
    {
      icon: IconsOptions[0].value,
      info: '',
    },
    {
      icon: IconsOptions[1].value,
      info: '',
    },
  ],
  experience: [{ positionName: '', companyName: '', startDate: '', endDate: '', description: '' }],
  skills: [{ name: '', details: [{ level: '50%' }] }],
  education: [{ speciality: '', startDate: '', endDate: '', institution: '', description: '' }],
  interests: [{ name: '', icon: '' }],
};

const initialFormSteps: IFormStep[] = [
  { number: 1, id: TFormPages.PERSONAL, complete: false },
  { number: 2, id: TFormPages.CONTACTS, complete: false },
  { number: 3, id: TFormPages.SKILLS, complete: false },
  { number: 4, id: TFormPages.EXPERIENCE, complete: false },
  { number: 5, id: TFormPages.EDUCATION, complete: false },
  { number: 6, id: TFormPages.INTERESTS, complete: false },
];

const VALIDATION_STRING = 'Neonrul Resume Generator File' as const;
const BLANK_IMAGE = 'about:blank' as const;

export { initialFormData, IconsOptions, initialFormSteps, VALIDATION_STRING, BLANK_IMAGE };
