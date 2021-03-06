import { ChangeEvent } from 'react';
import validator from 'validator';

import InputBase, { InputProps } from './InputBase';
import InputWrapper from './InputWrapper';

import styles from './styles.module.scss';

class DateInput extends InputBase<InputProps> {
  private _validateErrorMessage = 'Please enter a valid date.';
  private _minDate = new Date().toISOString().slice(0, 10);

  constructor(props: InputProps) {
    super(props);

    this.validate = this.validate.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validate(value: string) {
    return validator.isDate(value);
  }

  getErrorMessage(value: string) {
    if (!this.validate(value)) {
      return this._validateErrorMessage;
    }

    const selectedDay = new Date(value);
    const today = new Date();

    if (selectedDay < today) {
      return `Please enter a date after ${this._minDate}.`;
    }
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    const { name, updateValueAndError } = this.props;

    const errorMsg = this.getErrorMessage(value);

    updateValueAndError(name, value, errorMsg);
  }

  render() {
    const { name, error, value, disabled } = this.props;

    return (
      <InputWrapper {...this.props}>
        <input
          id={`input_${name}`}
          inputMode='numeric'
          type='date'
          min={this._minDate}
          className={`${styles.Input} ${error ? styles.Error : ''}`}
          name={name}
          value={value}
          placeholder='(___) ___-____'
          disabled={disabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
        />
      </InputWrapper>
    );
  }
}

export default DateInput;
