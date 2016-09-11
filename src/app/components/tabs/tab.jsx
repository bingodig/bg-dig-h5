var React = require('react');
var Classable = require('../../mixins/classable');
var TabTemplate = require('./tabTemplate');


var Tab = React.createClass({

  mixins: [Classable],

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width:  React.PropTypes.number
  },

  render: function(){
    var styles = {
      width: this.props.width
    };

    var classes = this.getClasses('dig-tab-item', {
      'dig-tab-is-active': this.props.selected
    });

    return (
    <div className={classes} style={styles} onTouchTap={this._handleTouchTap} routeName={this.props.route}>
      {this.props.label}
    </div>
    )
  },

  _handleTouchTap: function(){
    this.props.handleTouchTap(this.props.tabIndex, this);
  }

});

module.exports = Tab;