var React = require('react');
var Classable = require('../mixins/classable');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({

	mixins: [Classable],

	propTypes: {
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		label: function(props, propName, componentName){
		  if (!props.children && !props.label) {
		    return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
		  }
		},
		primary: React.PropTypes.bool,
		secondary: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		onBlur: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onTouchTap: React.PropTypes.func,
		onMouseOver: React.PropTypes.func,
		onMouseOut: React.PropTypes.func
	},

	render: function() {

		var {
			label,
			primary,
			secondary,
			disableOverRipple,
			...other
		} = this.props;

		var classes = this.getClasses('dig-flat-button', {
			'dig-is-primary': !this.props.disabled && primary,
			'dig-is-secondary': !this.props.disabled && !primary && secondary
		});

		var children;

		if (label) children = <span className="dig-flat-button-label">{label}</span>;
		else children = this.props.children;

		return (
			<EnhancedButton 
				disableOverRipple={true}
				{...other} 
				className={classes}>
				{children}
			</EnhancedButton>
		);
	}

});

module.exports = FlatButton;