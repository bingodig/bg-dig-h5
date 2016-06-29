var React = require('react');
var Classable = require('../../mixins/classable');
var DateTime = require('../../utils/date-time');
var MonthButton = require('./month-button');

require('./style/index.scss');

var CalendarMonth = React.createClass({

  mixins: [Classable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onMonthTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    var classes = this.getClasses('dig-date-picker-calendar-month');

    return (
      <div className={classes}>
        {this._getMonthElements()}
      </div>
    );
  },

  _getMonthElements: function() {
    var monthArray = DateTime.getMonthArray(this.props.displayDate);

    return monthArray.map(function(row, i) {
      return (
        <div
          key={i}
          className="dig-date-picker-calendar-month-week">
          {this._getRowElements(row)}
        </div>
      );
    }, this);
  },

  _getRowElements: function(row) {
    return row.map(function(month, i) {
      var selected = DateTime.isEqualMonth(this.props.selectedDate, month);
      return (
        <MonthButton
          key={i}
          date={month}
          onTouchTap={this._handleMontTouchTap}
          selected={selected} />
      );
    }, this);
  },

  _handleMontTouchTap: function(e, date) {
    if (this.props.onMonthTouchTap) this.props.onMonthTouchTap(e, date);
  }

});

module.exports = CalendarMonth;