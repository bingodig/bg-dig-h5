var React = require('react');
var Classable = require('../mixins/classable');
var KeyCode = require('../utils/key-code');
var UniqueId = require('../utils/unique-id');
var WindowListenable = require('../mixins/window-listenable');
var Paper = require('./paper');
var Overlay = require('./overlay');

var LeftNav = React.createClass({

	mixins: [Classable, WindowListenable],

	propTypes: {
	  docked: React.PropTypes.bool,
	  header: React.PropTypes.element,
	  onChange: React.PropTypes.func,
	  selectedKey: React.PropTypes.string,
	  onNavOpen: React.PropTypes.func,
	  onNavClose: React.PropTypes.func
	},

	windowListeners: {
	  'keyup': '_onWindowKeyUp'
	},

	getDefaultProps: function() {
		return {
			docked: true
		};
	},

	getInitialState: function() {
		return {
			open: this.props.docked
		};
	},

	render: function() {

		var classes = this.getClasses('dig-left-nav', {
		    'dig-closed': !this.state.open
		});

		var selectedIndex = this.props.selectedIndex;
		var overlay;

		if (!this.props.docked) {
			overlay = <Overlay show={this.state.open} onTouchTap={this._onOverlayTouchTap} />;
		};

		var header = this.props.header ? this.props.header : null;


		return (
			<div className={classes}>
			  {overlay}
			  <Paper
			    ref="clickAwayableElement"
			    className="dig-left-nav-menu"
			    zDepth={2}
			    rounded={false}>
			    {header}
                  {this.props.children}
			  </Paper>
			</div>
		);
	},


	toggle: function() {
	  this.setState({ open: !this.state.open });
	  return this;
	},

	close: function() {
	  this.setState({ open: false });
	  if (this.props.onNavClose) this.props.onNavClose();
	  return this;
	},

	open: function() {
	  this.setState({ open: true });
	  if (this.props.onNavOpen) this.props.onNavOpen();
	  return this;
	},

	_onMenuItemClick: function(e) {
	    this.props.onChange(e);
	    if (!this.props.docked) this.close();
	},

	_onOverlayTouchTap: function() {
	  this.close();
	},

	_onWindowKeyUp: function(e) {
	  if (e.keyCode == KeyCode.ESC &&
	      !this.props.docked &&
	      this.state.open) {
	    this.close();
	  }
	}

});

module.exports = LeftNav;