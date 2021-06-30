import { useState } from 'react';
import { UpdateValueAndError } from '../components/Inputs/InputBase';
import { Input } from '../models/Inputs';

export type FormState = Input[];

const useForm = (initialState: FormState, endpoint: string) => {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitTried, setSubmitTried] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requiredCount = formState.filter((field) => field.required).length;
  const isValid =
    formState.filter((field) => field.required && field.value && !field.error)
      .length === requiredCount;

  const postData = async (payload: {}[]) => {
    console.log('Request data', payload);
    try {
      const response: any = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setError('An error has occured. Please try again later.');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err);
    }
  };

  const setValidateMessages = () => {
    setFormState((prevFormState) => {
      const newFormState = prevFormState.map((field) => {
        console.log(field.name, field.value);
        const shouldSetError = field.required && !field.value && !field.error;
        if (shouldSetError) {
          return { ...field, error: 'This field is required' };
        }
        return field;
      });
      return newFormState;
    });
  };

  const onChange: UpdateValueAndError = (name, value, error) => {
    setFormState((prevFormState) => {
      const updatedFormState = prevFormState.map((field) => {
        if (field.name === name) {
          const updatedField = { ...field, value, error };
          return updatedField;
        }
        return field;
      });
      return updatedFormState;
    });
  };

  const onSubmit = async (payload: FormState) => {
    setSubmitTried(true);

    if (!isValid) {
      setValidateMessages();
      return;
    }

    setLoading(true);

    const dataToPost = payload.map(({ name, value }) => ({ name, value }));

    const responseData = await postData(dataToPost);

    setLoading(false);
    setIsSubmitted(true);

    return responseData;
  };

  return {
    formState,
    onChange,
    onSubmit,
    loading,
    error,
    isValid,
    submitTried,
    isSubmitted,
  };
};

export default useForm;
