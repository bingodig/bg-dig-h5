var React = require('react');
var Classable = require('../../mixins/classable');

var SubheaderMenuItem = React.createClass({

    mixins: [Classable],

	propTypes: {
	    index: React.PropTypes.number.isRequired,
	    text: React.PropTypes.string
	},

	render: function() {
        var classes = this.getClasses('dig-subheader', {
            'dig-subheader-text': this.props.text
        });

		return (
			<div key={this.props.index} className={classes}>{this.props.text}</div>
		);
	}

});

module.exports = SubheaderMenuItem;