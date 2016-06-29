var React = require('react'),
  Router = require('react-router'),
  Link = Router.Link,
  Paper = require('../paper/paper.jsx');

  require('./style/index.scss');

var HomeFeature = React.createClass({

  propTypes: {
    heading: React.PropTypes.string,
    route: React.PropTypes.string,
    img: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      zDepth: 1,
      width: 250
    };
  },

  render: function() {
    var style = {
      width: this.props.width,
      height: this.props.height,
      margin: 20
    }
    return (
      <Paper className="home-feature" zDepth={this.state.zDepth}  style={style}
        onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <h5 className="home-feature-heading">{this.props.heading}</h5>
        <Link to={this.props.route}><img className="home-feature-image" src={this.props.img} /></Link>
      </Paper>
    );
  },

  _onMouseOver: function() {
    this.setState({
      zDepth: 4
    });
  },

  _onMouseOut: function() {
    this.setState({
      zDepth: 1
    });
  }

});

module.exports = HomeFeature;
