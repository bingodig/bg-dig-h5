var React = require('react');
var Classable = require('../../mixins/classable');

require('./style/index.scss');

var ListItem = React.createClass({

	mixins: [Classable],

	propTypes: {
		index: React.PropTypes.number.isRequired,
		type: React.PropTypes.oneOf(['SingleLine', 'TwoLine', 'ThreeLine']),
		leftElement: React.PropTypes.node,
		rightElement: React.PropTypes.node,
		primaryText: React.PropTypes.string,
		secondaryText: React.PropTypes.string,
		thirdText: React.PropTypes.string,
		canClick: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		onTouchTap: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			type: 'SingleLine'
		};
	},

	render: function() {
		var classes = this.getClasses('dig-list-item', {
			'dig-no-proxy': true,
			'dig-3-line': this.props.type === 'ThreeLine',
			'dig-2-line': this.props.type === 'TwoLine',
			'dig-list-item-can-click': this.props.canClick
		});

		var leftChildren;
		var rightChildren;
		var textChildren;

		var {
		    leftElement,
		    rightElement,
		    type,
		    primaryText,
		    secondaryText,
		    thirdText,
		    ...other } = this.props;


		if (rightElement) {
		 	rightChildren = React.cloneElement(rightElement, { className: " dig-secondary" });
		}

		if (type === "ThreeLine") {
			textChildren = (
				<div className="dig-list-item-text">
		          <nobr><h3>{primaryText}</h3></nobr>
		          <nobr><h4>{secondaryText}</h4></nobr>
		          <nobr><p>{thirdText}</p></nobr>
		        </div>
			);
		}else if (type === "TwoLine") {
			textChildren = (
				<div className="dig-list-item-text">
		          <nobr><h3>{primaryText}</h3></nobr>
		          <nobr><p>{secondaryText}</p></nobr>
		        </div>
			);
		}else {
			textChildren = (
		        <nobr><p>{primaryText}</p></nobr>
			);
		}

		return (
			<div {...other} key={this.props.key} className={classes} 
				onClick={this._handleOnClick}
				onTouchTap={this._handleTouchTap}>
				{leftElement}
				{textChildren}
				{rightChildren}
			</div>
		);
	},

	_handleTouchTap: function(e) {
	  if (this.props.onTouchTap) {
	  	this.props.onTouchTap(e, this.props.index);
	  }
	},

	_handleOnClick: function(e) {
	  if (this.props.onClick){
	  	this.props.onClick(e, this.props.index);
	  }
	},

});

module.exports = ListItem;