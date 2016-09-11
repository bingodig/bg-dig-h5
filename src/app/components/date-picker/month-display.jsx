var React = require('react');
var Classable = require('../../mixins/classable');
var DateTime = require('../../utils/date-time');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var MonthDisplay = React.createClass({

  mixins: [Classable],

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function() {
    var {
      selectedDate,
      ...other
    } = this.props;
    
    var classes = this.getClasses('dig-date-picker-month-display');
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var year = this.props.selectedDate.getFullYear();

    return (
      <div {...other} className={classes}>

        <div className="dig-date-picker-month-display-date">

          <SlideInTransitionGroup
            className="dig-date-picker-month-display-year"
            direction={this.state.transitionDirection}>
            <div key={year}>{year}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className="dig-date-picker-month-display-month"
            direction={this.state.transitionDirection}>
            <div key={month}>{month}</div>
          </SlideInTransitionGroup>

        </div>

      </div>
    );
  }

});

module.exports = MonthDisplay;