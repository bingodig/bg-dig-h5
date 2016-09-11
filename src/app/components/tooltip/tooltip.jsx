import React from 'react';
import RcTooltip from 'rc-tooltip';
import getPlacements from './placements';


var Tooltip = React.createClass({

    getDefaultProps: function() {
      return {
          prefixCls: 'dig-rc-tooltip',
          placement: 'top',
          mouseEnterDelay: 0.1,
          mouseLeaveDelay: 0.1
      };
    },

    getInitialState: function() {
    	return {
            visible: false
    	};
    },

    onVisibleChange: function (visible) {
        this.setState({
            visible: visible
        });
    },

    render: function () {
        let transitionName = ({
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
            rightBottom: 'zoom-left',
        })[this.props.placement];

        // Hide tooltip when there is no title
        let visible = this.state.visible;
        if (!this.props.title) {
            visible = false;
        }

        const placements = getPlacements({
            verticalArrowShift: 8
        });

        return (
            <RcTooltip transitionName={transitionName}
                       builtinPlacements={placements}
                       overlay={this.props.title}
                       visible={visible}
                       onVisibleChange={this.onVisibleChange}
                {...this.props}>
                {this.props.children}
            </RcTooltip>
        )
    }
});

module.exports = Tooltip;
