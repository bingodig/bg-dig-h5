var React = require('react');
var Classable = require('../mixins/classable');
var KeyCode = require('../utils/key-code');
var WindowListenable = require('../mixins/window-listenable');
var FocusRipple = require('./ripples/focus-ripple');
var OverRipple = require('./ripples/over-ripple');
var TouchRipple = require('./ripples/touch-ripple');

var EnhancedButton = React.createClass({

	mixins: [Classable, WindowListenable],

	propTypes: {
		className: React.PropTypes.string,
		centerRipple: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		disableFocusRipple: React.PropTypes.bool,
		disableTouchRipple: React.PropTypes.bool,
		disableOverRipple: React.PropTypes.bool,
		linkButton: React.PropTypes.bool,
		onBlur: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onTouchTap: React.PropTypes.func,
		onMouseOver: React.PropTypes.func,
		onMouseOut: React.PropTypes.func
	},

	windowListeners: {
	  'keydown': '_handleWindowKeydown',
	  'keyup': '_handleWindowKeyup'
	},

	getInitialState: function() {
		return {
			isKeyboardFocused: false,
			isMouseOvered: false
		};
	},

	render: function() {

		var {
		  className,
		  centerRipple,
		  disabled,
		  disableFocusRipple,
		  disableTouchRipple,
		  disableOverRipple,
		  linkButton,
		  onBlur,
		  onFocus,
		  onMouseOver,
		  onMouseOut,
		  onTouchTap,
		  ...other } = this.props;

		var classes = this.getClasses('dig-enhanced-button', {
			'dig-is-disabled': disabled,
			'dig-is-keyboard-focused': this.state.isKeyboardFocused,
			'dig-is-mouse-overed': this.state.isMouseOvered,
			'dig-is-link-button': linkButton
		});

		var touchRipple = (
		  <TouchRipple
		    key="touchRipple"
		    centerRipple={centerRipple}>
		    {this.props.children}
		  </TouchRipple>
		);

		var focusRipple = (
			<FocusRipple
			  key="focusRipple"
			  show={this.state.isKeyboardFocused} />
		);

		var overRipple = (
			<OverRipple
			  key="overRipple"
			  show={this.state.isMouseOvered} />
		);

		var buttonProps = {
			className: classes,
			disabled: disabled,
			onBlur: this._handleBlur,
			onFocus: this._handleFocus,
			onMouseOver: this._handleMouseOver,
			onMouseEnter: this._handleMouseOver,
			onMouseOut: this._handleMouseOut,
			onTouchTap: this._handleTouchTap
		};

		var buttonChildren = [
			disabled || disableOverRipple ? null : overRipple,
			disabled || disableTouchRipple ? this.props.children : touchRipple,
			disabled || disableFocusRipple ? null : focusRipple
		];

		if (disabled && linkButton) {
			return (
				<span key="linkButton" {...other}
					className={classes}
					disabled={disabled}>
					{this.props.children}
				</span>
			);
		}

		return linkButton ? (
			<a {...other} {...buttonProps}>
				{buttonChildren}
			</a>
		) : (
			<button {...other} {...buttonProps}>
				{buttonChildren}
			</button>
		);
	},

	isKeyboardFocused: function() {
	  return this.state.isKeyboardFocused;
	},

	isMouseOvered: function() {
	  return this.state.isMouseOvered;
	},

	_handleWindowKeydown: function(e) {
	  if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
	  if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
	    this._handleTouchTap(e);
	  }
	},

	_handleWindowKeyup: function(e) {
	  if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
	    this._handleTouchTap(e);
	  }
	},

	_handleBlur: function(e) {
	  this.setState({
	    isKeyboardFocused: false
	  });

	  if (this.props.onBlur) this.props.onBlur(e);
	},

	_handleFocus: function(e) {
	  //setTimeout is needed becuase the focus event fires first
	  //Wait so that we can capture if this was a keyboard focus
	  //or touch focus
	  setTimeout(function() {
	    if (this._tabPressed) {
	      this.setState({
	        isKeyboardFocused: true
	      });
	    }
	  }.bind(this), 150);
	  
	  if (this.props.onFocus) this.props.onFocus(e);
	},

	_handleMouseOut: function(e) {
	  this.setState({
	    isMouseOvered: false
	  });

	  if (this.props.onMouseOut) this.props.onMouseOut(e);
	},

	_handleMouseOver: function(e) {
	  this.setState({
	    isMouseOvered: true
	  });

	  if (this.props.onMouseOver) this.props.onMouseOver(e);
	},

	_handleTouchTap: function(e) {
	  if (!this.props.disabled) {
	    this._tabPressed = false;
	    this.setState({
	      isKeyboardFocused: false,
	      isMouseOvered: false
	    });
	   
	    if (this.props.onTouchTap) this.props.onTouchTap(e);
	  }
	}

});

module.exports = EnhancedButton;