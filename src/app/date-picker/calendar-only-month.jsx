var React = require('react');
var Classable = require('../../mixins/classable');
var WindowListenable = require('../../mixins/window-listenable');
var DateTime = require('../../utils/date-time');
var KeyCode = require('../../utils/key-code');
var CalendarMonth= require('./calendar-month');
var CalendarToolbar = require('./calendar-toolbar');
var MonthDisplay = require('./month-display');
var SlideInTransitionGroup = require('../transition-groups/slide-in.jsx');

require('./style/index.scss');

var Calendar = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date()
    };
  },

  getInitialState: function() {
    return {
      displayDate: DateTime.getFirstMonthOfYear(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstMonthOfYear(d),
        selectedDate: d
      });
    }
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var classes = this.getClasses('dig-date-picker-calendar-only-month', {
      'dig-is-4week': weekCount === 4,
      'dig-is-5week': weekCount === 5,
      'dig-is-6week': weekCount === 6
    });

    return (
      <div className={classes}>

        <MonthDisplay
         className="dig-date-picker-calendar-month-display"
         selectedDate={this.state.selectedDate} />

        <div className="dig-date-picker-calendar-container-month">
          <CalendarToolbar
            displayDate={this.state.displayDate}
            mode='Year'
            onLeftTouchTap={this._handleLeftTouchTap}
            onRightTouchTap={this._handleRightTouchTap} />

          <ul className="dig-date-picker-calendar-week-title">
            <li className="dig-date-picker-calendar-week-title-month"></li>
            <li className="dig-date-picker-calendar-week-title-month"></li>
            <li className="dig-date-picker-calendar-week-title-month"></li>
            <li className="dig-date-picker-calendar-week-title-month"></li>
          </ul>

          <SlideInTransitionGroup
            direction={this.state.transitionDirection}>
            <CalendarMonth
              key={this.state.displayDate.toDateString()}
              displayDate={this.state.displayDate}
              onMonthTouchTap={this._handleMonthTouchTap}
              selectedDate={this.state.selectedDate} />
          </SlideInTransitionGroup>
        </div>
      </div>
    );
  },

  getSelectedDate: function() {
    return this.state.selectedDate;
  },

  _addDisplayDate: function(m) {
    var newDisplayDate = DateTime.clone(this.state.displayDate);
    newDisplayDate.setYear(newDisplayDate.getFullYear() + m);
    this._setDisplayDate(newDisplayDate);
  },

  _addSelectedDays: function(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _setDisplayDate: function(d, newSelectedDate) {
    var newDisplayDate = DateTime.getFirstMonthOfYear(d);
    var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate
      });
    }
  },

  _setSelectedDate: function(d) {
    var newDisplayDate = DateTime.getFirstMonthOfYear(d);

    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
  },

  _handleMonthTouchTap: function(e, date) {
    this._setSelectedDate(date);
  },

  _handleLeftTouchTap: function() {
    this._addDisplayDate(-1);
  },

  _handleRightTouchTap: function() {
    this._addDisplayDate(1);
  },

  _handleWindowKeyDown: function(e) {
    var newSelectedDate;

    if (this.props.isActive) {

      switch (e.keyCode) {

        case KeyCode.UP:
          this._addSelectedMonths(-4);
          break;

        case KeyCode.DOWN:
          this._addSelectedMonths(4);
          break;

        case KeyCode.RIGHT:
          this._addSelectedMonths(1);
          break;

        case KeyCode.LEFT:
          this._addSelectedMonths(-1);
          break;

      }

    } 
  }

});

module.exports = Calendar;