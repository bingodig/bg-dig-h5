var React = require('react');
var Permission = require('../../utils/permission');

var PermissionValidate = React.createClass({

    propTypes: {
        permissionId: React.PropTypes.string.isRequired
    },

	getInitialState: function() {
		return {
			isValidatePass: false
		};
	},

    componentWillMount: function() {
        Permission.checkPermission(this.props.permissionId, function(isValidatePass) {
            this.setState({
                isValidatePass: isValidatePass
            });
        }.bind(this));
    },

	render: function() {
		var element = this.state.isValidatePass ? this.props.children : null;
		return (
            <span>{element}</span>
		);
	}

});

module.exports = PermissionValidate;

