import React from 'react';

var BreadcrumbItem = React.createClass({

    propTypes: {
        prefixCls: React.PropTypes.string,
        separator: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element,
        ]),
        href: React.PropTypes.string
    },

    getDefaultProps: function() {
      return {
          prefixCls: 'dig-breadcrumb',
          separator: '/'
      };
    },

    render: function () {
        const { prefixCls, separator, children, ...restProps } = this.props;
        let link;
        if ('href' in this.props) {
            link = <a className={`${prefixCls}-link`} {...restProps}>{children}</a>;
        } else {
            link = <span className={`${prefixCls}-link`} {...restProps}>{children}</span>;
        }

        return (
            <span>
                {link}
                <span className={`${prefixCls}-separator`}>{separator}</span>
            </span>
        )
    }
});

module.exports = BreadcrumbItem;
