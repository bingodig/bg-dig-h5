
var React = require('react');
var Classable = require('../../mixins/classable');
var Paper = require('../paper/paper.jsx');
var EnhancedSwitch = require('../enhanced-switch/enhanced-switch.jsx');

require('./style/index.scss');

var Toggle = React.createClass({

	mixins: [Classable],

	propTypes: {
		onToggle: React.PropTypes.func,
		toggled: React.PropTypes.bool,
		defaultToggled: React.PropTypes.bool
	},

	render: function() {

		var {
		  labelPosition,
		  onToggle,
		  ...other
		} = this.props;

		var classes = this.getClasses("dig-toggle");

		var toggleElement = (
		  <div>
		    <div className="dig-toggle-track" />
		    <Paper className="dig-toggle-thumb" zDepth={1}/>
		  </div>
		);

		var enhancedSwitchProps = {
		  ref: "enhancedSwitch",
		  inputType: "checkbox",
		  switchElement: toggleElement,
		  className: classes,
		  iconClassName: "dig-toggle-icon",
		  onSwitch: this._handleToggle,
		  defaultSwitched: this.props.defaultToggled,
		  labelPosition: labelPosition ? labelPosition : "left"
		};

		if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

		return (
			<EnhancedSwitch 
		        {...other}
		        {...enhancedSwitchProps}/>
		);
	},

	isToggled: function() {
	  return this.refs.enhancedSwitch.isSwitched();
	},

	setToggled: function(newToggledValue) {
	  this.refs.enhancedSwitch.setSwitched(newToggledValue);
	},

	_handleToggle: function(e, isInputChecked) {
	  if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
	}

});

module.exports = Toggle;