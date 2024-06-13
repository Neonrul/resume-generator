import { FC, useState } from 'react';
import styles from './PersonalInfoForm.module.scss';
import initialPhoto from '../../../../assets/images/initialPhoto.png';
import Cropper, { Area } from 'react-easy-crop';
import FileInput from '../../../../components/Input/FileInput.tsx';
import { UseFormRegister } from 'react-hook-form';
import { IFormData } from '../../../../types/formTypes.ts';

interface IUserPhotoForm {
  photo: string | null;
  handleCropComplete: (croppedArea: Area) => void;
  initialCrop?: Area;
  registerProps: ReturnType<UseFormRegister<IFormData>>;
}

export const UserPhotoForm: FC<IUserPhotoForm> = ({ photo, handleCropComplete, initialCrop, registerProps }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  return (
    <div className={styles.userPhoto_container}>
      {!photo ? (
        <img className={styles.userPhoto} src={initialPhoto} alt="user photo" />
      ) : (
        <Cropper
          classes={{ containerClassName: styles.userPhoto }}
          aspect={1.39}
          image={photo ?? initialPhoto}
          restrictPosition
          initialCroppedAreaPixels={initialCrop}
          crop={crop}
          showGrid={false}
          onCropChange={crop => {
            setCrop(prevState => ({ ...prevState, ...crop }));
          }}
          onCropComplete={(_, croppedAreaPixels) => {
            handleCropComplete(croppedAreaPixels);
          }}
        />
      )}
      <FileInput
        label="Your Photo"
        description="Photo must be 416x300"
        accept="image/*"
        isFileSelected={!!photo}
        registerProps={registerProps}
      />
    </div>
  );
};
