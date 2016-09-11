var React = require('react');
var Classable = require('../mixins/classable');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

	mixins: [Classable],

	propTypes: {
	  onMenuIconButtonTouchTap: React.PropTypes.func,
	  showMenuIconButton: React.PropTypes.bool,
	  iconClassNameLeft: React.PropTypes.string,
	  iconElementLeft: React.PropTypes.element,
	  iconElementRight: React.PropTypes.element,
	  title : React.PropTypes.node,
	  zDepth: React.PropTypes.number
	},

	getDefaultProps: function() {
	  return {
	    showMenuIconButton: true,
	    title: '',
	    zDepth: 1
	  }
	},

	componentDidMount: function() {
	  if (process.NODE_ENV !== 'production' && 
	     (this.props.iconElementLeft && this.props.iconClassNameLeft)) {
	      var warning = 'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
	                    'defined. Please use one or the other.';
	      console.warn(warning);
	  }
	},

	render: function() {

		var {
		  onTouchTap,
		  ...other
		} = this.props;

		var classes = this.getClasses('dig-app-bar');
		var title;
		var menuElementLeft;
		var menuElementRight;

		if (this.props.title) {
		  title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
		    <h1 className="dig-app-bar-title">{this.props.title}</h1> :
		    this.props.title;
		}

		if (this.props.showMenuIconButton) {
		  if (this.props.iconElementLeft) {
		    menuElementLeft = (
		      <div className="dig-app-bar-navigation-icon-button"> 
		        {this.props.iconElementLeft} 
		      </div>
		    );
		  } else {
		    var child = (this.props.iconClassNameLeft) ? '' : <NavigationMenu/>;
		    menuElementLeft = (
		      <IconButton
		        className="dig-app-bar-navigation-icon-button" 
		        iconClassName={this.props.iconClassNameLeft}
		        onTouchTap={this._onMenuIconButtonTouchTap}>
		          {child}
		      </IconButton>
		    );
		  }
		}

		if (this.props.iconElementRight) {
		  menuElementRight = (
		    <div className="dig-app-bar-right-button"> 
		      {this.props.iconElementRight} 
		    </div>
		  );
		}

		return (
			<Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
			  {menuElementLeft}
			  {title}
			  {this.props.children}
			  {menuElementRight}
			</Paper>
		);
	},

	_onMenuIconButtonTouchTap: function(e) {
		if (this.props.onMenuIconButtonTouchTap){
			this.props.onMenuIconButtonTouchTap(e);
	  	}
	}

});

module.exports = AppBar;