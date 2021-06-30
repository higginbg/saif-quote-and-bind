import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  name: string;
  error?: string;
  label?: string | JSX.Element;
  required?: boolean;
  tooltip?: string;
}

const InputWrapper: FC<Props> = ({
  error,
  label,
  children,
  required = false,
  name,
}) => (
  <div className={styles.Wrapper}>
    {label && (
      <label htmlFor={`input_${name}`} className={styles.Label}>
        <div>{label}</div>
        <div className={styles.Required}>{required && '*'}</div>
      </label>
    )}
    <div>{children}</div>
    {(required || error) && (
      <div className={`${styles.ErrorMessage}`}>{error}</div>
    )}
  </div>
);

export default InputWrapper;
