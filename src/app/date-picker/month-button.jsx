var React = require('react');
var Classable = require('../../mixins/classable');
var DateTime = require('../../utils/date-time');
var EnhancedButton = require('../enhanced-button/enhanced-button.jsx');

require('./style/index.scss');

var MonthButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  render: function() {

    var {
      className,
      date,
      onTouchTap,
      selected,
      ...other
    } = this.props;

    var classes = this.getClasses('dig-date-picker-month-button', { 
      'dig-is-current-month': DateTime.isEqualMonth(this.props.date, new Date()),
      'dig-is-selected': this.props.selected
    });

    var month = this.props.date.getMonth() + 1;

    return (
      <EnhancedButton {...other}
        className={classes}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}>
        <div className="dig-date-picker-month-button-select" />
        <span className="dig-date-picker-month-button-label">{month + "月"}</span>
      </EnhancedButton>
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  }

});

module.exports = MonthButton;