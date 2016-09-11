// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = function matchMediaPolyfill() {
        return {
            matches: false,
            addListener() {
            },
            removeListener() {
            }
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}


import SlickCarousel from 'react-slick';
import React from 'react';



var Carousel = React.createClass({

  	getDefaultProps: function() {
  	  return {
          dots: true,
          arrows: false
  	  };
  	},

  	render: function() {
        const { ...props } = this.props;

        let className = 'dig-carousel';
        if (props.vertical) {
            className = `${className} dig-carousel-vertical`;
        }

    	return (
            <div className={className}>
                <SlickCarousel {...props} />
            </div>
        );
    }
});

module.exports = Carousel;