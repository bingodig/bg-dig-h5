var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Classable = require('../../mixins/classable');
var SlideInTransitionGroup = require('../transition-groups/slide-in');
var QueueAnim = require('../queue-anim');
var FontIcon = require('../font-icon');
var Checkbox = require('../Checkbox');
var Toggle = require('../toggle');
var IconButton = require('../icon-button');
var ListItem = require('./list-item');
var UniqueId = require('../../utils/unique-id');

var List = React.createClass({

	mixins: [Classable],

	propTypes: {
		type: React.PropTypes.oneOf(['SingleLine', 'TwoLine', 'ThreeLine']),
		leftElementType: React.PropTypes.oneOf(['Image', 'Checkbox', 'Icon', 'IconButton', 'Toggle']),
		rightElementType: React.PropTypes.oneOf(['Image', 'Checkbox', 'Icon', 'IconButton', 'Toggle']),
		canClick: React.PropTypes.bool,
		listItems: React.PropTypes.array.isRequired,
		hasAnimation: React.PropTypes.bool,
		keyFieldName: React.PropTypes.string,
		onLeftButtonClick: React.PropTypes.func,
		onRightButtonClick: React.PropTypes.func,
		onLeftCheck: React.PropTypes.func,
		onRightCheck: React.PropTypes.func,
		onLeftToggle: React.PropTypes.func,
		onRightToggle: React.PropTypes.func,
		onItemTap: React.PropTypes.func,
		onItemClick: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			keyFieldName: 'Id',
			type: 'SingleLine',
			listItems: [],
            hasAnimation: true,
            animationDirection: 'right',
			canClick: false
		};
	},

	getInitialState: function() {

		return {
			currentItems: this.props.listItems
		};
	},

	render: function() {
		var classes = this.getClasses('dig-list');

		var items = this.state.currentItems.map(function(listItem, i) {

			var {
			  primaryText,
			  secondaryText,
			  thirdText,
			  leftImageSrc,
			  rightImageSrc,
			  leftIconClassName,
			  rightIconClassName,
			  leftDefaultChecked,
			  rightDefaultChecked,
			  leftDefaultToggleed,
			  rightDefaultToggleed,
			  ...other
			} = listItem;

			var leftElement = this._getElement(this.props.leftElementType, listItem, 'left');
			var rightElement = this._getElement(this.props.rightElementType, listItem, 'right');
			var key = listItem[this.props.keyFieldName] || UniqueId.generateGuid();
		    return (
		        <div ref="listContainer" key={key} className="dig-list-item-container">
		        	<ListItem
		        		key={key}
		        		index={i}
		        		type={this.props.type}
		        		leftElement = {leftElement}
		        		rightElement = {rightElement}
		        		primaryText={primaryText}
		        		secondaryText={secondaryText}
		        		thirdText={thirdText}
		        		canClick={this.props.canClick}
		        		onClick={this._onItemClick}
		        		onTouchTap={this._onItemTap} />
		        </div>
		    );
		}.bind(this));

        var animateType = [this.props.animationDirection];

		var listItems = this.props.hasAnimation ? (<QueueAnim type={animateType}>{items}</QueueAnim>) : items;

		return (
			<div  className={classes}>
                {listItems}
			</div>
		);
	},

	_getElement: function(elementType, listItem, direction){
		var element;
		var {
		  leftImageSrc,
		  rightImageSrc,
		  leftIconClassName,
		  rightIconClassName,
		  leftDefaultChecked,
		  rightDefaultChecked,
		  leftDefaultToggleed,
		  rightDefaultToggleed,
		} = listItem;

		switch(elementType){

			case 'Image':
			element = direction === 'left' ? 
				(<img src={leftImageSrc} className="dig-avatar" />) :
				(<img src={rightImageSrc} className="dig-avatar" />);
			break;

			case 'Checkbox':
			var classes = direction === 'left' ? '' : 'dig-secondary';

			element = direction === 'left' ? 
				(<Checkbox className={classes} defaultChecked={leftDefaultChecked} onCheck={this._onLeftCheck.bind(this, listItem)}/>) :
				(<Checkbox className={classes} defaultChecked={rightDefaultChecked} onCheck={this._onRightCheck.bind(this, listItem)}/>);
			break;

			case 'Icon':
			var classes = direction === 'left' ? 
				leftIconClassName : rightIconClassName + ' dig-secondary';
			
			element =  (<FontIcon className={classes}></FontIcon>);
			break;

			case 'IconButton':
			var iconClasses = direction === 'left' ? leftIconClassName : rightIconClassName;
			var classes = direction === 'left' ? '' : 'dig-secondary';
			var action = direction === 'left' ? this._onLeftClick.bind(this, listItem) : this._onRightClick.bind(this, listItem);

			element =  (<IconButton className={classes} iconClassName={iconClasses} onClick={action}></IconButton>);
			break;

			case 'Toggle':
			var classes = direction === 'left' ? '' : 'dig-secondary';

			element = direction === 'left' ? 
				(<Toggle className={classes} defaultToggled={leftDefaultToggleed} onToggle={this._onLeftToggle.bind(this, listItem)}/>) :
				(<Toggle className={classes} defaultToggled={rightDefaultToggleed} onToggle={this._onRightToggle.bind(this, listItem)}/>);
			break;

			default:
		}

		return element;
	},

	_onLeftCheck: function (listItem, e, isChecked) {
		if (this.props.onLeftCheck){
			this.props.onLeftCheck(listItem, e, isChecked);
		}
	},

	_onRightCheck: function (listItem, e, isChecked) {
		if (this.props.onRightCheck){
			this.props.onRightCheck(listItem, e, isChecked);
		}
	},

	_onLeftToggle: function (listItem, e, isToggled) {
		if (this.props.onLeftToggle){
			this.props.onLeftToggle(listItem, e, isToggled);
		}
	},

	_onRightToggle: function (listItem, e, isToggled) {
		if (this.props.onRightToggle){
			this.props.onRightToggle(listItem, e, isToggled);
		}
	},

	_onLeftClick: function (listItem, e) {
		if (this.props.onLeftButtonClick){
			this.props.onLeftButtonClick(listItem, e);
		}
	},

	_onRightClick: function (listItem, e) {
		if (this.props.onRightButtonClick){
			this.props.onRightButtonClick(listItem, e);
		}
	},

	_onItemClick: function(e, index) {
	  if (this.props.onItemClick){
	  	this.props.onItemClick(this.props.listItems[index], e, index);
	  }
	},

	_onItemTap: function(e, index) {
	  if (this.props.onItemTap){
	  	this.props.onItemTap(this.props.listItems[index], e, index);
	  }
	},

	AddItem: function(item) {
	    var newItems = this.state.currentItems.concat([item]);
	    this.setState({currentItems: newItems});
	},

	RemoveItem: function(index) {
	    var newItems = this.state.currentItems;
	    newItems.splice(index, 1);
	    this.setState({currentItems: newItems});
	},

	SetItems: function(newItems) {
	    this.setState({currentItems: newItems});
	}

});

module.exports = List;