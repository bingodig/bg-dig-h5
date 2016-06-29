var React = require('react');
var Classable = require('../../mixins/classable');

require('./style/index.scss');

var SvgIcon = React.createClass({

	mixins: [Classable],

	render: function() {

		var classes = this.getClasses('dig-svg-icon');

		return (
			<svg
			  {...this.props}
			  className={classes}
			  viewBox="0 0 24 24">
			  {this.props.children}
			</svg>
		);
	}

});

module.exports = SvgIcon;