var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/click-awayable');
var DropDownArrow = require('./svg-icons/drop-down-arrow');
var KeyLine = require('../utils/key-line');
var Paper = require('./paper');
var Menu = require('./menu/menu');

var DropDownMenu = React.createClass({

	mixins: [Classable, ClickAwayable],

	propTypes: {
		autoWidth: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		menuItems: React.PropTypes.array.isRequired,
		selectedIndex: React.PropTypes.number,
		underLine: React.PropTypes.bool,
		zDepth: React.PropTypes.number,
		isTransparent: React.PropTypes.bool,
		mini: React.PropTypes.bool,
        bgClassName: React.PropTypes.string,
        showArrow: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			autoWidth: true,
			underLine: false,
			zDepth: 1,
			isTransparent: false,
			mini: false,
            bgClassName: "dig-menu-control-bg",
            showArrow: true
		};
	},

	getInitialState: function() {
		return {
			open: false,
			selectedIndex: this.props.selectedIndex || 0
		};
	},

	componentClickAway: function() {
	  this.setState({ open: false });
	},

	componentDidMount: function() {
		if (this.props.autoWidth) {
			this._setWidth();
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.hasOwnProperty('selectedIndex')) {
			this.setState({selectedIndex: nextProps.selectedIndex});
		};
	},

	render: function() {
		var mianClass = this.props.mini ? 'dig-drop-down-menu-mini' : 'dig-drop-down-menu';

		var classes = this.getClasses(mianClass, {
			'dig-open': this.state.open
		});

		var underLineElement = this.props.underLine ? (
			<div className="dig-menu-control-underline" />
		) : null;

		var paperClassName = this.props.isTransparent ? "dig-menu-control-bg-tran" : this.props.bgClassName;

        var arrowElement = this.props.showArrow ? (
            <DropDownArrow className="dig-menu-drop-down-icon" />
        ) : null;

		return (
			<div className={classes}>
			  <div className="dig-menu-control" onClick={this._onControlClick}>
			    <Paper className={paperClassName} zDepth={this.props.zDepth} />
			    <div className="dig-menu-label">
			      {this.props.menuItems[this.state.selectedIndex].text}
			    </div>
                {arrowElement}
			    {underLineElement}
			  </div>
			  <Menu
			    ref="menuItems"
			    autoWidth={this.props.autoWidth}
			    selectedIndex={this.state.selectedIndex}
			    menuItems={this.props.menuItems}
			    hideable={true}
			    visible={this.state.open}
			    onItemClick={this._onMenuItemClick} />
			</div>
		);
	},

	_setWidth: function() {
	  var el = ReactDOM.findDOMNode(this);
	  var menuItemsDom = ReactDOM.findDOMNode(this.refs.menuItems);

	  el.style.width = menuItemsDom.offsetWidth + 'px';
	},

	_onControlClick: function(e) {
	  this.setState({ open: !this.state.open });
	},

	_onMenuItemClick: function(e, key, payload) {
	  if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
	  this.setState({
	    selectedIndex: key,
	    open: false
	  });
	}

});

module.exports = DropDownMenu;