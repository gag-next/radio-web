import React from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';

class RadioButton extends React.Component{

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  render() {
    let radioProps= { ...this.props };
    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }

    return (
      <Radio {...radioProps} />
    );
  }
}
RadioButton.defaultProps = {
  prefixCls: 'ant-radio-button',
};
RadioButton.propTypes = {
  value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  disabled:PropTypes.bool,
  checked:PropTypes.bool,
  onChange:PropTypes.func,
};
RadioButton.displayName = "RadioButton";
export default RadioButton;
