import { FC, Fragment } from 'react';
import styles from './ChoiceSection.module.scss';
import { GraphicButton } from '../GraphicButton/GraphicButton.tsx';
import cn from 'classnames';
import arrowIcon from '../../assets/icons/arrow.svg';
import FileInput from '../Input/FileInput.tsx';

interface IChoiceBase {
  descriptions: string;
  label: string;
  image: string;
}

interface IGraphicButtonChoice extends IChoiceBase {
  type: 'GraphicButton';
  onClick: () => void;
}

interface IFileInputChoice extends IChoiceBase {
  type: 'FileInput';
  onUpload: (file: File | undefined) => void | Promise<void>;
  accept: string;
}

type IChoice = IGraphicButtonChoice | IFileInputChoice;

interface IChoiceSectionProps {
  firstChoice: IChoice;
  secondChoice: IChoice;
}

const ChoiceSection: FC<IChoiceSectionProps> = ({ firstChoice, secondChoice }) => {
  const choices = [firstChoice, secondChoice];
  const descriptions = [firstChoice.descriptions, secondChoice.descriptions];
  return (
    <section className={styles.ChoiceSection}>
      {choices.map((choice, index) => {
        const isFirst = index === 0;
        const angle = isFirst ? 'left' : 'right';
        return (
          <Fragment key={choice.label}>
            {choice.type === 'GraphicButton' ? (
              <GraphicButton onClick={choice.onClick} label={choice.label} angle={angle} image={choice.image} />
            ) : (
              <FileInput
                onUpload={choice.onUpload}
                type="file"
                accept={choice.accept}
                buttonComponent={<GraphicButton label={choice.label} angle={angle} image={choice.image} />}
              />
            )}
            {isFirst && (
              <div className={styles.ChoiceSection_description}>
                {descriptions.map((description, i) => {
                  const isRight = i === 1;
                  return (
                    <div key={description} className={cn(styles.text, isRight && styles.right)}>
                      {isRight && description}
                      <img
                        className={cn(styles.icon, isRight && styles.right)}
                        src={arrowIcon}
                        alt={`${isRight ? 'right' : 'left'} arrow icon`}
                      />
                      {!isRight && description}
                    </div>
                  );
                })}
              </div>
            )}
          </Fragment>
        );
      })}
    </section>
  );
};

export default ChoiceSection;
