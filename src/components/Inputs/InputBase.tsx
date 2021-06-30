import React, { Component } from 'react';

import InputWrapper from './InputWrapper';

import styles from './styles.module.scss';

export type UpdateValueAndError = (
  name: string,
  value?: string | boolean | number,
  errorMessage?: string
) => void;

export interface InputProps {
  name: string;
  value?: string;
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
  updateValueAndError: UpdateValueAndError;
  updateOnUnmount?: boolean;
}

class InputBase<T extends InputProps, S = {}> extends Component<T, S> {
  public _errorMessage = 'Invalid Input';
  public _requiredMessage = 'Please enter a value for this field.';

  constructor(props: T) {
    super(props);

    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    const {
      name,
      value,
      updateValueAndError,
      updateOnUnmount = true,
    } = this.props;

    if (updateOnUnmount) {
      const errorMessage = this.getErrorMessage(value);
      updateValueAndError(name, value, errorMessage);
    }
  }

  getErrorMessage(value = '') {
    const { required } = this.props;
    let errorMsg;

    const isValid = !!value || (typeof value === 'string' && value.trim() !== '');
    if (required && !isValid) {
      errorMsg = this._requiredMessage;
    }

    return errorMsg;
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const { name, updateValueAndError } = this.props;
    const errorMsg = this.getErrorMessage(value);

    updateValueAndError(name, value, errorMsg);
  }

  render() {
    const {
      name,
      value = '',
      error,
      placeholder,
      type = 'text',
      disabled,
      hidden,
    } = this.props;

    return (
      <InputWrapper {...this.props}>
        <input
          id={`input_${name}`}
          onChange={this.handleChange}
          className={`${styles.Input} ${hidden ? styles.Hidden : ''} ${
            error ? styles.Error : ''
          }`}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled || hidden}
          value={value}
        />
      </InputWrapper>
    );
  }
}

export default InputBase;
