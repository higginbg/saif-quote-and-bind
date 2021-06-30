import { Form } from '../../../models/Form';

import styles from './styles.module.scss';

interface Props {
  title: string;
  form: Form;
  submitted?: boolean;
}

const ReviewPanel = ({ title, form, submitted = false }: Props) => (
  <div className={`${styles.Panel} ${!submitted ? styles.Border : ''}`}>
    <h2 className={styles.Title}>{title}</h2>
    {form.map(({ name, reviewLabel, label, value, error }) => {
      let displayValue = value as string | JSX.Element;
      if (!value) {
        displayValue = '-';
      } else if (typeof value === 'boolean') {
        displayValue = <i className='fa fa-check'></i>;
      }

      return (
        <div key={name}>
          <h3 className={styles.ReviewLabel}>{reviewLabel || label}</h3>
          <div className={styles.Value}>{displayValue}</div>
          {error && <div className={styles.Error}>{error}</div>}
        </div>
      );
    })}
  </div>
);

export default ReviewPanel;
