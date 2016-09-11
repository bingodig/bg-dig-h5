var React = require('react');
var Classable = require('../../mixins/classable');
var FontIcon = require('../font-icon');

var PanelBox = React.createClass({

    mixins: [Classable],

    propTypes: {
        title: React.PropTypes.string.isRequired,
        iconColor: React.PropTypes.string,
        iconClassName: React.PropTypes.string,
        value: React.PropTypes.number,
        unit: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            title: '',
            iconColor: '',
            iconClassName : '',
            value: 0,
            unit: ''
        };
    },

    render: function () {

        var classes = this.getClasses('dig-panel-box');
        var iconClass = "icon " + this.props.iconClassName;

        return (
            <div className={classes}>
                <div className="panel-top">
                    <FontIcon className={iconClass} style={{color: this.props.iconColor}}></FontIcon>
                </div>
                <div className="panel-info">
                    <span>{this.props.title}</span>
                </div>
                <div className="panel-bottom">
                    <span>{this.props.value}</span><span className="small">{this.props.unit}</span>
                </div>
            </div>
        )
    }
});

module.exports = PanelBox;