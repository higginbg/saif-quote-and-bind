import { ChangeEvent, FormEvent } from 'react';
import validator from 'validator';
import InputMask from 'react-input-mask';

import InputBase, { InputProps } from './InputBase';
import InputWrapper from './InputWrapper';

import styles from './styles.module.scss';

function cleanPhone(value: string) {
  return value.replace(/[^0-9]/g, '');
}

function formatPhoneNumber(phoneNumberString: string) {
  if (phoneNumberString.length !== 10) {
    return '';
  }

  const match = phoneNumberString.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return '';
}

class PhoneInput extends InputBase<
  InputProps,
  { phone: string; ext: string; hasAutocomplete: boolean }
> {
  public _errorMessage = 'Please enter valid US based phone number.';

  constructor(props: InputProps) {
    super(props);

    this.state = { phone: '', ext: '', hasAutocomplete: false };

    this.validate = this.validate.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleExt = this.handleExt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
  }

  componentDidMount() {
    const { value = '' } = this.props;

    const [phone, ext] = value.split('x');
    this.setState({ phone, ext });
  }

  validate(value = '') {
    const cleanInput = cleanPhone(value);
    if (cleanInput.length > 10) {
      return true;
    }

    return validator.isMobilePhone(cleanInput, 'en-US');
  }

  getErrorMessage(value: string) {
    if (!this.validate(value)) {
      return this._errorMessage;
    }
  }

  handlePhone(value: string) {
    const { name, updateValueAndError } = this.props;

    const { ext = '' } = this.state;

    const errorMsg = this.getErrorMessage(value);

    this.setState({ phone: value });

    updateValueAndError(name, `${value} ${ext}`, errorMsg);
  }

  handleExt(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    const { name, updateValueAndError } = this.props;

    const { phone = '' } = this.state;

    const errorMsg = this.getErrorMessage(phone);

    this.setState({ ext: value });

    const finalValue = `${phone} ${value ? ` ${value}` : ''}`;

    updateValueAndError(name, finalValue, errorMsg);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const { hasAutocomplete } = this.state;

    if (hasAutocomplete) {
      this.setState({ hasAutocomplete: false });
      return;
    }

    this.handlePhone(value);
  }

  handleAutocomplete(e: FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    const cleanedValue = cleanPhone(value);

    if (cleanedValue.length !== 10) {
      return;
    }

    this.setState({ hasAutocomplete: true });
    const formattedNumber = formatPhoneNumber(cleanedValue);
    this.handlePhone(formattedNumber);
  }

  render() {
    const { name, error, disabled } = this.props;

    const { phone = '', ext = '' } = this.state;

    const fixSelectionRange = (target: HTMLInputElement) => {
      if (cleanPhone(target.value).length === 0) {
        target.setSelectionRange(1, 1);
        return;
      }

      const lastNumberIndex =
        target.value.length -
        target.value.split('').reverse().join('').search(/\d/);

      if ((target.selectionStart || Infinity) < lastNumberIndex) {
        return;
      }

      target.setSelectionRange(lastNumberIndex, lastNumberIndex);
    };

    return (
      <InputWrapper {...this.props}>
        <div className={styles.Phone}>
          <InputMask
            id={`input_${name}`}
            inputMode='numeric'
            className={`${styles.Input} ${error ? styles.Error : ''}`}
            mask='(999) 999-9999'
            name={name}
            value={phone}
            alwaysShowMask
            maskPlaceholder='(___) ___-____'
            onClick={(e) => fixSelectionRange(e.currentTarget)}
            disabled={disabled}
            onChange={(e) => this.handleChange(e)}
            onInput={(e) => this.handleAutocomplete(e)}
          />

          <div className={styles.Ext}>
            <InputMask
              id={`input_${name}_ext`}
              inputMode='numeric'
              onChange={(e) => this.handleExt(e)}
              className={`${styles.Input} ${error ? styles.Error : ''}`}
              mask='x9999'
              name='ext'
              value={ext}
              alwaysShowMask
              maskPlaceholder='x____'
              onClick={(e) => fixSelectionRange(e.currentTarget)}
              disabled={disabled}
            />
            <span className={styles.Optional}>(Optional)</span>
          </div>
        </div>
      </InputWrapper>
    );
  }
}

export default PhoneInput;
