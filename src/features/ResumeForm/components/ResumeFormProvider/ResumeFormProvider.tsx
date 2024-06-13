import { FC, PropsWithChildren, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { IFormData } from '../../../../types/formTypes.ts';
import useAppContext from '../../../../context/useAppContext.tsx';
import { useMatch } from 'react-router-dom';
import { TFormPages } from '../../../../types/TPages.ts';

export const ResumeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const match = useMatch('/form/:formRoute');
  const formRoute = match?.params?.formRoute as TFormPages;
  const { formData, isFormDataLoaded, completeStep } = useAppContext();
  const methods = useForm<IFormData>({
    defaultValues: formData,
  });

  const {
    reset,
    formState: { isValid, isDirty },
  } = methods;

  useEffect(() => {
    if (isFormDataLoaded) {
      reset(formData);
    }
  }, [formData, reset, isFormDataLoaded]);

  useEffect(() => {
    console.log(isValid, isDirty, formRoute);
    if (isValid && isDirty) {
      completeStep(formRoute);
    }
  }, [formRoute, isValid, isDirty]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
