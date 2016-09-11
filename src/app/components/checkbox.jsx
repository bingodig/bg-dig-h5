var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var Classable = require('../mixins/classable');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked');

var Checkbox = React.createClass({

	mixins: [Classable],

	propTypes: {
	  onCheck: React.PropTypes.func,
	  name: React.PropTypes.string,
	  value: React.PropTypes.string,
	  label: React.PropTypes.string,
	  disabled: React.PropTypes.bool,
	  defaultChecked: React.PropTypes.bool,
	  labelPosition: React.PropTypes.oneOf(['left', 'right'])
	},

	render: function() {
		var {
		  onCheck,
		  ...other
		} = this.props;

		var classes = this.getClasses("dig-checkbox");

		var checkboxElement = (
		  <div>
		    <CheckboxOutline className="dig-checkbox-box" />
		    <CheckboxChecked className="dig-checkbox-check" />
		  </div>
		);

		var enhancedSwitchProps = {
		  ref: "enhancedSwitch",
		  inputType: "checkbox",
		  switchElement: checkboxElement,
		  className: classes,
		  iconClassName: "dig-checkbox-icon",
		  onSwitch: this._handleCheck,
		  defaultSwitched: this.props.defaultChecked,
		  labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
		};

		return (
			<EnhancedSwitch 
			  {...other}
			  {...enhancedSwitchProps}/>
		);
	},

	isChecked: function() {
	  return this.refs.enhancedSwitch.isSwitched();
	},

	setChecked: function(newCheckedValue) {
	  this.refs.enhancedSwitch.setSwitched(newCheckedValue);
	},

	_handleCheck: function(e, isInputChecked) {
	  if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
	}

});

module.exports = Checkbox;