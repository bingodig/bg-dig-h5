import React from 'react';
import Tooltip from 'rc-tooltip';
import getPlacements from './placements';
import warning from 'warning';

var Popover = React.createClass({

	getDefaultProps: function() {
	  return {
          prefixCls: 'dig-popover',
          placement: 'top',
          trigger: 'hover',
          mouseEnterDelay: 0.1,
          mouseLeaveDelay: 0.1,
          overlayStyle: {}
	  };
	},

	render: function() {

        const transitionName = ({
            top: 'zoom-down',
            bottom: 'zoom-up',
            left: 'zoom-right',
            right: 'zoom-left',
            topLeft: 'zoom-down',
            bottomLeft: 'zoom-up',
            leftTop: 'zoom-right',
            rightTop: 'zoom-left',
            topRight: 'zoom-down',
            bottomRight: 'zoom-up',
            leftBottom: 'zoom-right',
            rightBottom: 'zoom-left'
        })[this.props.placement];

        const placements = getPlacements();

		return (
            <Tooltip transitionName={transitionName}
                     builtinPlacements={placements}
                     ref="tooltip"
                {...this.props}
                     overlay={this.getOverlay()}>
                {this.props.children}
            </Tooltip>
		);
	},

    getPopupDomNode: function() {
        return this.refs.tooltip.getPopupDomNode();
    },

    componentDidMount: function() {
        if ('overlay' in this.props) {
            warning(false, '`overlay` prop of Popover is deprecated, use `content` instead.');
        }
    },

    getOverlay: function() {
        // use content replace overlay
        // keep overlay for compatibility
        const { title, prefixCls, overlay, content } = this.props;

        return (
            <div>
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                <div className={`${prefixCls}-inner-content`}>
                    {content || overlay}
                </div>
            </div>
        );
    }

});

module.exports = Popover;