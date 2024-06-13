import Input from '../../../../components/Input/Input.tsx';
import Select from '../../../../components/Select/Select.tsx';
import { IconsOptions } from '../../../../constants/formConstants.ts';
import Button from '../../../../components/Button/Button.tsx';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { IFormData } from '../../../../types/formTypes.ts';
import { FC } from 'react';

export const ContactsForm: FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IFormData>();
  const contactsField = useFieldArray({
    control,
    name: 'contacts',
  });

  return (
    <section>
      {contactsField.fields.map((field, index) => {
        switch (index) {
          case 0:
            return (
              <Input
                key={field.id}
                label="Email"
                type="email"
                error={errors?.contacts?.[index]?.info}
                description="Add email address"
                placeholder="example@example.com"
                {...register(`contacts.${index}.info`)}
              />
            );
          case 1:
            return (
              <Input
                key={field.id}
                label="Phone number"
                type="tel"
                error={errors?.contacts?.[index]?.info}
                description="Add phone number"
                placeholder="123-456-7890"
                {...register(`contacts.${index}.info`)}
              />
            );
          default:
            return (
              <div key={field.id} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Input
                  key={field.id}
                  label="New contact"
                  placeholder="My LinkedIn"
                  error={errors?.contacts?.[index]?.info}
                  description="Add another contact information"
                  {...register(`contacts.${index}.info`)}
                />
                <Controller
                  render={({ field, fieldState }) => (
                    <Select
                      label="Icon"
                      placeholder="Select icon"
                      description="Select icon"
                      options={IconsOptions}
                      error={fieldState.error}
                      {...field}
                    />
                  )}
                  name={`contacts.${index}.icon`}
                  control={control}
                />
                <Button onClick={() => contactsField.remove(index)}>-</Button>
              </div>
            );
        }
      })}
      <Button onClick={() => contactsField.append({ info: '', icon: 'Select icon' })}>Add another contact</Button>
    </section>
  );
};
