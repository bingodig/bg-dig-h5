var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Classable = require('../../mixins/classable');

require('./style/index.scss');

var SlideIn = React.createClass({

  mixins: [Classable],

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down']),
    isInTab: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      direction: 'left',
      isInTab: false
    };
  },

  render: function() {
    var {
      className,
      direction,
      ...other
    } = this.props;
    var classes = this.getClasses('dig-transition-slide-in', {
      'dig-transition-slide-in-tab': this.props.isInTab
    });

    classes += ' dig-is-' + this.props.direction;


    //Add a custom className to every child
    var newChildren = React.Children.map(this.props.children, function(child) {
        var newClassName = child.props.className ?
          child.props.className + ' dig-transition-slide-in-child': 'dig-transition-slide-in-child';

        return React.cloneElement(child, { className: this.props.isInTab ? child.props.className : newClassName });
    }, this);

    return (
      <ReactCSSTransitionGroup {...other}  transitionEnterTimeout={500} transitionLeaveTimeout={300}
        className={classes}
        transitionName="dig-transition-slide-in">
        {newChildren}
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = SlideIn;