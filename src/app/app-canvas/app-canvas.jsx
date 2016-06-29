var React = require('react');
var Classable = require('../../mixins/classable');

//require('./style/index.scss');

var AppCanvas = React.createClass({

	mixins: [Classable],

	propTypes: {
		isFullSize: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			isFullSize: false
		};
	},

	render: function() {

		var {
		  className,
		  isFullSize,
		  predefinedLayout,
		  ...other } = this.props;

		var classes = this.props.isFullSize ? 'dig-app-canvas' : 'dig-predefined-layout-1';

		return (
			<div {...other} className={classes}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = AppCanvas;