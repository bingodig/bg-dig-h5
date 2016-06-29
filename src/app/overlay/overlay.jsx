
var React = require('react');
var Classable = require('../../mixins/classable');

require('./style/index.scss');


var Overlay = React.createClass({

	mixins: [Classable],

	propTypes: {
		show: React.PropTypes.bool,
		autoLockScrolling: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			autoLockScrolling: true
		};
	},

	componentDidUpdate: function(prevProps, prevState) {
	  if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
	},

	render: function() {

		var 
		  {
		    className,
		    ...other
		  } = this.props;

		var classes = this.getClasses('dig-overlay', {
			'dig-is-shown': this.props.show
		});

		return (
			<div {...other} className={classes} />
		);
	},

	preventScrolling: function() {
	  if (!this.props.autoLockScrolling) this._preventScrolling();
	},
	
	allowScrolling: function() {
	  if (!this.props.autoLockScrolling) this._allowScrolling();
	},
	
	_preventScrolling: function() {
	  var body = document.getElementsByTagName('body')[0];
	  body.style.overflow = 'hidden';
	},
	
	_allowScrolling: function() {
	  var body = document.getElementsByTagName('body')[0];
	  body.style.overflow = '';
	}

});

module.exports = Overlay;