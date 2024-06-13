import { FC } from 'react';
import useAppContext from '../../../../context/useAppContext.tsx';
import { useNavigate } from 'react-router-dom';
import { IFormData, IStampedFormData } from '../../../../types/formTypes.ts';
import { initialFormData, VALIDATION_STRING } from '../../../../constants/formConstants.ts';
import style from '../../../../pages/FormPage/FormPage.module.scss';
import { TFormPages, TPages } from '../../../../types/TPages.ts';
import loadData from '../../../../assets/images/loadData.png';
import formPreview from '../../../../assets/images/formPreview.png';
import { useFormContext } from 'react-hook-form';
import ChoiceSection from '../../../../components/ChoiceSection/ChoiceSection.tsx';

export const NewForm: FC = () => {
  const { loadSavedFormData } = useAppContext();
  const { reset } = useFormContext();

  const navigate = useNavigate();
  const personalInfoFormPage = `/${TPages.FORM}/${TFormPages.PERSONAL}`;

  const handleLoad = (file?: File) => {
    return new Promise<IFormData>(resolve => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const data = JSON.parse(e.target?.result as string) as IStampedFormData;
            const { appStamp, ...formData } = data;
            if (appStamp !== VALIDATION_STRING) {
              console.error('Error when loading a form file: Invalid file format');
              return;
            }
            resolve(formData);
          } catch (error) {
            console.error('Error when loading a form file:', error);
          }
        };
        reader.readAsText(file);
      }
    });
  };

  return (
    <section className={style.FormPage_title}>
      <h2>Let&apos;s get started</h2>
      <ChoiceSection
        firstChoice={{
          type: 'FileInput',
          onUpload: async file => {
            const formData = await handleLoad(file);
            loadSavedFormData(formData);
            navigate(personalInfoFormPage);
          },
          accept: 'application/json',
          label: 'Load Form Data',
          image: loadData,
          descriptions: 'Load already existing form',
        }}
        secondChoice={{
          type: 'GraphicButton',
          onClick: () => {
            reset(initialFormData);
            navigate(personalInfoFormPage);
          },
          label: 'Create New',
          image: formPreview,
          descriptions: 'Start creating new ones from scratch',
        }}
      />
    </section>
  );
};
