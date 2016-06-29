var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../../mixins/classable');

require('./style/index.scss');

var FocusRipple = React.createClass({

	mixins: [Classable],

	propTypes: {
		show: React.PropTypes.bool
	},

	componentDidMount: function() {
		this._setRippleSize();
	},

	render: function() {

		var classes = this.getClasses("dig-focus-ripple", {
			'dig-is-shown': this.props.show
		});

		return (
			<div className={classes}>
				<div className="dig-focus-ripple-inner" />
			</div>
		);
	},

	_setRippleSize: function() {
	  var el = ReactDOM.findDOMNode(this);
	  var height = el.offsetHeight;
	  var width = el.offsetWidth;
	  var size = Math.max(height, width);

	  el.style.height = size + 'px';
	  el.style.top = (size / 2 * -1) + (height / 2) + 'px';
	}

});

module.exports = FocusRipple;