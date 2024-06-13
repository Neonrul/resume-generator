import { motion, RepeatType } from 'framer-motion';
import styles from './GraphicButton.module.scss';
import { FC } from 'react';

type TAngle = 'left' | 'right' | 'none';

interface IGraphicButtonProps {
  label: string;
  image: string;
  angle: TAngle;
  onClick?: () => void;
}

const angleConfig: Record<TAngle, number> = {
  left: -5,
  right: 5,
  none: 0,
};

export const GraphicButton: FC<IGraphicButtonProps> = ({ label, image, angle = 'none', onClick }) => {
  const animationOptions = {
    rotateZ: [0, -3, 3, -3, 3, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'mirror' as RepeatType,
    },
  };
  return (
    <section className={styles.GraphicButton}>
      <motion.div
        role="button"
        aria-labelledby={`${label}-button`}
        tabIndex={0}
        onClick={onClick}
        initial={{ rotate: angleConfig[angle] }}
        whileHover={animationOptions}
        whileFocus={animationOptions}
        animate={{ rotateZ: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className={styles.GraphicButton_frame}>
          <img src={image} alt={label} />
        </div>
      </motion.div>
      <label id={`${label}-button`} className={styles.GraphicButton_label}>
        {label}
      </label>
    </section>
  );
};
