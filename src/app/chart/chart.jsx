var React = require('react');
var ReactDOM = require('react-dom');
var echarts = require('echarts');

var Chart = React.createClass({

	getDefaultProps: function() {
	  return {
		  option: {}
	  };
	},

	componentDidMount: function() {
		this._setContainSize();
        var chartContainer = ReactDOM.findDOMNode(this.refs.chartContainer);
		this.chart = echarts.init(chartContainer);
		this.chart.setOption(this.props.option);

		//param to parentClass,role event call 
		typeof(eval(this.props.btnEvents)) == "function" ? this.props.btnEvents(this.chart) : '';
	},

	componentDidUpdate: function(prevProps, prevState) {
		this._setContainSize();
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.isMounted()) {
			this.chart.setOption(nextProps.option);
		}
	},

	componentWillUnmount: function() {
		if (this.isMounted()) {
			this.chart.dispose();
		}
	},

	render: function() {
		return (
			<div ref="chartContainer"/>
		);
	},

	getCurrentChart: function() {
		if (this.isMounted()) {
			return this.chart;
		}
	},

	_setContainSize: function() {  
	  var el = ReactDOM.findDOMNode(this);
	  //var elHeight = el.offsetHeight == 0 ? 400 : el.offsetHeight;
	  //var elWidth = el.offsetWidth == 0 ? 800 : el.offsetWidth;

	  //el.style.width = elWidth + 'px';
	  el.style.height = 100 +'%';
	}

});

module.exports = Chart;