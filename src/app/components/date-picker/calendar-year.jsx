var React = require('react');
var Classable = require('../../mixins/classable');
var DateTime = require('../../utils/date-time');
var YearButton = require('./year-button');

var CalendarYear = React.createClass({

  mixins: [Classable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onYearTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    var classes = this.getClasses('dig-date-picker-calendar-year');

    return (
      <div className={classes}>
        {this._getYearElements()}
      </div>
    );
  },

  _getYearElements: function() {
    var yearArray = DateTime.getYearArray(this.props.displayDate);

    return yearArray.map(function(row, i) {
      return (
        <div
          key={i}
          className="dig-date-picker-calendar-year-week">
          {this._getRowElements(row)}
        </div>
      );
    }, this);
  },

  _getRowElements: function(row) {
    return row.map(function(year, i) {
      var selected = DateTime.isEqualYear(this.props.selectedDate, year);
      return (
        <YearButton
          key={i}
          date={year}
          onTouchTap={this._handleYearTouchTap}
          selected={selected} />
      );
    }, this);
  },

  _handleYearTouchTap: function(e, date) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, date);
  }

});

module.exports = CalendarYear;