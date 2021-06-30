import components from '../components/Inputs';

type Component =
  | typeof components.TextInput
  | typeof components.NumberInput
  | typeof components.DateInput
  | typeof components.PhoneInput
  | typeof components.CheckInput;

type BaseInput = {
  name: string;
  label: string;
  reviewLabel?: string;
  error?: string;
  required: boolean;
  Component: Component;
};

export type TextInput = BaseInput & { value: string };

export type NumberInput = BaseInput & { value?: number };

export type BooleanInput = BaseInput & { value?: boolean };

export type DateInput = BaseInput & { value: Date };

export type Input = TextInput | NumberInput | BooleanInput | DateInput;
