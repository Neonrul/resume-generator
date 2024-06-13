import { cloneElement, FC, HTMLProps, ReactElement, useRef } from 'react';
import Button from '../Button/Button.tsx';
import { IFormAttributes, IFormData } from '../../types/formTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';
import filePresent from '../../assets/icons/filePresent.svg';
import uploadFile from '../../assets/icons/uploadFile.svg';
import cn from 'classnames';

interface IFileInputProps extends HTMLProps<HTMLInputElement>, IFormAttributes {
  registerProps?: ReturnType<UseFormRegister<IFormData>>;
  onUpload?: (file?: File) => void;
  isFileSelected?: boolean;
  label?: string;
  buttonComponent?: ReactElement;
}

const FileInput: FC<IFileInputProps> = ({
  registerProps,
  label,
  isFileSelected,
  onUpload,
  buttonComponent,
  ...overProps
}) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const triggerFileInputClick = () => hiddenFileInput.current?.click();
  return (
    <>
      {buttonComponent ? (
        cloneElement(buttonComponent, { onClick: triggerFileInputClick })
      ) : (
        <Button onClick={triggerFileInputClick}>
          <section className={styles.inputControl_file}>
            <p id="file-input-label">{label}</p>
            {hiddenFileInput.current?.files?.[0]?.name || isFileSelected ? (
              <img src={filePresent} alt="file successfully uploaded" />
            ) : (
              <img src={uploadFile} alt="file is unavailable" />
            )}
          </section>
        </Button>
      )}
      <input
        type="file"
        aria-labelledby="file-input-label"
        id={overProps.name}
        name={overProps.name}
        className={cn(styles.inputControl, overProps.error && styles.inputControl_error)}
        {...overProps}
        {...registerProps}
        ref={element => {
          registerProps?.ref(element);
          hiddenFileInput.current = element;
        }}
        onChange={async event => {
          const fileUploaded = event.target.files?.[0];
          onUpload?.(fileUploaded);
          await registerProps?.onChange?.(event);
        }}
      />
    </>
  );
};
FileInput.displayName = 'FileInput';
export default FileInput;
