import { FormEvent, useEffect } from 'react';

import useForm from '../../../hooks/useForm';
import quoteForm from '../../../configs/forms/quoteForm';

import styles from './styles.module.scss';
import ReviewPanel from '../ReviewPanel';

const postEndpoint = 'https://jsonplaceholder.typicode.com/posts';

const QuoteForm = () => {
  const {
    formState,
    onChange,
    loading,
    error,
    onSubmit,
    submitTried,
    isValid,
    isSubmitted,
  } = useForm(quoteForm, postEndpoint);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const responseData = await onSubmit(formState);
    console.log('Response data', responseData);
  };

  const claimsFiled = formState.find((field) => field.name === 'claimsFiled');

  useEffect(() => {
    const hasClaims = +(claimsFiled!.value || 0) > 0;
    if (hasClaims) {
      alert('Please contact us directly to continue with your quote.');
    }
  }, [claimsFiled]);

  if (error) {
    return <h2>An error has occured. Please try again later.</h2>;
  }

  return (
    <div className={styles.Wrapper}>
      {!isSubmitted ? (
        <>
          <ReviewPanel title='My information' formState={formState} />

          <div className={styles.FormContainer}>
            <h2 className={styles.Title}>Tell us about your business</h2>
            <form onSubmit={handleSubmit}>
              {formState.map(
                ({ name, label, value, required, error, Component }) => (
                  <Component
                    key={name}
                    name={name}
                    label={label}
                    disabled={loading}
                    required={required}
                    error={error}
                    value={value as string | undefined}
                    updateValueAndError={onChange}
                  />
                )
              )}
              <div style={{ marginTop: 50 }}>
                {submitTried && !isValid && (
                  <p className={styles.Error}>
                    Please fill out all required fields.
                  </p>
                )}
                <button
                  type='submit'
                  className={`${styles.Button} ${
                    !submitTried && !isValid ? styles.Disabled : ''
                  }`}
                  disabled={submitTried && !isValid}
                >
                  {loading ? (
                    <>
                      <i className='fa fa-circle-o-notch fa-spin'></i> Sending
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className={`${styles.FormContainer} ${styles.Submitted}`}>
          <ReviewPanel
            title='Form submitted successfully!'
            formState={formState}
            submitted
          />
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
