export enum Actions {
  UpdateValueAndError,
  Validate,
  SetError,
  StartSubmit,
  SubmitSuccess,
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
