var React = require('react');
var ReactDOM = require('react-dom');
var CssEvent = require('../utils/css-event');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/click-awayable');
var FlatButton = require('./flat-button');

var Snackbar = React.createClass({

	mixins: [Classable, ClickAwayable],

	manuallyBindClickAway: true,

	propTypes: {
	  action: React.PropTypes.string,
	  message: React.PropTypes.string.isRequired,
      duration: React.PropTypes.number,
	  openOnMount: React.PropTypes.bool,
	  onActionTouchTap: React.PropTypes.func
	},

    getDefaultProps: function() {
      return {
          message: '',
          openOnMount: false,
          duration: 3
      };
    },

	getInitialState: function() {
	  return {
	    open: this.props.openOnMount
	  };
	},

	componentClickAway: function() {
	  this.dismiss();
	},

	componentDidUpdate: function(prevProps, prevState) {
	  if (prevState.open != this.state.open) {
	    if (this.state.open) {
	      //Only Bind clickaway after transition finishes
	      CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), function() {
	        this._bindClickAway();
	      }.bind(this));
	    } else {
	      this._unbindClickAway();
	    }
	  }
	},

	render: function() {

		var classes = this.getClasses('dig-snackbar', {
		  'dig-is-open': this.state.open
		}); 
		var action;

		if (this.props.action) {
		  action = (
		    <FlatButton
		      className="dig-snackbar-action"
		      label={this.props.action}
		      onTouchTap={this.props.onActionTouchTap} />
		  );
		}

		return (
			<span className={classes}>
			  <span className="dig-snackbar-message">{this.props.message}</span>
			  {action}
			</span>
		);
	},

	show: function() {
	  this.setState({ open: true });

	  setTimeout(function() {
	  	this.setState({ open: false });
	  }.bind(this), this.props.duration * 1000);
	},
	
	dismiss: function() {
	  this.setState({ open: false });
	}

});

module.exports = Snackbar;