var React = require('react');
var Classable = require('../../mixins/classable');
var WindowListenable = require('../../mixins/window-listenable');
var DateTime = require('../../utils/date-time');
var KeyCode = require('../../utils/key-code');
var CalendarDay = require('./calendar-day');
var CalendarToolbar = require('./calendar-toolbar');
var DateDisplay = require('./date-display');
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
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var classes = this.getClasses('dig-date-picker-calendar', {
      'dig-is-4week': weekCount === 4,
      'dig-is-5week': weekCount === 5,
      'dig-is-6week': weekCount === 6
    });

    return (
      <div className={classes}>

        <DateDisplay
         className="dig-date-picker-calendar-date-display"
         selectedDate={this.state.selectedDate} />

        <div className="dig-date-picker-calendar-container">
          <CalendarToolbar
            displayDate={this.state.displayDate}
            onLeftTouchTap={this._handleLeftTouchTap}
            onRightTouchTap={this._handleRightTouchTap} />

          <ul className="dig-date-picker-calendar-week-title">
            <li className="dig-date-picker-calendar-week-title-day">日</li>
            <li className="dig-date-picker-calendar-week-title-day">一</li>
            <li className="dig-date-picker-calendar-week-title-day">二</li>
            <li className="dig-date-picker-calendar-week-title-day">三</li>
            <li className="dig-date-picker-calendar-week-title-day">四</li>
            <li className="dig-date-picker-calendar-week-title-day">五</li>
            <li className="dig-date-picker-calendar-week-title-day">六</li>
          </ul>

          <SlideInTransitionGroup
            direction={this.state.transitionDirection}>
            <CalendarDay
              key={this.state.displayDate.toDateString()}
              displayDate={this.state.displayDate}
              onDayTouchTap={this._handleDayTouchTap}
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
    newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
    this._setDisplayDate(newDisplayDate);
  },

  _addSelectedDays: function(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _setDisplayDate: function(d, newSelectedDate) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);
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
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);

    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
  },

  _handleDayTouchTap: function(e, date) {
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
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case KeyCode.DOWN:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case KeyCode.RIGHT:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case KeyCode.LEFT:
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;

      }

    } 
  }

});

module.exports = Calendar;