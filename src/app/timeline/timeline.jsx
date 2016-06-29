var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../../mixins/classable');

require('./style/index.scss');


var TimelineItem = React.createClass({

    mixins: [Classable],

    getDefaultProps: function() {
    	return {
            prefixCls: 'dig-timeline',
            color: 'primary',
            last: false,
            pending: false
    	};
    },

	render: function() {
        var { prefixCls, color, last, children, pending } = this.props;

        var itemName = prefixCls + '-item';
        var itemLastName = prefixCls + '-item-last';
        var itemPendingName = prefixCls + '-item-pending';
        var itemTailName = prefixCls + '-item-tail';
        var itemHeadName = prefixCls + '-item-head';
        var itemHeadColorName = prefixCls + '-item-head-' + color;
        var itemHeadClassName = itemHeadName + ' ' + itemHeadColorName;
        var itemContentName = prefixCls + '-item-content';

        var classObj = {};
        classObj[itemName] = true;
        classObj[itemLastName] = last;
        classObj[itemPendingName] = pending;

        var itemClassName = this.getClasses(classObj);

		return (
            <li className={itemClassName}>
                <div className={itemTailName} />
                <div className={itemHeadClassName} />
                <div className={itemContentName}>{children}</div>
            </li>
		);
	}

});


var Timeline = React.createClass({

	mixins: [Classable],

	getDefaultProps: function() {
		return {
            prefixCls: 'dig-timeline'
		};
	},

	render: function() {

        var { prefixCls, children, pending } = this.props;
        var pendingNode = typeof pending === 'boolean' ? null : pending;

        var pendingName = prefixCls + '-pending';

        var classObj = {};
        classObj[prefixCls] = true;
        classObj[pendingName] = !!pending;

        var classes = this.getClasses(classObj);

		return (
            <ul className={classes}>
                {
                    React.Children.map(children, (ele, idx) =>
                            React.cloneElement(ele, {
                                last: idx === children.length - 1
                            })
                    )
                }
                {(!!pending)
                    ? <TimelineItem pending={!!pending}>{pendingNode}</TimelineItem>
                    : null}
            </ul>
		);
	}

});

Timeline.Item = TimelineItem;

module.exports = Timeline;