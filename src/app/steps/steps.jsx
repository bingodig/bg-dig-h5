var React = require('react');
var RcSteps = require('rc-steps');

require('./style/index.scss');

var Steps = React.createClass({

    getDefaultProps: function() {
    	return {
            prefixCls: 'dig-steps',
            iconPrefix: 'dig',
            maxDescriptionWidth: 100,
            current: 0
    	};
    },

	render: function() {
        var maxDescriptionWidth = this.props.maxDescriptionWidth;
        if (this.props.direction === 'vertical') {
            maxDescriptionWidth = 'auto';
        }

		return (
            <RcSteps size={this.props.size}
                     current={this.props.current}
                     direction={this.props.direction}
                     iconPrefix={this.props.iconPrefix}
                     maxDescriptionWidth={maxDescriptionWidth}
                     prefixCls={this.props.prefixCls}>
                {this.props.children}
            </RcSteps>
		);
	}
});

Steps.Step = RcSteps.Step;

module.exports = Steps;