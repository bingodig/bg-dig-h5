var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../../mixins/classable');
var ClickAwayable = require('../../mixins/click-awayable');
var CssEvent = require('../../utils/css-event');
var Dom = require('../../utils/dom');
var KeyLine = require('../../utils/key-line');
var Paper = require('../paper');
var MenuItem = require('./menu-item');
var LinkMenuItem = require('./link-menu-item');
var SubheaderMenuItem = require('./subheader-menu-item');


/***********************
* Nested Menu Component
***********************/
var NestedMenuItem = React.createClass({

	mixins: [Classable, ClickAwayable],

	propTypes: {
	  index: React.PropTypes.number.isRequired,
	  text: React.PropTypes.string,
	  menuItems: React.PropTypes.array.isRequired,
	  zDepth: React.PropTypes.number,
	  disabled: React.PropTypes.bool,
	  onItemClick: React.PropTypes.func,
	  onItemTap: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			disabled: false
		};
	},

	getInitialState: function() {
		return {
			open: false 
		};
	},

	componentClickAway: function() {
		this._closeNestedMenu();
	},

	componentDidMount: function() {
		this._positionNestedMenu();
	},

	componentDidUpdate: function(prevProps, prevState) {
		this._positionNestedMenu();
	},

	render: function() {

		var classes = this.getClasses('dig-nested-menu-item', {
			'dig-open': this.state.open,
			'dig-is-disabled': this.props.disabled
		});

		return (
			<div className={classes} onMouseEnter={this._openNestedMenu} onMouseLeave={this._closeNestedMenu}>
				<MenuItem index={this.props.index} disabled={this.props.disabled} iconRightClassName="bingo-dig-icons-766" onClick={this._onParentItemClick}>
				  {this.props.text}
				</MenuItem>
				<Menu
				  ref="nestedMenu"
				  menuItems={this.props.menuItems}
				  onItemClick={this._onMenuItemClick}
				  onItemTap={this._onMenuItemTap}
				  hideable={true}
				  visible={this.state.open}
				  zDepth={this.props.zDepth + 1} />
			</div>
		);
	},

	_positionNestedMenu: function() {
	  var el = ReactDOM.findDOMNode(this),
	    nestedMenu = ReactDOM.findDOMNode(this.refs.nestedMenu);

	  nestedMenu.style.left = el.offsetWidth + 'px';
	},
	
	_openNestedMenu: function() {
	  if (!this.props.disabled) this.setState({ open: true });
	},
	
	_closeNestedMenu: function() {
	  this.setState({ open: false });
	},
	
	_toggleNestedMenu: function() {
	  if (!this.props.disabled) this.setState({ open: !this.state.open });
	},

	_onParentItemClick: function() {
	  this._toggleNestedMenu();
	},

	_onMenuItemClick: function(e, index, menuItem) {
	  if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
	  this._closeNestedMenu();
	},
	
	_onMenuItemTap: function(e, index, menuItem) {
	  if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
	  this._closeNestedMenu();
	}

});

/****************
* Menu Component
****************/

var Menu = React.createClass({

	mixins: [Classable],

	propTypes: {
	  autoWidth: React.PropTypes.bool,
	  fixWidth: React.PropTypes.number,
	  onItemTap: React.PropTypes.func,
	  onItemClick: React.PropTypes.func,
	  onToggleClick: React.PropTypes.func,
	  menuItems: React.PropTypes.array.isRequired,
	  selectedIndex: React.PropTypes.number,
	  hideable: React.PropTypes.bool,
	  visible: React.PropTypes.bool,
      isAppBarMenu: React.PropTypes.bool,
	  zDepth: React.PropTypes.number
	},

	getDefaultProps: function() {
		return {
			autoWidth: false,
			fixWidth: 0,
			hideable: false,
			visible: true,
			zDepth: 1
		};
	},

	getInitialState: function() {
		return {
			nestedMenuShown: false 
		};
	},

	componentDidMount: function() {
		var el = ReactDOM.findDOMNode(this);

		this._setKeyWidth(el);

		this._initialMenuHeight = el.offsetHeight + KeyLine.Desktop.GUTTER_LESS;

		//Show or Hide the menu according to visibility
		this._renderVisibility();
	},

	componentDidUpdate: function(prevProps, prevState) {
	  if (this.props.visible !== prevProps.visible) this._renderVisibility();
	},

	render: function() {
		var classes = this.getClasses('dig-menu', {
		  'dig-menu-hideable': this.props.hideable,
		  'dig-visible': this.props.visible
		});

		return (
			<Paper ref="paperContainer" zDepth={this.props.zDepth} className={classes}>
			  {this._getChildren()}
			</Paper>
		);
	},

	_getChildren: function() {
	  var children = [],
	    menuItem,
	    itemComponent,
	    isSelected,
	    isDisabled;

	  //This array is used to keep track of all nested menu refs
	  this._nestedChildren = [];

	  for (var i=0; i < this.props.menuItems.length; i++) {
	    menuItem = this.props.menuItems[i];
	    isSelected = i === this.props.selectedIndex;
	    isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

	    var {
	      icon,
	      data,
	      attribute,
	      number,
	      toggle,
	      onClick,
	      ...other
	    } = menuItem;

	    switch (menuItem.type) {

	      case MenuItem.Types.LINK:
	        itemComponent = (
	          <LinkMenuItem 
	            key={i}
	            index={i}
	            payload={menuItem.payload}
	            target={menuItem.target}
	            text={menuItem.text}
	            disabled={isDisabled} />
	        );
	        break;

	      case MenuItem.Types.SUBHEADER:
	        itemComponent = (
	          <SubheaderMenuItem 
	            key={i}
	            index={i}
	            text={menuItem.text} />
	        );
	        break;

	      case MenuItem.Types.NESTED:
	        itemComponent = (
	          <NestedMenuItem
	            ref={i}
	            key={i}
	            index={i}
	            text={menuItem.text}
	            disabled={isDisabled}
	            menuItems={menuItem.items}
	            zDepth={this.props.zDepth}
	            onItemClick={this._onNestedItemClick}
	            onItemTap={this._onNestedItemClick} />
	        );
	        this._nestedChildren.push(i);
	        break;

	      default:
	        itemComponent = (
	          <MenuItem
	            {...other}
	            selected={isSelected}
	            key={i}
	            index={i}
	            icon={menuItem.icon}
	            data={menuItem.data}
	            attribute={menuItem.attribute}
	            number={menuItem.number}
	            toggle={menuItem.toggle}
	            disabled={isDisabled}
	            onClick={this._onItemClick}
	            onTouchTap={this._onItemTap}
	            onToggle={this._onItemToggle}>
	            {menuItem.text}
	          </MenuItem>
	        );
	    }
	    children.push(itemComponent);
	  }

	  return children;
	},

	_setKeyWidth: function(el) {
	  var menuWidth = this.props.autoWidth ?
		  (KeyLine.getIncrementalDim(el.offsetWidth) + this.props.fixWidth) + 'px' :
	    '100%';

	  //Update the menu width
	  Dom.withoutTransition(el, function() {
	    el.style.width = menuWidth;
	  });
	},

	_renderVisibility: function() {
	  var el;

	  if (this.props.hideable) {
	    el = ReactDOM.findDOMNode(this);
	    var innerContainer = ReactDOM.findDOMNode(this.refs.paperContainer.getInnerContainer());
	    
	    if (this.props.visible) {
          if(this.props.isAppBarMenu){
              el.style.top = '60px';
          }
	      //Open the menu
	      el.style.height = this._initialMenuHeight + 'px';

	      //Set the overflow to visible after the animation is done so
	      //that other nested menus can be shown
	      CssEvent.onTransitionEnd(el, function() {
	        //Make sure the menu is open before setting the overflow.
	        //This is to accout for fast clicks
	        if (this.props.visible) innerContainer.style.overflow = 'visible';
	      }.bind(this));

	    } else {

	      //Close the menu
	      el.style.height = '0px';

	      //Set the overflow to hidden so that animation works properly
	      innerContainer.style.overflow = 'hidden';
	    }
	  }
	},

	_onNestedItemClick: function(e, index, menuItem) {
	  if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
	},

	_onNestedItemTap: function(e, index, menuItem) {
	  if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
	},

	_onItemClick: function(e, index) {
	  if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.menuItems[index]);
	},

	_onItemTap: function(e, index) {
	  if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
	},

	_onItemToggle: function(e, index, toggled) {
	  if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
	}
});

module.exports = Menu;