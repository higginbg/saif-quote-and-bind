import { useReducer, useState } from 'react';
import { UpdateValueAndError } from '../components/Inputs/InputBase';
import { Input } from '../models/Inputs';

export type FormState = Input[];

type State = {
  loading: boolean;
  error: string;
  submitTried: boolean;
  isSubmitted: boolean;
};

enum ActionEnum {
  SetError = 'SET_ERROR',
  StartSubmit = 'START_SUBMIT',
  SubmitSuccess = 'SUBMIT_SUCCESS',
}

type Action =
  | { type: ActionEnum.SetError; message: string }
  | { type: ActionEnum.StartSubmit; isValid: boolean }
  | { type: ActionEnum.SubmitSuccess };

const initialState: State = {
  loading: false,
  error: '',
  submitTried: false,
  isSubmitted: false,
};

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  let updatedState: State = state;

  switch (action.type) {
    case ActionEnum.SetError:
      updatedState = { ...state, error: action.message };
      return updatedState;
    case ActionEnum.StartSubmit:
      updatedState = { ...state, submitTried: true, loading: action.isValid };
      return updatedState;
    case ActionEnum.SubmitSuccess:
      updatedState = { ...state, isSubmitted: true, loading: false };
      return updatedState;
    default:
      return updatedState;
  }
};

const useForm = (initialFormState: FormState, endpoint: string) => {
  const [formState, setFormState] = useState(initialFormState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error, submitTried, isSubmitted } = state;

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
        dispatch({
          type: ActionEnum.SetError,
          message: 'An error has occured. Please try again later.',
        });
      }
      dispatch({ type: ActionEnum.SubmitSuccess });
      const data = await response.json();
      return data;
    } catch (err) {
      dispatch({
        type: ActionEnum.SetError,
        message: err,
      });
    }
  };

  const setValidateMessages = () => {
    setFormState((prevFormState) => {
      const newFormState = prevFormState.map((field) => {
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
    dispatch({ type: ActionEnum.StartSubmit, isValid });

    if (!isValid) {
      setValidateMessages();
      return;
    }

    const dataToPost = payload.map(({ name, value }) => ({ name, value }));

    const responseData = await postData(dataToPost);

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
