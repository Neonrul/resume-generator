import { IFormData, IIconOption } from '../types/formTypes.ts';

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

const VALIDATION_STRING = 'Neonrul Resume Generator File' as const;
const BLANK_IMAGE = 'about:blank' as const;

export { initialFormData, IconsOptions, VALIDATION_STRING, BLANK_IMAGE };
