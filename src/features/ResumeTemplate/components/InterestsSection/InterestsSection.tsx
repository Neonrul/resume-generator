import { FC } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';
import styles from './InterestsSection.module.scss';
import { IUserInterest } from '../../../../types/TResumeData.ts';

interface IInterestsSection {
  interests: IUserInterest[];
}

export const InterestsSection: FC<IInterestsSection> = ({ interests }) => {
  return (
    <section className={styles.InterestsSection}>
      <SectionTitle title="interests" />
      <section className={styles.InterestsSection_row}>
        {interests.map(item => (
          <div key={item.name} className={styles.InterestsSection_item}>
            <div className={styles.InterestsSection_iconContainer}>
              <img src={item.icon} alt={`Icon for ${item.name} interest`} />
            </div>
            <p className={styles.InterestsSection_text}>{item.name}</p>
          </div>
        ))}
      </section>
    </section>
  );
};
