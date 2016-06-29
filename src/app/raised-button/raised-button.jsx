
var React = require('react');
var Classable = require('../../mixins/classable');
var EnhancedButton = require('../enhanced-button/enhanced-button.jsx');
var Paper = require('../paper/paper.jsx');

require('./style/index.scss');

var RaisedButton = React.createClass({

    getDefaultProps: function() {
      return {
          disabled: false,
          primary: false,
          secondary: false,
          minSize: false
      };
    },

	mixins: [Classable],

	propTypes: {
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		label: function(props, propName, componentName){
		  if (!props.children && !props.label) {
		    return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
		  }
		},
		onMouseDown: React.PropTypes.func,
		onMouseUp: React.PropTypes.func,
		onMouseOut: React.PropTypes.func,
		onTouchEnd: React.PropTypes.func,
		onTouchStart: React.PropTypes.func,
		onClick: React.PropTypes.func,
		primary: React.PropTypes.bool,
		secondary: React.PropTypes.bool,
        minSize: React.PropTypes.bool
	},

	getInitialState: function() {
		var zDepth = this.props.disabled ? 0 : 1;
		return {
			zDepth: zDepth,
			initialZDepth: zDepth
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if(nextProps.disabled !== this.props.disabled){
			var zDepth = nextProps.disabled ? 0 : 1;
			this.setState({
			  zDepth: zDepth,
			  initialZDepth: zDepth
			});
		}
	},

	render: function() {
		var {
		  label,
		  primary,
		  secondary,
          minSize,
		  ...other } = this.props;

		var classes = this.getClasses('dig-raised-button', {
		  'dig-min-size': minSize,
		  'dig-is-primary': !this.props.disabled && primary,
		  'dig-is-secondary': !this.props.disabled && !primary && secondary
		});

		var children;

        var labelClass = "dig-raised-button-label";

        if(minSize) labelClass = labelClass + ' dig-min-size';

		if (label) children = <span className={labelClass}>{label}</span>;
		else children = this.props.children;


		return (
			<Paper className={classes} zDepth={this.state.zDepth}>
			  <EnhancedButton {...other}
			    className="dig-raised-button-container" 
			    disableOverRipple={true}
			    onMouseUp={this._handleMouseUp}
			    onMouseDown={this._handleMouseDown}
			    onMouseOut={this._handleMouseOut}
			    onTouchStart={this._handleTouchStart}
			    onTouchEnd={this._handleTouchEnd}>
			    {children}
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

module.exports = RaisedButton;