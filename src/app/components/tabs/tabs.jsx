var React = require('react');
var ReactDOM = require('react-dom');
var Tab = require('./tab');
var TabTemplate = require('./tabTemplate');
var InkBar = require('../ink-bar');
var Paper = require('../paper');

var Tabs = React.createClass({

  propTypes: {
    initialSelectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    tabWidth: React.PropTypes.number,
    leftPadding: React.PropTypes.number,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      leftPadding: 0,
      zDepth: 0
    };
  },

  getInitialState: function(){
    var selectedIndex = 0;
    var currentTemplate = "";
    if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length) {
      selectedIndex = this.props.initialSelectedIndex;
    }
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.displayName === "Tab"){
        if(selectedIndex === index) currentTemplate = tab.props.children;
         return null;
      }
    });

    return {
      selectedIndex: selectedIndex,
      currentTemplate: currentTemplate
    };
  },

  componentDidMount: function(){
    if(this.props.tabWidth) {
      if(!(this.props.children.length * this.props.tabWidth > this._getEvenWidth())){
        this.setState({
          width: this.props.tabWidth,
          fixed: false
        });
        return;
      }
    }
    this.setState({
      width: this._getEvenWidth(),
      fixed: true
    });
  },

  render: function(){
    var _this = this;
    var width = this.state.fixed ?
      this.state.width/this.props.children.length :
      this.props.tabWidth;
    var left = width * this.state.selectedIndex + this.props.leftPadding|| this.props.leftPadding;
    var currentTemplate;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.displayName === "Tab"){
        if(_this.state.selectedIndex === index) currentTemplate = tab.props.children;
         return React.cloneElement(tab, {
            key: index,
            selected: _this.state.selectedIndex === index,
            tabIndex: index,
            width: width,
            handleTouchTap: _this._handleTouchTap
          })
      } else {
        var type = tab.type.displayName || tab.type;
        throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
      }
    });

    var style = {paddingLeft: this.props.leftPadding};

    return (
      <div className="dig-tabs-container">
        <Paper className="dig-tab-item-container" zDepth={this.props.zDepth}>
          <div style={style}>
            {tabs}
          </div>
        </Paper>
        <InkBar left={left} width={width}/>
        <TabTemplate 
          animationDirection='left'
          tempKey={this.state.selectedIndex} 
          content={this.state.currentTemplate} />
      </div>
    )
  },

  _getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(ReactDOM.findDOMNode(this))
        .getPropertyValue('width'), 10)
    );
  },

  _handleTouchTap: function(tabIndex, tab){
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
      this.props.onChange(tabIndex, tab);
    }

    var currentTemplate = tab.props.children;

    this.setState({
      selectedIndex: tabIndex,
      currentTemplate: currentTemplate
    });
    //default CB is _onActive. Can be updated in tab.jsx
    if(tab.props.onActive) tab.props.onActive(tab);
  }

});

module.exports = Tabs;
