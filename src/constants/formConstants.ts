import { ReactElement } from 'react';
import { IFormData, IIconOption, TIcon } from '../types/formTypes.ts';
import { EmailIcon } from '../components/Icons/EmailIcon.tsx';
import { PhoneIcon } from '../components/Icons/PhoneIcon.tsx';
import { InstagramIcon } from '../components/Icons/InstagramIcon.tsx';
import { FacebookIcon } from '../components/Icons/FacebookIcon.tsx';
import { LinkedInIcon } from '../components/Icons/LinkedInIcon.tsx';
import { GitHubIcon } from '../components/Icons/GitHubIcon.tsx';
import { WebSiteIcon } from '../components/Icons/WebSiteIcon.tsx';
import { getMockFileList } from '../utils/getMockFileList.ts';

const IconsOptions: IIconOption[] = [
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'phone',
    label: 'Phone',
  },
  {
    value: 'github',
    label: 'GitHub',
  },
  {
    value: 'instagram',
    label: 'Instagram',
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
  },
  {
    value: 'website',
    label: 'Web site',
  },
  {
    value: 'facebook',
    label: 'Facebook',
  },
];

const IconMap: Record<TIcon, ReactElement> = {
  email: EmailIcon(),
  phone: PhoneIcon(),
  github: GitHubIcon(),
  instagram: InstagramIcon(),
  linkedin: LinkedInIcon(),
  website: WebSiteIcon(),
  facebook: FacebookIcon(),
  'Select icon': EmailIcon(),
};

const initialFormData: IFormData = {
  userName: '',
  desiredJob: '',
  profile: '',
  photoLink: getMockFileList(),
  dayOfBirth: '',
  city: '',
  languages: '',
  contacts: [
    {
      icon: 'email',
      info: '',
    },
    {
      icon: 'phone',
      info: '',
    },
  ],
  experience: [],
  skills: [],
  education: [],
  interests: [],
};

export { initialFormData, IconMap, IconsOptions };
