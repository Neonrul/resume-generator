import { FC } from 'react';
import { IFormData } from '../../../../types/formTypes.ts';
import Input from '../../../../components/Input/Input.tsx';
import Button from '../../../../components/Button/Button.tsx';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import FileInput from '../../../../components/Input/FileInput.tsx';

export const InterestsForm: FC = () => {
  const { control, register } = useFormContext<IFormData>();
  const interestsField = useFieldArray({
    control,
    name: 'interests',
  });
  const interestsValues = useWatch({ control, name: 'interests' });
  return (
    <>
      {interestsField.fields.map((field, index) => (
        <div key={field.id}>
          <Input label="Name of interest" placeholder="Cooking" {...register(`interests.${index}.name`)} />
          <FileInput
            isFileSelected={!!interestsValues[index]?.icon}
            label="Upload Icon for interest"
            registerProps={register(`interests.${index}.icon`)}
          />
        </div>
      ))}
      <Button onClick={() => interestsField.append({ name: '', icon: '' })}>Tell about your interests</Button>
    </>
  );
};
