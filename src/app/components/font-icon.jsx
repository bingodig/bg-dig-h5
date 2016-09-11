var React = require('react');
var Classable = require('../mixins/classable');

var FontIcon = React.createClass({

	mixins: [Classable],

	propTypes: {
    	hasCounts: React.PropTypes.bool,
    	counts: React.PropTypes.number,
    	midSize: React.PropTypes.bool,
    	minSize: React.PropTypes.bool
  	},

  	getDefaultProps: function() {
  		return {
  			hasCounts: false,
  			counts: 0,
  			midSize: false,
			minSize: false
  		};
  	},

	render: function() {

		var {
		  className,
		  ...other
		} = this.props;

		var classes = this.getClasses('dig-font-icon', {
			'mid-size': this.props.midSize,
			'min-size': this.props.minSize
		});

		var countChild = this.props.hasCounts ? (<i className="dig-font-counts">{this.props.counts}</i>) : null;
		return (
			<span {...other} className={classes} >
				{countChild}
			</span>
		);
	}

});

module.exports = FontIcon;