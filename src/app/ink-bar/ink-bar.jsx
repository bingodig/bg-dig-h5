var React = require('react');

require('./style/index.scss');

var InkBar = React.createClass({
  
  propTypes: {
    position: React.PropTypes.string
  },
  
  render: function() {

    var styles = {
      left: this.props.left,
      width: this.props.width
    };

    return (
      <div className='dig-ink-bar' style={styles}>
        &nbsp;
      </div>
    );
  }

});

module.exports = InkBar;