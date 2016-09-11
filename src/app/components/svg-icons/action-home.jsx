var React = require('react');
var SvgIcon = require('./svg-icon');

var ActionHome = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </SvgIcon>
    );
  }

});

module.exports = ActionHome;