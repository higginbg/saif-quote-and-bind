import React from 'react';
import validator from 'validator';

import InputBase, { InputProps } from './InputBase';
import InputWrapper from './InputWrapper';

import styles from './styles.module.scss';

interface NumberInputProps extends InputProps {
  type?: 'numeric_input' | 'fein_input';
  options?: { min?: number; max?: number, step?: string };
}

class NumberInput<T extends NumberInputProps, P> extends InputBase<T, P> {
  public _errorMessage = 'Value must be a number';

  constructor(props: T) {
    super(props);

    this.validate = this.validate.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getErrorMessage(value = '') {
    const { name, required, options = {} } = this.props;
    const { min, max } = options;

    let errorMsg;

    if (required && value === undefined) {
      errorMsg = this._requiredMessage;
    }

    const isValid = this.validate(value, { min, max });
    if (!isValid) {
      if (min && max) {
        errorMsg = `${this._errorMessage} between ${min} and ${max}`;
      } else if (min) {
        errorMsg = `${this._errorMessage} above ${min}`;
      } else if (max) {
        errorMsg = `${this._errorMessage} below ${max}`;
      } else {
        errorMsg = this._errorMessage;
      }
    }

    return errorMsg;
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const {
      name,
      updateValueAndError,
    } = this.props;
    if (!Number.isInteger(+value)) {
      return;
    }

    const errorMsg = this.getErrorMessage(value);

    updateValueAndError(name, value, errorMsg);
  }

  validate(value = '', options: { min?: number, max?: number } = {}) {
    const { min, max } = options;

    if (min && !max) {
      const isAboveMin = validator.isNumeric(`${value}`) && parseFloat(value) >= min;
      return isAboveMin;
    }

    if (max && !min) {
      const isBelowMax = validator.isNumeric(`${value}`) && parseFloat(value) <= max;
      return isBelowMax;
    }

    return validator.isNumeric(value);
  }

  render() {
    const {
      name,
      value,
      error,
      placeholder,
      disabled,
    } = this.props;

    return (
      <InputWrapper {...this.props}>
        <input
          id={`input_${name}`}
          onChange={this.handleChange}
          className={`${styles.Input} ${error ? styles.Error : ''}`}
          type="text"
          autoComplete="off"
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      </InputWrapper>
    );
  }
}

export default NumberInput;
