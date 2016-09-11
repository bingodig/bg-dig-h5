var React = require('react');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/click-awayable');
var Paper = require('./paper');
var IconButton = require('./icon-button');
var DropDownContainer = require('./drop-down-container');

var DropDownButton = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    iconClassName: React.PropTypes.string.isRequired,
    closeOnMenuItemClick: React.PropTypes.bool,
    menuPosition: React.PropTypes.oneOf(['leftBottom', 'RightBottom']),
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool,
    hasCounts: React.PropTypes.bool,
    counts: React.PropTypes.number,
    midSize: React.PropTypes.bool,
    dropDownContainerWidth: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      open: false
    }
  },
  
  getDefaultProps: function() {
    return {
      closeOnMenuItemClick: true,
      menuPosition: 'leftBottom',
      dropDownContainerWidth: 120
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  render: function() {
    var classes = this.getClasses('dig-drop-down-button', {
      'mid-size': this.props.midSize,
      'dig-open': this.state.open,
      'dig-leftBottom': this.props.menuPosition == "leftBottom",
      'dig-RightBottom': this.props.menuPosition == "RightBottom"
    });

    var iconButtonProps = {
      iconClassName: this.props.iconClassName,
      midSize: this.props.midSize,
      hasCounts: this.props.hasCounts,
      counts: this.props.counts,
      tooltip: this.props.tooltip,
    };

    var icon;
    if (this.props.iconClassName) {
      icon =  (<IconButton  {...iconButtonProps}/>)
    }
   
    return (
      <div className={classes}>
          <div className="dig-drop-down-control" onClick={this._onControlClick}>
              {icon}
          </div>
          <DropDownContainer visible={this.state.open} zDepth={1} Width={this.props.dropDownContainerWidth}>
            {this.props.children}
          </DropDownContainer>
        </div>
    );
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);
    
    if (this.props.closeOnMenuItemClick) {
      this.setState({ open: false });
    }
  }

});

module.exports = DropDownButton;
