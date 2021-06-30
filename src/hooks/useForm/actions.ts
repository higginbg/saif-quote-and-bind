export enum Actions {
  UpdateValueAndError = 'UPDATE_VALUE_AND_ERROR',
  Validate = 'VALIDATE',
  SetError = 'SET_ERROR',
  StartSubmit = 'START_SUBMIT',
  SubmitSuccess = 'SUBMIT_SUCCESS',
}

export type Action =
  | { type: Actions.SetError; message: string }
  | {
      type: Actions.UpdateValueAndError;
      name: string;
      value?: string | number | boolean;
      error?: string;
    }
  | { type: Actions.Validate }
  | {
      type: Actions.StartSubmit;
      isValid: boolean;
      endpoint: string;
    }
  | { type: Actions.SubmitSuccess };
