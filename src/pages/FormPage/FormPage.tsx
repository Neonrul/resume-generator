import { FC } from 'react';
import useAppContext from '../../context/useAppContext.tsx';
import { convertToImageString } from '../../utils/convertToImageString.ts';
import { ResumeForm } from '../../features/ResumeForm/ResumeForm.tsx';
import style from './FormPage.module.scss';
import { VALIDATION_STRING } from '../../constants/formConstants.ts';
import { ResumeFormProvider } from '../../features/ResumeForm/components/ResumeFormProvider/ResumeFormProvider.tsx';

export const FormPage: FC = () => {
  const { formData } = useAppContext();
  const handleSave = async () => {
    const { interests, photoLink, ...rest } = formData;
    const photo = await convertToImageString(photoLink.photo);
    const normalizedFormData = {
      appStamp: VALIDATION_STRING,
      ...rest,
      photoLink: { photo, crop: photoLink.crop },
      interests: await Promise.all(
        interests.map(async interest => ({
          ...interest,
          icon: await convertToImageString(interest.icon, { size: { width: 60, height: 60 } }),
        }))
      ),
    };
    const jsonFormData = JSON.stringify(normalizedFormData);
    const blobFormData = new Blob([jsonFormData], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blobFormData);
    downloadLink.download = `Resume Form ${formData.userName}`;
    downloadLink.target = 'blank';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(downloadLink.href);
  };

  return (
    <section className={style.FormPage}>
      <ResumeFormProvider>
        <ResumeForm />
      </ResumeFormProvider>
    </section>
  );
};
