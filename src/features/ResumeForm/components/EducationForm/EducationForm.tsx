import { FC } from 'react';
import Input from '../../../../components/Input/Input.tsx';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import Button from '../../../../components/Button/Button.tsx';
import { IFormData } from '../../../../types/formTypes.ts';
import { FieldPath, useFieldArray, useFormContext } from 'react-hook-form';

export const EducationForm: FC = () => {
  const { control, register, setValue } = useFormContext<IFormData>();
  const educationField = useFieldArray({
    control,
    name: 'education',
  });
  const handleDateChange = (name: FieldPath<IFormData>) => (value: string) => {
    setValue(name, value);
  };

  return (
    <>
      {educationField.fields.map((field, index) => {
        const dateTimeProps = {
          timeFormat: false,
          dateFormat: 'YYYY',
          momentFormat: 'YYYY',
          closeOnSelect: true,
        };
        return (
          <div key={field.id}>
            <Input
              label="Your institution name"
              placeholder="Harvard"
              {...register(`education.${index}.institution`)}
            />
            <Input
              label="Your speciality"
              placeholder="Master of finance"
              {...register(`education.${index}.speciality`)}
            />
            <DateInput
              handleChange={handleDateChange(`education.${index}.startDate`)}
              dateTimeProps={dateTimeProps}
              inputProps={{
                ...register(`education.${index}.startDate`),
                placeholder: 'YYYY',
                label: 'Start date of education',
              }}
            />
            <DateInput
              handleChange={handleDateChange(`education.${index}.endDate`)}
              dateTimeProps={dateTimeProps}
              inputProps={{
                ...register(`education.${index}.endDate`),
                placeholder: 'YYYY',
                label: 'End date of education',
              }}
            />
            <Input
              label="Add some description"
              placeholder="Department Name"
              {...register(`education.${index}.description`)}
            />
          </div>
        );
      })}
      <Button
        onClick={() =>
          educationField.append({ speciality: '', institution: '', startDate: '', endDate: '', description: '' })
        }
      >
        Tell about your education
      </Button>
    </>
  );
};
