var React = require('react');
var Classable = require('../../mixins/classable');
var PropTypes = React.PropTypes;

var Col = React.createClass({

  mixins: [Classable],

  propTypes: {
    span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    push: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pull: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    children: PropTypes.node,
    xs: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    sm: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    md: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    lg: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  },
  
  render: function() {

    var props = this.props;
    var { span, order, offset, push, pull, className, children, ...others } = props;

    var sizeClassObj = {};

    ['xs', 'sm', 'md', 'lg'].forEach(function(size) {
      var sizeProps = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }

      var spanName = 'col-' + size + '-' + sizeProps.span;
      var orderName = 'col-' + size + '-' + sizeProps.order;
      var offsetName = 'col-' + size + '-' + sizeProps.offset;
      var pushName = 'col-' + size + '-' + sizeProps.push;
      var pullName = 'col-' + size + '-' + sizeProps.pull;

      sizeClassObj[spanName] = sizeProps.span;
      sizeClassObj[orderName] = sizeProps.order;
      sizeClassObj[offsetName] = sizeProps.offset;
      sizeClassObj[pushName] = sizeProps.push;
      sizeClassObj[pullName] = sizeProps.pull;
    });

    var spanName = 'col-' + span;
    var orderName = 'col-order-' + order;
    var offsetName = 'col-offset-' + offset;
    var pushName = 'col-push-' + push;
    var pullName = 'col-pull-' + pull;

    sizeClassObj[spanName] = span;
    sizeClassObj[orderName] = order;
    sizeClassObj[offsetName] = offset;
    sizeClassObj[pushName] = push;
    sizeClassObj[pullName] = pull;
    sizeClassObj[className] = !!className;

    var classes = this.getClasses(sizeClassObj);

    //var classes = this.getClasses({
    //  [`col-${span}`]: span,
    //  [`col-order-${order}`]: order,
    //  [`col-offset-${offset}`]: offset,
    //  [`col-push-${push}`]: push,
    //  [`col-pull-${pull}`]: pull,
    //  [className]: !!className,
    //  ...sizeClassObj
    //});

    return (
        <div {...others} className={classes}>{children}</div>
    );
  }

});

module.exports = Col;