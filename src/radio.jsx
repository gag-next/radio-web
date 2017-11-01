import RcCheckbox from 'rc-checkbox';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RadioGroup from './group';
import RadioButton from './radioButton';

class Radio extends React.Component{
  static Group: typeof RadioGroup;
  static Button: typeof RadioButton;

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const { prefixCls, className, children, style, ...restProps } = this.props;
    let radioProps = { ...restProps };
    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }
    const wrapperClassString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    }, className);

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <RcCheckbox
          {...radioProps}
          prefixCls={prefixCls}
        />
        {children !== undefined ? <span title={children}>{children}</span> : null}
      </label>
    );
  }
}
Radio.defaultProps = {
  prefixCls: 'ant-radio',
  type: 'radio',
};
Radio.propTypes = {
  /** 指定当前是否选中*/
  checked:PropTypes.bool,
  /** 初始是否选中*/
  defaultChecked:PropTypes.bool,
  /** 根据 value 进行比较，判断是否选中  */
  value:PropTypes.any,
  prefixCls:PropTypes.string,
  disabled:PropTypes.bool,
  className:PropTypes.string,
  onChange:PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};
Radio.displayName = "Radio";
export default Radio;
