var React = require('react');
var RcQueueAnim = require('rc-queue-anim');
var Classable = require('../mixins/classable');

var QueueAnim = React.createClass({

    mixins: [Classable],

    render: function () {
        var classObj = {};
        classObj['dig-queue-anim'] = true;
        classObj[this.props.className] = !!this.props.className;

        var classes = this.getClasses(classObj);

        return (
            <RcQueueAnim {...this.props} className={classes}>
            </RcQueueAnim>
        )
    }
});
module.exports =  QueueAnim;