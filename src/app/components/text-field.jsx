var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');
var UniqueId = require('../utils/unique-id');
var EnhancedTextarea = require('./enhanced-textarea');

var TextField = React.createClass({

	mixins: [Classable],

	propTypes: {
		errorText: React.PropTypes.string,
		floatingLabelText: React.PropTypes.string,
		hintText: React.PropTypes.string,
		id: React.PropTypes.string,
		multiLine: React.PropTypes.bool,
		onBlur: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onKeyDown: React.PropTypes.func,
		onEnterKeyDown: React.PropTypes.func,
		type: React.PropTypes.string,
		isRequired: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			isRequired: false,
			type: "text",
			requireErrorText : '这个字段是必填项！'
		};
	},

	getInitialState: function() {
		return {
			errorText: (this.props.isRequired && !this.props.errorText) ? this.props.requireErrorText : this.props.errorText,
			hasValue: this.props.value || this.props.defaultValue ||
        		(this.props.valueLink && this.props.valueLink.value)
		};
	},

	componentWillReceiveProps: function(nextProps) {
		var hasErrorProp = nextProps.hasOwnProperty('errorText');
		var hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
		var hasValueProp = nextProps.hasOwnProperty('value');
		var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
		var newState = {};

		if (hasValueProp) {
		  newState.hasValue = nextProps.value;
		} else if (hasValueLinkProp) {
		  newState.hasValue = nextProps.valueLink.value;
		} else if (hasNewDefaultValue) {
		  newState.hasValue = nextProps.defaultValue;
		}

		if (hasErrorProp) newState.errorText = nextProps.errorText;
		if (newState) this.setState(newState);
	},

	render: function() {
		var {
		  className,
		  errorText,
		  floatingLabelText,
		  hintText,
		  id,
		  multiLine,
		  onBlur,
		  onChange,
		  onFocus,
		  type,
		  ...other
		} = this.props;

		var classes = this.getClasses('dig-text-field', {
		  'dig-has-error': this.state.errorText,
		  'dig-has-floating-labels': this.props.floatingLabelText,
		  'dig-has-value': this.state.hasValue,
		  'dig-is-disabled': this.props.disabled,
		  'dig-is-focused': this.state.isFocused,
		  'dig-is-multiLine': this.props.multiLine
		});

		var inputId = this.props.id || UniqueId.generate();

		var errorTextElement = this.state.errorText ? (
		  <div className="dig-text-field-error">{this.state.errorText}</div>
		) : null;

		var hintTextElement = this.props.hintText ? (
		  <div className="dig-text-field-hint">{this.props.hintText}</div>
		) : null;

		var floatingLabelTextElement = this.props.floatingLabelText ? (
		  <label
		    className="dig-text-field-floating-label"
		    htmlFor={inputId}>
		    {this.props.floatingLabelText}
		  </label>
		) : null;

		var inputProps = {
		  ref: 'input',
		  className: 'dig-text-field-input',
		  id: inputId,
		  onBlur: this._handleInputBlur,
		  onFocus: this._handleInputFocus,
		  onKeyDown: this._handleInputKeyDown
		};

		if (!this.props.hasOwnProperty('valueLink')) {
		  inputProps.onChange = this._handleInputChange;
		}

		var inputElement = this.props.multiLine ? (
		  <EnhancedTextarea
		    {...other}
		    {...inputProps}
		    onHeightChange={this._handleTextAreaHeightChange}
		    textareaClassName="dig-text-field-textarea" />
		) : (
		  <input
		    {...other}
		    {...inputProps}
		    type={this.props.type} />
		);

		return (
			<div className={classes}>

		        {floatingLabelTextElement}
		        {hintTextElement}
		        {inputElement}

		        <hr className="dig-text-field-underline" />
		        <hr className="dig-text-field-focus-underline" />

		        {errorTextElement}

	      </div>
		);
	},

	blur: function() {
	  if (this.isMounted()) this._getInputNode().blur();
	},

	clearValue: function() {
	  this.setValue('');
	},

	focus: function() {
	  if (this.isMounted()) this._getInputNode().focus();
	},

	getValue: function() {
	  return this.isMounted() ? this._getInputNode().value : undefined;
	},

	setErrorText: function(newErrorText) {
	  if (process.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
	    console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
	  } else if (this.isMounted()) {
	    this.setState({errorText: newErrorText});
	  }
	},

	setValue: function(newValue) {
	  if (process.NODE_ENV !== 'production' && this._isControlled()) {
	    console.error('Cannot call TextField.setValue when value or valueLink is defined as a property.');
	  } else if (this.isMounted()) {
	    this._getInputNode().value = newValue;
	    this.setState({hasValue: newValue});
	  }
	},

	hasError: function() {
	  return this.state.errorText ? true : false;
	},

	_getInputNode: function() {
	  return this.props.multiLine ?
	    this.refs.input.getInputNode() : ReactDOM.findDOMNode(this.refs.input);
	},

	_handleInputBlur: function(e) {
	  this.setState({isFocused: false});
	  if (this.props.onBlur) this.props.onBlur(e);
	},

	_handleInputChange: function(e) {
	  this.setState({
	  	hasValue: e.target.value
	  });
	  if (this.props.isRequired) {
	  	var newErrorText = '';
	  	if (!e.target.value) {
	  		newErrorText = this.props.errorText ? this.props.errorText : this.props.requireErrorText;
	  	};
	    this.setState({
	    	errorText: newErrorText
	    });
	  }
	  if (this.props.onChange) this.props.onChange(e);
	},

	_handleInputFocus: function(e) {
	  this.setState({isFocused: true});
	  if (this.props.onFocus) this.props.onFocus(e);
	},

	_handleInputKeyDown: function(e) {
	  if (e.keyCode === 13 && this.props.onEnterKeyDown) this.props.onEnterKeyDown(e);
	  if (this.props.onKeyDown) this.props.onKeyDown(e);
	},

	_handleTextAreaHeightChange: function(e, height) {
	  var newHeight = height + 24;
	  if (this.props.floatingLabelText) newHeight += 24;
        ReactDOM.findDOMNode(this).style.height = newHeight + 'px';
	},

	_isControlled: function() {
	  return this.props.hasOwnProperty('value') ||
	    this.props.hasOwnProperty('valueLink');
	}
});

module.exports = TextField;