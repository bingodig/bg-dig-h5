
var React = require('react');
var Classable = require('../../mixins/classable');
var EnhancedButton = require('../enhanced-button/enhanced-button.jsx');
var FontIcon = require('../font-icon/font-icon.jsx');
var Paper = require('../paper/paper.jsx');

require('./style/index.scss');

var FloatingActionButton = React.createClass({

	mixins: [Classable],

	propTypes: {
	  className: React.PropTypes.string,
	  iconClassName: React.PropTypes.string,
	  mini: React.PropTypes.bool,
	  onMouseDown: React.PropTypes.func,
	  onMouseUp: React.PropTypes.func,
	  onMouseOut: React.PropTypes.func,
	  onTouchEnd: React.PropTypes.func,
	  onTouchStart: React.PropTypes.func,
	  onClick: React.PropTypes.func,
	  secondary: React.PropTypes.bool
	},

	getInitialState: function() {
		var zDepth = this.props.disabled ? 0 : 2;
		return {
		  zDepth: zDepth,
		  initialZDepth: zDepth
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if(nextProps.disabled !== this.props.disabled){
		  var zDepth = nextProps.disabled ? 0 : 2;
		  return {
		    zDepth: zDepth,
		    initialZDepth: zDepth
		  };
		}
	},

	componentDidMount: function() {
		if (process.NODE_ENV !== 'production') {
		  if (this.props.iconClassName && this.props.children) {
		    var warning = 'You have set both an iconClassName and a child icon. ' +
		                  'It is recommended you use only one method when adding ' +
		                  'icons to FloatingActionButtons.';
		    console.warn(warning);
		  }
		}
	},

	render: function() {

		var {
		  icon,
		  mini,
		  secondary,
		  ...other } = this.props;

		var classes = this.getClasses('dig-floating-action-button', {
		  'dig-is-mini': mini,
		  'dig-is-secondary': !this.props.disabled && secondary
		});

		var icon;
		if (this.props.iconClassName){
			icon = <FontIcon className={"dig-floating-action-button-icon " + this.props.iconClassName} />
		}

		return (
			<Paper
			  className={classes}
			  innerClassName="dig-floating-action-button-inner"
			  zDepth={this.state.zDepth}
			  circle={true}>

			  <EnhancedButton {...other}
			    className="dig-floating-action-button-container"
			    disableOverRipple={true}
			    onMouseDown={this._handleMouseDown}
			    onMouseUp={this._handleMouseUp}
			    onMouseOut={this._handleMouseOut}
			    onTouchStart={this._handleTouchStart}
			    onTouchEnd={this._handleTouchEnd}>

			    {icon}
			    {this.props.children}
			  </EnhancedButton>
			</Paper>
		);
	},

	_handleMouseDown: function(e) {
	  if (e.button === 0) {
	    this.setState({ zDepth: this.state.initialZDepth + 1 });
	  }
	  if (this.props.onMouseDown) this.props.onMouseDown(e);
	},

	_handleMouseUp: function(e) {
	  this.setState({ zDepth: this.state.initialZDepth });
	  if (this.props.onMouseUp) this.props.onMouseUp(e);
	},

	_handleMouseOut: function(e) {
	  this.setState({ zDepth: this.state.initialZDepth });
	  if (this.props.onMouseOut) this.props.onMouseOut(e);
	},

	_handleTouchStart: function(e) {
	  this.setState({ zDepth: this.state.initialZDepth + 1 });
	  if (this.props.onTouchStart) this.props.onTouchStart(e);
	},

	_handleTouchEnd: function(e) {
	  this.setState({ zDepth: this.state.initialZDepth });
	  if (this.props.onTouchEnd) this.props.onTouchEnd(e);
	}

});

module.exports = FloatingActionButton;