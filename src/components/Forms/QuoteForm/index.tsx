import { FormEvent, useEffect } from 'react';

import useForm from '../../../hooks/useForm';
import quoteForm from '../../../configs/forms/quoteForm';

import styles from './styles.module.scss';
import ReviewPanel from '../ReviewPanel';
import { componentConfig } from '../../../models/Inputs';

const postEndpoint = 'https://jsonplaceholder.typicode.com/posts';

const QuoteForm = () => {
  const {
    form,
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

    const responseData = await onSubmit(form);
    console.log('Response data', responseData);
  };

  const claimsFiled = form.find((field) => field.name === 'claimsFiled');

  useEffect(() => {
    const hasClaims = +(claimsFiled!.value || 0) > 0;
    if (hasClaims) {
      window.alert('Please contact us directly to continue with your quote.');
    }
  }, [claimsFiled]);

  if (error) {
    return <h2>An error has occured. Please try again later.</h2>;
  }

  return (
    <div className={styles.Wrapper}>
      {!isSubmitted ? (
        <>
          <ReviewPanel title='My information' form={form} />

          <div className={styles.FormContainer}>
            <h2 className={styles.Title}>Tell us about your business</h2>
            <form onSubmit={handleSubmit}>
              {form.map(
                ({ name, label, value, required, error, componentType }) => {
                  const InputComponent = componentConfig[componentType];

                  return (
                    <InputComponent
                      key={name}
                      name={name}
                      label={label}
                      disabled={loading}
                      required={required}
                      error={error}
                      value={value as string | undefined}
                      updateValueAndError={onChange}
                    />
                  );
                }
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
            form={form}
            submitted
          />
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
