import components from '../components/Inputs';

type Component =
  | typeof components.TextInput
  | typeof components.NumberInput
  | typeof components.DateInput
  | typeof components.PhoneInput
  | typeof components.CheckInput;

type ComponentKey = 'text_input' | 'number_input' | 'date_input' | 'phone_input' | 'check_input';

export const componentConfig: { [key in ComponentKey]: Component } = {
  'text_input': components.TextInput,
  'number_input': components.NumberInput,
  'date_input': components.DateInput,
  'phone_input': components.PhoneInput,
  'check_input': components.CheckInput,
}

type BaseInput = {
  name: string;
  label: string;
  reviewLabel?: string;
  error?: string;
  required: boolean;
  componentType: ComponentKey;
};

export type TextInput = BaseInput & { value: string };

export type NumberInput = BaseInput & { value?: number };

export type BooleanInput = BaseInput & { value?: boolean };

export type DateInput = BaseInput & { value: Date };

export type Input = TextInput | NumberInput | BooleanInput | DateInput;
