var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Tooltip = require('./tooltip');

var IconButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool,
    hasCounts: React.PropTypes.bool,
    counts: React.PropTypes.number,
    midSize: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      placement: 'bottom',
      hasCounts: false,
      counts: 0,
      midSize: false
    };
  },

  getInitialState: function() {
    return {
      tooltipShown: false 
    };
  },

  componentDidMount: function() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }
    if (process.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  render: function() {
    var {
      tooltip,
      touch,
      ...other } = this.props;

    var classes = this.getClasses('dig-icon-button', {
      'mid-size': this.props.midSize
    });
    var tooltip;
    var fonticon;

    if (this.props.tooltip) {
      tooltip = (
        <Tooltip
          ref="tooltip"
          label={tooltip}
          show={this.state.tooltipShown}
          touch={touch} />

          //className="dig-icon-button-tooltip"
      );
    }

    if (this.props.iconClassName) {
      fonticon = (
        <FontIcon 
          className={this.props.iconClassName} 
          hasCounts={this.props.hasCounts}
          counts={this.props.counts}
          midSize={this.props.midSize} />
      );
    }

    return (
      <EnhancedButton {...other}
        ref="button"
        centerRipple={true}
        className={classes}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}>

        {tooltip}
        {fonticon}
        {this.props.children}

      </EnhancedButton>
    );
  },

  _positionTooltip: function() {
    var tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
    var tooltipWidth = tooltip.offsetWidth;
    var tooltipHeight = tooltip.offsetHeight;

    var button = ReactDOM.findDOMNode(this);
    var buttonWidth = button.offsetWidth;
    var buttonHeight = button.offsetHeight;

    switch (this.props.placement) {
      case 'right':
        break;
      case 'left':
        break;
      case 'top':
        tooltip.style.left = (buttonWidth - tooltipWidth) / 2 + 'px';
        tooltip.style.top = (buttonHeight + tooltipHeight) * -3 / 4 + 'px';
        break;
      case 'bottom':
        tooltip.style.left = (buttonWidth - tooltipWidth) / 2 + 'px';
        tooltip.style.top = buttonHeight * 3 / 4 + 'px';
        break;
      default:
        throw new Error('_positionTooltip(): No such placement of "' + this.props.placement + '" found.');
    }
  },

  _showTooltip: function() {
    if (!this.props.disabled) this.setState({ tooltipShown: true });
  },

  _hideTooltip: function() {
    this.setState({ tooltipShown: false });
  },

  _handleBlur: function(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    this._showTooltip();
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  }

});

module.exports = IconButton;
