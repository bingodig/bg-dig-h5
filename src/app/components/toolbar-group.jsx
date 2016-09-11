var Classable = require('../mixins/classable');
var React = require('react');

var ToolbarGroup = React.createClass({

  propTypes: {
    float: React.PropTypes.oneOf(['left', 'right'])
  },

  mixins: [Classable],

  render: function() {

    var classes = this.getClasses('dig-toolbar-group', {
      'dig-left': this.props.float === 'left',
      'dig-right': this.props.float === 'right'
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = ToolbarGroup;
