var React = require('react');
var Classable = require('../../mixins/classable');
var DateTime = require('../../utils/date-time');
var EnhancedButton = require('../enhanced-button/enhanced-button.jsx');

require('./style/index.scss');

var YearButton = React.createClass({

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

    var classes = this.getClasses('dig-date-picker-year-button', { 
      'dig-is-current-year': DateTime.isEqualYear(this.props.date, new Date()),
      'dig-is-selected': this.props.selected
    });

    return (
      <EnhancedButton {...other}
        className={classes}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}>
        <div className="dig-date-picker-year-button-select" />
        <span className="dig-date-picker-year-button-label">{this.props.date.getFullYear() + "年"}</span>
      </EnhancedButton>
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  }

});

module.exports = YearButton;