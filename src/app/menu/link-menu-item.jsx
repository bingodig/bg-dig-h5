var React = require('react');
var Classable = require('../../mixins/classable');

require('./style/index.scss');

var LinkMenuItem = React.createClass({

	mixins: [Classable],

	propTypes: {
		index: React.PropTypes.number.isRequired,
		text: React.PropTypes.string.isRequired,
		payload: React.PropTypes.string.isRequired,
		target: React.PropTypes.string,
		disabled: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			disabled: false
		};
	},

	render: function() {

		var {
			className,
			...other
		} = this.props;

		var classes = this.getClasses('dig-menu-item', {
			'dig-is-disabled': this.props.disabled
		});

		var linkProps = {
		  className: classes,
		  key: this.props.index,
		  target: this.props.target,
		  onClick: (this.props.disabled) ? this._stopLink : undefined
		};

		// Prevent context menu 'Open In New Tab/Window'
		var linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
		linkProps[linkAttribute] = this.props.payload;

		return (
			<a {...other} {...linkProps} >{this.props.text}</a>
		);
	},

	_stopLink: function(event) {
	  event.preventDefault();
	}

});

module.exports = LinkMenuItem;