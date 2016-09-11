var React = require('react');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/click-awayable');
var Paper = require('./paper');
var FontIcon = require('./font-icon');
var Menu = require('./menu/menu');

var DropDownIcon = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    iconClassName: React.PropTypes.string.isRequired,
    menuItems: React.PropTypes.array.isRequired,
    closeOnMenuItemClick: React.PropTypes.bool,
    menuPosition: React.PropTypes.oneOf(['leftBottom', 'RightBottom']),
  },

  getInitialState: function() {
    return {
      open: false
    }
  },
  
  getDefaultProps: function() {
    return {
      closeOnMenuItemClick: true,
      menuPosition: 'leftBottom'
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  render: function() {
    var classes = this.getClasses('dig-drop-down-icon', {
      'dig-open': this.state.open,
      'dig-leftBottom': this.props.menuPosition == "leftBottom",
      'dig-RightBottom': this.props.menuPosition == "RightBottom"
    });

    var icon;
    if (this.props.iconClassName) icon = <FontIcon className={this.props.iconClassName} />;
   
    return (
      <div className={classes}>
          <div className="dig-menu-control" onClick={this._onControlClick}>
              {icon}
              {this.props.children}
          </div>
          <Menu ref="menuItems"
            menuItems={this.props.menuItems}
            autoWidth={true}
            hideable={true} 
            visible={this.state.open}
            onItemClick={this._onMenuItemClick} />
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

module.exports = DropDownIcon;
