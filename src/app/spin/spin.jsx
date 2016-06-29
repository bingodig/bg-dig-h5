var React = require('react');
var Classable = require('../../mixins/classable');
var isCssAnimationSupported = require('css-animation').isCssAnimationSupported;

require('./style/index.scss');

var Spin = React.createClass({

    mixins: [Classable],

    propTypes: {
        className: React.PropTypes.string,
        size: React.PropTypes.oneOf(['small', 'default', 'large'])
    },

    getDefaultProps: function() {
    	return {
            spining: true
    	};
    },

	render: function() {
        var { className, size, tip } = this.props;

        var classObj = {};
        classObj['dig-spin'] = true;
        classObj['dig-spin-sm'] = size === 'small';
        classObj['dig-spin-lg'] = size === 'large';
        classObj['dig-spin-spining'] = this.props.spining;
        classObj[className] = !!className;

        var classes = this.getClasses(classObj);

        var spinElement;
        if (!isCssAnimationSupported || 'tip' in this.props) {
            // not support for animation, just use text instead
            spinElement = <div className={classes}>{tip || 'Мгдижа...'}</div>;
        } else {
            spinElement = (
                <div className={classes}>
                    <span className="dig-spin-dot dig-spin-dot-first" />
                    <span className="dig-spin-dot dig-spin-dot-second" />
                    <span className="dig-spin-dot dig-spin-dot-third" />
                </div>
            );
        }

        if (this.isNestedPattern()) {
            return (
                <div className={this.props.spining ? "dig-spin-nested-loading" : ''}>
                    {spinElement}
                    <div className="dig-spin-container">
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return spinElement;
	},
    isNestedPattern: function() {
        return !!(this.props && this.props.children);
    }

});

module.exports = Spin;