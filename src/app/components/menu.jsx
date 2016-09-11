var React = require('react');
var ReactDOM = require('react-dom');
var animation = require('../utils/openAnimation');
var RcMenu = require('rc-menu');
var Item = RcMenu.Item;
var Divider = RcMenu.Divider;
var SubMenu = RcMenu.SubMenu;
var ItemGroup = RcMenu.ItemGroup;
var DigConfig = require('../utils/dig-config');
var Log = require('../utils/log');

function noop() {
}

var Menu = React.createClass({

    getDefaultProps: function() {
    	return {
            prefixCls: 'dig-rc-menu',
            onAppbarClassName: 'app-bar-menu',
            isOnAppbar: false,
            isWritingLog : false,
            onClick: noop,
            onOpen: noop,
            onClose: noop,
            className: '',
            theme: 'light'  // or dark
    	};
    },

    getInitialState: function() {
    	return {
            openKeys: []
    	};
    },

	render: function() {
        var openAnimation = this.props.openAnimation || this.props.openTransitionName;
        if (!openAnimation) {
            switch (this.props.mode) {
                case 'horizontal':
                    openAnimation = 'slide-up';
                    break;
                case 'vertical':
                    openAnimation = 'zoom-big';
                    break;
                case 'inline':
                    openAnimation = animation;
                    break;
                default:
            }
        }

        var props = {};
        var className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
        if(this.props.isOnAppbar){
            className += ' ' + this.props.onAppbarClassName;
        }
        if (this.props.mode !== 'inline') {
            // �������Ե�Ŀ����
            // �����͵Ĳ˵���Ҫ����������ر�
            // ���⣬�����͵Ĳ˵����ܿ�ģʽû��ʹ�ó���
            props = {
                openKeys: this.state.openKeys,
                onClick: this.handleClick,
                onOpen: this.handleOpenKeys,
                onClose: this.handleCloseKeys,
                openTransitionName: openAnimation,
                className
            };
        } else {
            props = {
                openAnimation,
                className
            };
        }

		return (
            <RcMenu {...this.props} {...props} />
		);
	},
    handleClick: function(e) {
        this.setState({
            openKeys: []
        });
        if(this.props.isWritingLog){
            Log.writeOperationLog('导航菜单', '打开模块', '打开模块' + e.item.props.children);
        }
        this.props.onClick(e);
    },
    handleOpenKeys: function(e) {
        this.setState({
            openKeys: e.openKeys
        });
        this.props.onOpen(e);
    },
    handleCloseKeys: function(e) {
        this.setState({
            openKeys: e.openKeys
        });
        this.props.onClose(e);
    }

});

Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;

module.exports = Menu;