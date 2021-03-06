import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Radio from './radio';
function getCheckedValue(children) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}

class RadioGroup extends React.Component {
  static childContextTypes = {
    radioGroup: PropTypes.any,
  };

  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      value,
    };
  }

  getChildContext() {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        this.setState({
          value: checkedValue.value,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.group, nextContext.group);
  }

  onRadioChange = (ev) => {
    const lastValue = this.state.value;
    const { value } = ev.target;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    const onChange = this.props.onChange;
    if (onChange && value !== lastValue) {
      onChange(ev);
    }
  }
  render() {
    const props = this.props;
    const { prefixCls = 'ant-radio-group', className = '' } = props;
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${props.size}`]: props.size,
    }, className);

    let children = props.children;

    // 如果存在 options, 优先使用
    if (props.options && props.options.length > 0) {
      children = props.options.map((option, index) => {
        if (typeof option === 'string') { // 此处类型自动推导为 string
          return (
            <Radio
              key={index}
              disabled={this.props.disabled}
              value={option}
              onChange={this.onRadioChange}
              checked={this.state.value === option}
            >
              {option}
            </Radio>
          );
        } else { // 此处类型自动推导为 { label: string value: string }
          return (
            <Radio
              key={index}
              disabled={option.disabled || this.props.disabled}
              value={option.value}
              onChange={this.onRadioChange}
              checked={this.state.value === option.value}
            >
              {option.label}
            </Radio>
          );
        }
      });
    }

    return (
      <div
        className={classString}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {children}
      </div>
    );
  }
}
RadioGroup.defaultProps = {
  disabled: false,
};
RadioGroup.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  /** 选项变化时的回调函数*/
  onChange:PropTypes.func,
  /** 用于设置当前选中的值*/
  value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  /** 默认选中的值*/
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  /**  大小，只对按钮样式生效*/
  size: PropTypes.oneOf([ 'large','default','small']),
  disabled:PropTypes.bool,
  onMouseEnter:PropTypes.func,
  onMouseLeave:PropTypes.func,
  /** 以配置的方式设置 Radio 子元素，设置了此参数，会忽略 children */
  options:PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value:PropTypes.string,
        disabled:PropTypes.bool,
    }),
    ])),
};
RadioGroup.displayName = "RadioGroup";
export default RadioGroup;
