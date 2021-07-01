import { Form } from '../../models/Form';

const config: Form = [
  {
    name: 'businessName',
    label: 'Registered business name',
    reviewLabel: 'Business name',
    required: true,
    componentType: 'text_input',
  },
  {
    name: 'businessPhone',
    label: 'Business phone',
    required: true,
    componentType: 'phone_input',
  },
  {
    name: 'policyStart',
    label: 'When do you want your policy to start?',
    reviewLabel: 'Policy start date',
    required: true,
    componentType: 'date_input',
  },
  {
    name: 'claimsFiled',
    label: 'How many claims has your business had in the past five years?',
    reviewLabel: 'Previous claims',
    required: true,
    componentType: 'number_input',
  },
  {
    name: 'attestation',
    label: 'This information is true.',
    reviewLabel: 'Approved',
    required: true,
    componentType: 'check_input',
  },
];

export default config;
