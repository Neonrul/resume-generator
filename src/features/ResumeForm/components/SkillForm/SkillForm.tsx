import { IFormData } from '../../../../types/formTypes.ts';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import { SkillVariantArray } from './SkillVariantArray.tsx';
import Button from '../../../../components/Button/Button.tsx';
import RangeInput from '../../../../components/Input/RangeInput.tsx';

export const SkillForm: FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IFormData>();
  const skillsField = useFieldArray({
    control,
    name: 'skills',
  });
  const skillsArray = useWatch({ control, name: 'skills' });

  return (
    <>
      {skillsField.fields.map((field, skillIndex) => {
        const isSkillHaveVariant = skillsArray[skillIndex]?.details[0].variant !== undefined;
        return (
          <div key={field.id}>
            <Input
              label="Name of skill"
              placeholder="My awesome skill"
              error={errors?.skills?.[skillIndex]?.name}
              {...register(`skills.${skillIndex}.name`)}
            />
            {!isSkillHaveVariant && (
              <RangeInput label="Your skill level" {...register(`skills.${skillIndex}.details.0.level`)} />
            )}
            <SkillVariantArray nestIndex={skillIndex} />
          </div>
        );
      })}
      <Button onClick={() => skillsField.append({ name: '', details: [{ level: '50%' }] })}>Add new skill</Button>
    </>
  );
};
