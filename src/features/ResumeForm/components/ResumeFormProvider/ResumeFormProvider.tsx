import { FC, PropsWithChildren, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { IFormData } from '../../../../types/formTypes.ts';
import useAppContext from '../../../../context/useAppContext.tsx';

export const ResumeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const { formData, isFormDataLoaded } = useAppContext();
  const methods = useForm<IFormData>({
    defaultValues: formData,
  });

  const { reset } = methods;

  useEffect(() => {
    if (isFormDataLoaded) {
      reset(formData);
    }
  }, [formData, reset, isFormDataLoaded]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
