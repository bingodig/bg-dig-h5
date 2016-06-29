
var React = require('react');
var Classable = require('../../mixins/classable');
var EnhancedSwitch = require('../enhanced-switch/enhanced-switch.jsx');
var RadioButtonOff = require('../svg-icons/toggle-radio-button-off.jsx');
var RadioButtonOn = require('../svg-icons/toggle-radio-button-on.jsx');

require('./style/index.scss');


var RadioButton = React.createClass({

	mixins: [Classable],

	propTypes: {
	  onCheck: React.PropTypes.func,
	  name: React.PropTypes.string,
	  value: React.PropTypes.string,
	  label: React.PropTypes.string,
	  disabled: React.PropTypes.bool,
	  defaultChecked: React.PropTypes.bool,
	  labelPosition: React.PropTypes.oneOf(['left', 'right']),
	  direction: React.PropTypes.oneOf(['row', 'column'])
	},

	render: function() {
		var {
		  onCheck,
		  ...other
		} = this.props;

		var radioButtonElement = (
		  <div>
		      <RadioButtonOff className="dig-radio-button-target" />
		      <RadioButtonOn className="dig-radio-button-fill" />
		  </div>
		);

		var classes = this.getClasses('dig-radio-button', {
		  'dig-direction-row': this.props.direction === 'row',
		  'dig-direction-column': this.props.direction === 'column'
		});

		var enhancedSwitchProps = {
		  ref: "enhancedSwitch",
		  inputType: "radio",
		  switchElement: radioButtonElement,
		  className: classes,
		  iconClassName: "dig-radio-button-icon",
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

	_handleCheck: function(e) {
	  if (this.props.onCheck) this.props.onCheck(e, this.props.value);
	},

	isChecked: function() {
	  return this.refs.enhancedSwitch.isSwitched();
	},

	setChecked: function(newCheckedValue) {
	  this.refs.enhancedSwitch.setSwitched(newCheckedValue);
	  this.setState({switched: newCheckedValue});
	},
	
	getValue: function() {
	  return this.refs.enhancedSwitch.getValue();
	}

});

module.exports = RadioButton;