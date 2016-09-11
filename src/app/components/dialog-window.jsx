var React = require('react');
var ReactDOM = require('react-dom');
var WindowListenable = require('../mixins/window-listenable');
var CssEvent = require('../utils/css-event');
var KeyCode = require('../utils/key-code');
var Classable = require('../mixins/classable');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var DialogWindow = React.createClass({

	mixins: [Classable, WindowListenable],

	propTypes: {
	  actions: React.PropTypes.array,
	  contentClassName: React.PropTypes.string,
	  openImmediately: React.PropTypes.bool,
	  onClickAway: React.PropTypes.func,
	  onDismiss: React.PropTypes.func,
	  onShow: React.PropTypes.func,
	  repositionOnUpdate: React.PropTypes.bool
	},

	windowListeners: {
	  'keyup': '_handleWindowKeyUp'
	},

	getDefaultProps: function() {
	  return {
	    actions: [],
	    repositionOnUpdate: true
	  };
	},

	getInitialState: function() {
	  return {
	    open: this.props.openImmediately || false
	  };
	},

	componentDidMount: function() {
	  this._positionDialog();
	  if (this.props.openImmediately) {
	    this.refs.dialogOverlay.preventScrolling();
	    this._onShow();
	  }
	},

	componentDidUpdate: function (prevProps, prevState) {
	  this._positionDialog();
	},

	render: function() {

		var classes = this.getClasses('dig-dialog-window', { 
		  'dig-is-shown': this.state.open
		});
		var contentClasses = 'dig-dialog-window-contents';
		var actions = this._getActionsContainer(this.props.actions);

		if (this.props.contentClassName) {
		  contentClasses += ' ' + this.props.contentClassName;
		}

		return (
			<div className={classes}>
			  <Paper ref="dialogWindow" className={contentClasses} zDepth={4}>
			    {this.props.children}
			    {actions}
			  </Paper>
			  <Overlay ref="dialogOverlay" show={this.state.open} autoLockScrolling={false} onTouchTap={this._handleOverlayTouchTap} />
			</div>
		);
	},

	isOpen: function() {
	  return this.state.open;
	},

	dismiss: function() {
	  CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), function() {
	    this.refs.dialogOverlay.allowScrolling();
	  }.bind(this));

	  this.setState({ open: false });
	  this._onDismiss();
	},

	show: function() {
	  this.refs.dialogOverlay.preventScrolling();

	  this.setState({ open: true });
	  this._onShow();
	},

	_getAction: function(actionJSON, key) {
	  var onClickHandler = function() {
	  	this.dismiss();
	  	if (actionJSON.onClick) {
	  		actionJSON.onClick();
	  	}

	  	if (actionJSON.onTouchTap) {
	  		actionJSON.onTouchTap();
	  	}
	  }.bind(this);

	  return (
	    <FlatButton
	      key={key}
	      primary={true}
	      onClick={onClickHandler}
	      label={actionJSON.text} />
	  );
	},

	_getActionsContainer: function(actions) {
	  var actionContainer;
	  var actionObjects = [];

	  if (actions.length) {
	    for (var i = 0; i < actions.length; i++) {
	      var currentAction = actions[i];
	      var tempAction;

	      //if the current action isn't a react object, create one
	      if (!React.isValidElement(currentAction)) {
	        tempAction = this._getAction(currentAction, i);
	      }else{
	      	var hasOnClickProp = currentAction.props.hasOwnProperty('onClick');
	      	var hasOnTouchTapProp = currentAction.props.hasOwnProperty('onTouchTap');
	      	var self = this;
	      	if (hasOnClickProp) {
	      		var tempOnClick = currentAction.props.onClick;
	      		(function(touchAction){
		      	    var onClickHandler = function() {
		      		   	self.dismiss();
		      		    touchAction();
		      		};
		      		tempAction = React.cloneElement(currentAction, { key: currentAction.key, onClick: onClickHandler });
	      		})(tempOnClick);
	      	}

	      	if (hasOnTouchTapProp) {
	      	    var tempOnTouchTap = currentAction.props.onTouchTap;
	      	    (function(touchAction){
		      	    var onTouchTapHandler = function() {
		      		   	self.dismiss();
		      		    touchAction();
		      		};
		      		tempAction = React.cloneElement(currentAction, { key: currentAction.key, onTouchTap: onTouchTapHandler });
	      		})(tempOnTouchTap);
	      	}
	      }
          var classes = this.getClasses('dig-dialog-window-action', {
              [tempAction.props.className]: !!tempAction.props.className
          });

	      tempAction = React.cloneElement(tempAction, { className: classes });

	      actionObjects.push(tempAction);
	    }

	    actionContainer = (
	      <div className="dig-dialog-window-actions">
	        {actionObjects}
	      </div>
	    );
	  }

	  return actionContainer;
	},

	_positionDialog: function() {
	  var container, dialogWindow, containerHeight, dialogWindowHeight;

	  if (this.state.open) {

	    container = ReactDOM.findDOMNode(this),
	    dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow),
	    containerHeight = container.offsetHeight,

	    //Reset the height in case the window was resized.
	    dialogWindow.style.height = '';
	    dialogWindowHeight = dialogWindow.offsetHeight;

	    //Vertically center the dialog window, but make sure it doesn't
	    //transition to that position.
	    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
	      container.style.paddingTop = 
	        ((containerHeight - dialogWindowHeight) / 2) - 64 + 'px';
	    }
	  }
	},
	
	_onShow: function() {
	  if (this.props.onShow) this.props.onShow();
	},
	
	_onDismiss: function() {
	  if (this.props.onDismiss) this.props.onDismiss();
	},

	_handleOverlayTouchTap: function() {
	  this.dismiss();
	  if (this.props.onClickAway) this.props.onClickAway();
	},

	_handleWindowKeyUp: function(e) {
	  if (e.keyCode == KeyCode.ESC) {
	    this.dismiss();
	  }
	}

});

module.exports = DialogWindow;