var React = require('react');
var Classable = require('../../mixins/classable');
var WindowListenable = require('../../mixins/window-listenable');
var KeyCode = require('../../utils/key-code');
var Calendar = require('./calendar');
var CalendarOnlyMonth = require('./calendar-only-month');
var CalendarOnlyYear = require('./calendar-only-year');
var DialogWindow = require('../dialog-window/dialog-window.jsx');
var FlatButton = require('../flat-button/flat-button.jsx');

require('./style/index.scss');

var DatePickerDialog = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    dateMode: React.PropTypes.oneOf(['Day', 'Month', 'Year'])
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      dateMode: 'Day'
    };
  },

  getInitialState: function() {
    return {
      isCalendarActive: false
    };
  },

  render: function() {
    var {
      initialDate,
      onAccept,
      ...other
    } = this.props;

    var classes = this.getClasses('dig-date-picker-dialog');

    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        onTouchTap={this._handleCancelTouchTap} />,
      <FlatButton
        key={1}
        label="OK"
        primary={true}
        onTouchTap={this._handleOKTouchTap} />
    ];

    var calendar;
    var contentClassName;

    if (this.props.dateMode == 'Day') {
        calendar = (
          <Calendar
            ref="calendar"
            initialDate={this.props.initialDate}
            isActive={this.state.isCalendarActive} />);

        contentClassName="dig-date-picker-dialog-window"

    }else if (this.props.dateMode == 'Month') {
        calendar = (
          <CalendarOnlyMonth
            ref="calendar"
            initialDate={this.props.initialDate}
            isActive={this.state.isCalendarActive} />);

        contentClassName="dig-date-picker-dialog-window-month"

    }else if (this.props.dateMode == 'Year') {
        calendar = (
          <CalendarOnlyYear
            ref="calendar"
            initialDate={this.props.initialDate}
            isActive={this.state.isCalendarActive} />);

        contentClassName="dig-date-picker-dialog-window-year"
    };

    return (
      <DialogWindow {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}
        contentClassName={contentClassName}
        onDismiss={this._handleDialogDismiss}
        onShow={this._handleDialogShow}
        repositionOnUpdate={false}>

        {calendar}
      </DialogWindow>
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }
  },

  _handleDialogShow: function() {
    this.setState({
      isCalendarActive: true
    });

    if(this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss: function() {
    this.setState({
      isCalendarActive: false
    });

    if(this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    } 
  }

});

module.exports = DatePickerDialog;