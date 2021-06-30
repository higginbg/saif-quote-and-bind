import { State } from '.';
import { Action, Actions } from './actions';

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  let updatedState: State = state;

  switch (action.type) {
    case Actions.SetError:
      updatedState = { ...state, error: action.message };
      return updatedState;

    case Actions.Validate:
      const validatedForm = state.form.map((field) => {
        const shouldSetError = field.required && !field.value && !field.error;
        if (shouldSetError) {
          return { ...field, error: 'This field is required' };
        }
        return field;
      });
      updatedState = { ...state, form: validatedForm };
      return updatedState;

    case Actions.UpdateValueAndError:
      const updatedForm = state.form.map((field) => {
        if (field.name === action.name) {
          const updatedField = {
            ...field,
            value: action.value,
            error: action.error,
          };
          return updatedField;
        }
        return field;
      });
      updatedState = { ...state, form: updatedForm };
      return updatedState;

    case Actions.StartSubmit:
      updatedState = { ...state, submitTried: true, loading: action.isValid };
      return updatedState;

    case Actions.SubmitSuccess:
      updatedState = { ...state, isSubmitted: true, loading: false };
      return updatedState;

    default:
      return updatedState;
  }
};

export { Actions, reducer };
