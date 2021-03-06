var React = require('react');
var AutoResponsiveReact = require('autoresponsive-react');

var AutoResponsive = React.createClass({
	render: function() {
		var {
		  children,
		  ...other
		} = this.props;

		return (
			<AutoResponsiveReact {...other}>
			  {children}
			</AutoResponsiveReact>
		);
	}
});

module.exports = AutoResponsive;