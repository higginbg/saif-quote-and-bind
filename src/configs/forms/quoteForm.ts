import components from '../../components/Inputs';
import { Form } from '../../models/Form';

const { TextInput, NumberInput, PhoneInput, DateInput, CheckInput } = components;

const config: Form = [
  {
    name: 'businessName',
    label: 'Registered business name',
    reviewLabel: 'Business name',
    required: true,
    Component: TextInput,
  },
  {
    name: 'businessPhone',
    label: 'Business phone',
    required: true,
    Component: PhoneInput,
  },
  {
    name: 'policyStart',
    label: 'When do you want your policy to start?',
    reviewLabel: 'Policy start date',
    required: true,
    Component: DateInput,
  },
  {
    name: 'claimsFiled',
    label: 'How many claims has your business had in the past five years?',
    reviewLabel: 'Previous claims',
    required: true,
    Component: NumberInput,
  },
  {
    name: 'attestation',
    label: 'This information is true.',
    reviewLabel: 'Approved',
    required: true,
    Component: CheckInput,
  },
];

export default config;
