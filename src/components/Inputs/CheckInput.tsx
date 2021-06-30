import InputBase, { InputProps } from './InputBase';

import styles from './styles.module.scss';

interface CheckInputProps extends InputProps {
  checked: boolean;
}

class CheckInput extends InputBase<CheckInputProps, { checked: boolean }> {
  public _errorMessage = 'This field must be checked.';

  constructor(props: CheckInputProps) {
    super(props);

    this.state = { checked: props.checked || false };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    return true;
  }

  getErrorMessage(value: 'true' | 'false') {
    const { required } = this.props;

    if (required && value === 'false') {
      return this._errorMessage;
    }
  }

  handleChange() {
    const { name, updateValueAndError } = this.props;
    const { checked } = this.state;

    const updatedValue = !checked;

    this.setState({ checked: updatedValue });

    updateValueAndError(
      name,
      updatedValue,
      this.getErrorMessage(updatedValue ? 'true' : 'false')
    );
  }

  render() {
    const { label, name, error, disabled, required } = this.props;
    const { checked } = this.state;

    return (
      <div>
        <label htmlFor={`checkbox_${name}`} tabIndex={1}>
          <input
            id={`checkbox_${name}`}
            style={{ display: 'none' }}
            onChange={this.handleChange}
            type='checkbox'
            checked={checked}
            name={name}
            disabled={disabled}
            hidden={true}
          />
          <div className={styles.Label}>
            <div>{label}</div>
            {required && <div className={styles.Required}>*</div>}
          </div>

          <div className={styles.CheckBox}>
            <span className={`${styles.Box} ${checked ? styles.Checked : ''}`}>
              <i
                className={`${
                  checked ? 'fas fa-check-square' : 'far fa-square'
                } fa-lg`}
              />
            </span>
            <span className={styles.Agree}>I agree</span>
          </div>
        </label>
        <div style={{ marginTop: 10 }} className={styles.ErrorMessage}>
          {error}
        </div>
      </div>
    );
  }
}

export default CheckInput;
