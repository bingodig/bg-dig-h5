var React = require('react');
var Classable = require('../../mixins/classable');
var DateTime = require('../../utils/date-time');
var EnhancedButton = require('../enhanced-button/enhanced-button.jsx');

require('./style/index.scss');

var DayButton = React.createClass({

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

    var classes = this.getClasses('dig-date-picker-day-button', { 
      'dig-is-current-date': DateTime.isEqualDate(this.props.date, new Date()),
      'dig-is-selected': this.props.selected
    });

    return this.props.date ? (
      <EnhancedButton {...other}
        className={classes}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}>
        <div className="dig-date-picker-day-button-select" />
        <span className="dig-date-picker-day-button-label">{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span className={classes} />
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  }

});

module.exports = DayButton;