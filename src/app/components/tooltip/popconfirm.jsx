import React from 'react';
import Tooltip from 'rc-tooltip';
import FontIcon from '../font-icon';
import RaisedButton from '../raised-button';
import getPlacements from './placements';


var Popconfirm = React.createClass({

	getDefaultProps: function() {
      const noop = function () {};
	  return {
          transitionName: '',
          placement: 'top',
          trigger: 'click',
          overlayStyle: {},
          onConfirm: noop,
          onCancel: noop,
          onVisibleChange() {}
	  };
	},

    getInitialState: function() {
    	return {
            visible: false
    	};
    },

    componentWillReceiveProps: function (nextProps) {
        if ('visible' in nextProps) {
            this.setState({ visible: nextProps.visible });
        }
    },

    confirm: function () {
        this.setVisible(false);
        this.props.onConfirm.call(this);
    },

    cancel: function () {
        this.setVisible(false);
        this.props.onCancel.call(this);
    },

    onVisibleChange: function (visible) {
        this.setVisible(visible);
    },

    setVisible: function (visible) {
        if (!('visible' in this.props)) {
            this.setState({ visible });
        }
        this.props.onVisibleChange(visible);
    },

	render: function() {
        const { title, placement, overlayStyle, trigger, ...restProps } = this.props;
        let { okText, cancelText } = this.props;
        const placements = getPlacements();
        const prefixCls = 'dig-popover';

        const overlay = (
            <div>
                <div className={`${prefixCls}-inner-content`}>
                    <div className={`${prefixCls}-message`}>
                        <FontIcon className="bingo-dig-icons-52" />
                        <div className={`${prefixCls}-message-title`}>{title}</div>
                    </div>
                    <div className={`${prefixCls}-buttons`}>
                        <RaisedButton label={cancelText || '取消'} minSize={true} onClick={this.cancel} />
                        <RaisedButton label={okText || '确定'} primary={true} minSize={true} onClick={this.confirm} />
                    </div>
                </div>
            </div>
        );

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
        })[placement];

		return (
            <Tooltip {...restProps}
                placement={placement}
                builtinPlacements={placements}
                overlayStyle={overlayStyle}
                prefixCls={prefixCls}
                onVisibleChange={this.onVisibleChange}
                transitionName={transitionName}
                visible={this.state.visible}
                trigger={trigger}
                overlay={overlay}>
                {this.props.children}
            </Tooltip>
		);
	}

});

module.exports = Popconfirm;