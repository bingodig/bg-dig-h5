var React = require('react');
var Classable = require('../mixins/classable');
var RaisedButton = require('./raised-button');

var UniqueId = require('../utils/unique-id');

var TabSelector = React.createClass({

  mixins: [Classable],

  propTypes: {
    data: React.PropTypes.array,
    selected: React.PropTypes.string,
    onSelected: React.PropTypes.func,
    margin: React.PropTypes.number,
    innerMargin: React.PropTypes.number
  },

  getInitialState: function() {
    return { selected: this.props.selected };
  },

  render: function() {
    var classes = this.getClasses('dig-tab-selector');

    var styles = {
      margin: this.props.margin
    }

    var innerStyles = {
      marginLeft: this.props.innerMargin,
      marginRight: this.props.innerMargin
    }

    var tabs = this.props.data.map(function (item) {
      var selected = item.value == this.state.selected ? 'dig-is-selected' : '';
      var key = UniqueId.generateGuid();

      return (
        <li key={key}
          data-value={item.value}
          className={selected}
          style={innerStyles}
          onClick={this._handleOnClick}
        >{item.text}</li>
      );
    }, this);

    return (
      <div className={classes} style={styles}>
        <ul>
          {tabs}
        </ul>
      </div>
    );
  },

  _handleOnClick: function (e) {
    this.setState({'selected': e.target.getAttribute('data-value')})
    if (this.props.onSelected) this.props.onSelected(e, e.target.getAttribute('data-value'), e.target);
  }
});

module.exports = TabSelector