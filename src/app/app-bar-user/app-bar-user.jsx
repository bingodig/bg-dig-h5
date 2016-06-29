var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../../mixins/classable');
var ClickAwayable = require('../../mixins/click-awayable');
var DropDownArrow = require('../svg-icons/drop-down-arrow.jsx');
var KeyLine = require('../../utils/key-line');
var Paper = require('../paper/paper.jsx');
var Menu = require('../menu/menu.jsx');
var MenuItem = require('../menu/menu-item.jsx');
var WebContext = require('../../utils/web-context');
var DigConfig = require('../../utils/dig-config');

require('./style/index.scss');

var AppBarUser = React.createClass({

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
		showArrow: React.PropTypes.bool,
		avatarSrc: React.PropTypes.string
	},

	getDefaultProps: function() {
		return {
			autoWidth: true,
			underLine: false,
			zDepth: 1,
			isTransparent: false,
			mini: false,
			bgClassName: "dig-menu-control-bg",
			showArrow: true,
			avatarSrc: './images/2.jpg'
		};
	},

	getInitialState: function() {
		return {
			open: false,
			selectedIndex: this.props.selectedIndex || 0,
			userInfo: {},
			currentUserName: ''
		};
	},

	componentClickAway: function() {
		this.setState({ open: false });
	},

	componentDidMount: function() {
		var userInfo = WebContext.User;
		this.setState({
			currentUserName: userInfo.name,
			userInfo: userInfo
		});
		if (this.props.autoWidth) {
			this._setWidth(userInfo.name);
		}
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.hasOwnProperty('selectedIndex')) {
			this.setState({selectedIndex: nextProps.selectedIndex});
		}
	},

	render: function() {
		var classes = this.getClasses('dig-app-bar-user', {
			'dig-open': this.state.open
		});

		var underLineElement = this.props.underLine ? (
			<div className="dig-menu-control-underline" />
		) : null;

		var paperClassName = this.props.isTransparent ? "dig-menu-control-bg-tran" : this.props.bgClassName;

		var arrowElement = this.props.showArrow ? (
			<DropDownArrow className="dig-menu-drop-down-icon" />
		) : null;

		var avatar = (<img src={this.props.avatarSrc} className="dig-avatar" />);

        var subheader = { type:MenuItem.Types.SUBHEADER };
		var logoutMenu =  {menuId: 'logout', text: '登出', iconClassName: 'bingo-sign-out'};

		var items = [];

		for (var i=0; i < this.props.menuItems.length; i++) {
            var menuItem = this.props.menuItems[i];
			items.push(menuItem);
		}

		items.push(subheader);
		items.push(logoutMenu);

		return (
			<div className={classes}  onMouseLeave={this._onMenuMouseLeave}>
				<div className="dig-menu-control" onMouseOver={this._onMenuMouseOver}>
					<Paper className={paperClassName} zDepth={this.props.zDepth} />
					<div ref="label" className="dig-menu-label">
						{avatar}
						{this.state.currentUserName}
					</div>
					{arrowElement}
					{underLineElement}
				</div>
				<Menu
					ref="menuItems"
					autoWidth={this.props.autoWidth}
					fixWidth = {25}
					selectedIndex={this.state.selectedIndex}
					menuItems={items}
					hideable={true}
					visible={this.state.open}
					isAppBarMenu={true}
					onItemClick={this._onMenuItemClick} />
			</div>
		);
	},

	_setWidth: function(name) {
		var el = ReactDOM.findDOMNode(this);
		//var label = ReactDOM.findDOMNode(this.refs.label);

        if(name) {
            el.style.width = (name.length * 20 + 50) + 'px';
        }
	},

	_onMenuMouseOver: function(e) {
		this.setState({ open: true });
	},

	_onMenuMouseLeave: function(e) {
		this.setState({ open: false });
	},

	_onMenuItemClick: function(e, key, menuItem) {
		if(menuItem.menuId == 'logout'){
			this._logout();
		}else{
			if (this.props.onChange){
				this.props.onChange(e, key, menuItem);
			}
		}

		this.setState({
			selectedIndex: key,
			open: false
		});
	},

	_logout: function(){
		window.location.href = DigConfig.ConfigCache.LogoutAddress;
	}

});

module.exports = AppBarUser;
