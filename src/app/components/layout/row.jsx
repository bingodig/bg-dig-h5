var React = require('react');
var Classable = require('../../mixins/classable');

var Row = React.createClass({

    mixins: [Classable],

    propTypes: {
        type: React.PropTypes.string,
        align: React.PropTypes.string,
        justify: React.PropTypes.string,
        className: React.PropTypes.string,
        children: React.PropTypes.node,
        gutter: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            gutter: 0
        };
    },
  
    render: function() {

        var { type, justify, align, className, gutter, style, children, ...others } = this.props;

        var rowStyle = gutter > 0 ? {
            marginLeft: gutter / -2,
            marginRight: gutter / -2,
            ...style
        } : style;

        var cols = React.Children.map(children,function(col) {
            if (col === null) return null;

            var colStyle = col.props.style;

            return React.cloneElement(col, {
                style: gutter > 0 ? {
                    paddingLeft: gutter / 2,
                    paddingRight: gutter / 2,
                    ...colStyle
                } : colStyle
            });
        });

        var typeName = 'row-' + type;
        var typeJustifyName = 'row-' + type + '-' + justify;
        var typeAlignName = 'row-' + type + '-' + align;

        var classObj = {};
        classObj['row'] = true;
        classObj[typeName] = type;
        classObj[typeJustifyName] = justify;
        classObj[typeAlignName] = align;
        classObj[className] = !!className;

        var classes = this.getClasses(classObj);

        return (
            <div {...others} className={classes} style={rowStyle}>{cols}</div>
        );
    }

});

module.exports = Row;