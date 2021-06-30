import { useReducer } from 'react';

import { UpdateValueAndError } from '../../components/Inputs/InputBase';
import { Form } from '../../models/Form';
import { postData } from '../../utils/http';
import { Actions, reducer } from './reducer';

export type State = {
  loading: boolean;
  error: string;
  submitTried: boolean;
  isSubmitted: boolean;
  form: Form;
};

const initialState: State = {
  loading: false,
  error: '',
  submitTried: false,
  isSubmitted: false,
  form: [],
};

const useForm = (initialFormState: Form, endpoint: string) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    form: initialFormState,
  });

  const { loading, error, submitTried, isSubmitted, form } = state;

  const requiredCount = form.filter((field) => field.required).length;
  const isValid =
    form.filter((field) => field.required && field.value && !field.error)
      .length === requiredCount;

  const onChange: UpdateValueAndError = (name, value, error) => {
    dispatch({ type: Actions.UpdateValueAndError, name, value, error });
  };

  const onSubmit = async (payload: Form) => {
    dispatch({
      type: Actions.StartSubmit,
      isValid,
      endpoint,
    });

    if (!isValid) {
      dispatch({ type: Actions.Validate });
      return;
    }

    const onSuccess = () => {
      dispatch({ type: Actions.SubmitSuccess });
    };

    const onError = () => {
      dispatch({
        type: Actions.SetError,
        message: 'An error has occured. Please try again later.',
      });
    };

    const dataToPost = payload.map(({ name, value }) => ({ name, value }));
    postData(endpoint, dataToPost, onSuccess, onError);
  };

  return {
    form,
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
