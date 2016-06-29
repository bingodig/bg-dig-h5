var Classable = require('../../mixins/classable');
var React = require('react');

require('./style/index.scss');

var Toolbar = React.createClass({

  mixins: [Classable],

  render: function() {
    var classes = this.getClasses('dig-toolbar', {
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Toolbar;
