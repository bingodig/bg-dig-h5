var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');
var KeyLine = require('../utils/key-line');
var Paper = require('./paper');
var CssEvent = require('../utils/css-event');

var DropDownContainer = React.createClass({

  mixins: [Classable],

  propTypes: {
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number,
    Width: React.PropTypes.number
  },
  
  getDefaultProps: function() {
    return {
     visible: true,
     zDepth: 1
    }
  },

  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);

    //this._setKeyWidth(el);

    this._initialMenuHeight = el.offsetHeight;
    this._initialMenuWidth = this.props.Width ? this.props.Width : el.offsetWidth;

    this._renderVisibility();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

  render: function() {
    var classes = this.getClasses('dig-drop-down-container', {
      'dig-visible': this.props.visible
    });
   
    return (
        <Paper ref="paperContainer" zDepth={1} className={classes}>
            {this.props.children}
        </Paper>
    );
  },

  _renderVisibility: function() {
    var el = ReactDOM.findDOMNode(this);
      var innerContainer = ReactDOM.findDOMNode(this.refs.paperContainer.getInnerContainer());
      
      if (this.props.visible) {
        el.style.height = this._initialMenuHeight + 'px';
        el.style.width = KeyLine.getIncrementalDim(this._initialMenuWidth) + 'px' ;
        CssEvent.onTransitionEnd(el, function() {
          if (this.props.visible) innerContainer.style.overflow = 'visible';
        }.bind(this));

      } else {
        el.style.height = '0px';
        el.style.width = '0px';
        innerContainer.style.overflow = 'hidden';
      }
  },

});

module.exports = DropDownContainer;
