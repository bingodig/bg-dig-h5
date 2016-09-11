var React = require('react');
var Classable = require('../../mixins/classable');
var WindowListenable = require('../../mixins/window-listenable');
var DateTime = require('../../utils/date-time');
var KeyCode = require('../../utils/key-code');
var CalendarYear = require('./calendar-year');
var CalendarToolbar = require('./calendar-toolbar');
var YearDisplay = require('./year-display');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

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
      displayDate: DateTime.getStartYear(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getStartYear(d),
        selectedDate: d
      });
    }
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var classes = this.getClasses('dig-date-picker-calendar-only-year', {
      'dig-is-4week': weekCount === 4,
      'dig-is-5week': weekCount === 5,
      'dig-is-6week': weekCount === 6
    });

    return (
      <div className={classes}>

        <YearDisplay
         className="dig-date-picker-calendar-year-display"
          selectedDate={this.state.selectedDate} />

        <div className="dig-date-picker-calendar-container-year">

          <CalendarToolbar
            displayDate={this.state.displayDate}
            mode='YearRange'
            onLeftTouchTap={this._handleLeftTouchTap}
            onRightTouchTap={this._handleRightTouchTap} />

          <ul className="dig-date-picker-calendar-week-title">
            <li className="dig-date-picker-calendar-week-title-year"></li>
            <li className="dig-date-picker-calendar-week-title-year"></li>
            <li className="dig-date-picker-calendar-week-title-year"></li>
            <li className="dig-date-picker-calendar-week-title-year"></li>
          </ul>

          <SlideInTransitionGroup
            direction={this.state.transitionDirection}>
            <CalendarYear
              key={this.state.displayDate.toDateString()}
              displayDate={this.state.displayDate}
              onYearTouchTap={this._handleYearTouchTap}
              selectedDate={this.state.selectedDate} />
          </SlideInTransitionGroup>
        </div>
      </div>
    );
  },

  getSelectedDate: function() {
    return this.state.selectedDate;
  },

  _addDisplayDate: function(y) {
    var newDisplayDate = DateTime.clone(this.state.displayDate);
    newDisplayDate.setYear(newDisplayDate.getFullYear() + y);
    this._setDisplayDate(newDisplayDate);
  },

  _addSelectedYears: function(years) {
    this._setSelectedDate(DateTime.addYears(this.state.selectedDate, years));
  },

  _setDisplayDate: function(d, newSelectedDate) {
    var newDisplayDate = DateTime.getStartYear(d);
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
    var newDisplayDate = DateTime.getStartYear(d);

    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
  },

  _handleYearTouchTap: function(e, date) {
    this._setSelectedDate(date);
  },

  _handleLeftTouchTap: function() {
    this._addDisplayDate(-12);
  },

  _handleRightTouchTap: function() {
    this._addDisplayDate(12);
  },

  _handleWindowKeyDown: function(e) {
    var newSelectedDate;

    if (this.props.isActive) {

      switch (e.keyCode) {

        case KeyCode.UP:
          this._addSelectedYears(-4);
          break;

        case KeyCode.DOWN:
          this._addSelectedYears(4);
          break;

        case KeyCode.RIGHT:
          this._addSelectedYears(1);
          break;

        case KeyCode.LEFT:
          this._addSelectedYears(-1);
          break;

      }

    } 
  }

});

module.exports = Calendar;