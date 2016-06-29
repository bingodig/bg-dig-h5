var React = require('react');
var SlideInTransitionGroup = require('../transition-groups/slide-in.jsx');

var TabTemplate = React.createClass({

    propTypes: {
    	tempKey: React.PropTypes.number,
        content: React.PropTypes.object,
        animationDirection: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
    },

  	render: function(){

	    return (
	      <div className='dig-tab-template'>
	      	<SlideInTransitionGroup direction={this.props.animationDirection} isInTab={true}>
	      		<div key={this.props.tempKey}>{this.props.content}</div>
	        </SlideInTransitionGroup>
	      </div>
	    );
    }
});

module.exports = TabTemplate;