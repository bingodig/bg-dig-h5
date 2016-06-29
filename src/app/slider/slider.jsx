import React from 'react';
import RcSlider from 'rc-slider';

require('./style/index.scss');
var Slider = React.createClass({

    getDefaultProps: function() {
      return {
          prefixCls: 'dig-rc-slider',
          tipTransitionName: 'zoom-down'
      };
    },

    render: function () {
        const { isIncluded, marks, index, defaultIndex, ...other } = this.props;

        if (isIncluded !== undefined) {
            // ���� `isIncluded`
            rest.included = isIncluded;
        }

        if (Array.isArray(marks)) {
            // ���ݵ� marks Ϊ��������
            other.min = 0;
            other.max = marks.length - 1;
            other.step = 1;

            if (index !== undefined) {
                other.value = index;
            }
            if (defaultIndex !== undefined) {
                other.defaultValue = defaultIndex;
            }

            other.marks = {};
            marks.forEach((val, idx) => {
                other.marks[idx] = val;
            });
        } else {
            other.marks = marks;
        }


        return (
            <RcSlider {...other} />
        )
    }
});

module.exports = Slider;

