var React = require('react');
var DateTime = require('../../utils/date-time');
var IconButton = require('../icon-button');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    mode: React.PropTypes.oneOf(['YearRange', 'Year', 'Month']),
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      mode: 'Month'
    };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();
    var yearLast = year + 11;
    var title;

    if (this.props.mode == 'Month') {
        title = (<div key={month + '_' + year}>{month} {year}</div>);
    }else if (this.props.mode == 'Year') {
        title = (<div key={year}>{year}</div>);
    }else if (this.props.mode == 'YearRange') {
        title = (<div key={year + '-' + yearLast}>{year + ' - ' + yearLast}</div>);
    };

    return (
      <div className="dig-date-picker-calendar-toolbar">

        <SlideInTransitionGroup
          className="dig-date-picker-calendar-toolbar-title"
          direction={this.state.transitionDirection}>
          {title}
        </SlideInTransitionGroup>

        <IconButton
          className="dig-date-picker-calendar-toolbar-button-left"
          onTouchTap={this.props.onLeftTouchTap}>
            <NavigationChevronLeft/>
        </IconButton>

        <IconButton
          className="dig-date-picker-calendar-toolbar-button-right"
          onTouchTap={this.props.onRightTouchTap}>
            <NavigationChevronRight/>
        </IconButton>

      </div>
    );
  }

});

module.exports = CalendarToolbar;
