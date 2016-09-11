var React = require('react');
var Classable = require('../mixins/classable');

var Paper = React.createClass({

	mixins: [Classable],

	propTypes: {
		circle: React.PropTypes.bool,
		innerClassName: React.PropTypes.string,
		innerStyle: React.PropTypes.object,
		rounded: React.PropTypes.bool,
		zDepth: React.PropTypes.oneOf([0,1,2,3,4,5])
	},

	getDefaultProps: function() {
		return {
			innerClassName: '',
			rounded: true,
			zDepth: 1
		};
	},

	render: function() {

		var {
		  className,
		  circle,
		  innerClassName,
		  rounded,
		  zDepth,
		  innerStyle,
		  ...other } = this.props;

		var classes = this.getClasses('dig-paper ' + 'dig-z-depth-' + this.props.zDepth, {
			'dig-rounded': this.props.rounded,
			'dig-circle': this.props.circle
		});

		var insideClasses = this.props.innerClassName + ' ' + 'dig-paper-container ' + 'dig-z-depth-bottom';

		return (
			<div {...other} className={classes}>
				<div ref="innerContainer" className={insideClasses} style={this.props.innerStyle || {}}>
				    {this.props.children}
				</div>
			</div>
		);
	},

	getInnerContainer: function() {
	  return this.refs.innerContainer;
	}

});

module.exports = Paper;