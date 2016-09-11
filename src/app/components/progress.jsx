var React = require('react');
var Classable = require('../mixins/classable');
var Progresscircle = require('rc-progress').Circle;
var assign = require('object-assign');
var warning = require('warning');
var DigConfig = require('../utils/dig-config');
var FontIcon = require('./font-icon');

var Line = React.createClass({

	mixins: [Classable],

	propTypes: {
		status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
		showInfo: React.PropTypes.bool,
		percent: React.PropTypes.number,
		strokeWidth: React.PropTypes.number,
		trailColor: React.PropTypes.string,
		format: React.PropTypes.oneOfType([
			React.PropTypes.node,
			React.PropTypes.string,
			React.PropTypes.func
		])
	},

	getDefaultProps: function() {
	  return {
		  percent: 0,
		  strokeWidth: 10,
		  status: 'normal', // exception active
		  showInfo: true,
		  trailColor: '#f3f3f3'
	  };
	},

	render: function() {

		var props = assign({}, this.props);

		if (parseInt(props.percent, 10) === 100) {
			props.status = 'success';
		}

		var progressInfo;

		if (props.format) {
			warning(typeof props.format === 'function',
				'dig.Progress props.format type is function, change format={xxx} to format={() => xxx}');
		}

		var percentText = props.percent + '%';

		var text = props.format || percentText;
		if (typeof props.format === 'string') {
			// ���¼���ԭ�����ַ����滻��ʽ
			text = props.format.replace('${percent}', props.percent);
		} else if (typeof props.format === 'function') {
			text = props.format(props.percent);
		}

		if (props.showInfo === true) {
			if (props.status === 'exception') {
				progressInfo = (
					<span className='dig-progress-line-text'>
            {props.format ? text : <FontIcon className="bingo-dig-icons-679" />}
          </span>
				);
			} else if (props.status === 'success') {
				progressInfo = (
					<span className='dig-progress-line-text'>
            {props.format ? text : <FontIcon className="bingo-dig-icons-676" />}
          </span>
				);
			} else {
				progressInfo = (
					<span className='dig-progress-line-text'>{text}</span>
				);
			}
		}

		var percentStyle = {
			width: percentText,
			height: props.strokeWidth
		};

		var statusClassName = 'status-' + props.status;

		var classObj = {};
		classObj['dig-progress-line-wrap'] = true;
		classObj['clearfix'] = true;
		classObj[statusClassName] = true;
		classObj['dig-progress-line-wrap-full'] = props.showInfo === false;

		var classes = this.getClasses('dig-progress', classObj);

		return (
			<div className={classes} style={props.style}>
				{progressInfo}
				<div className='dig-progress-line-outer'>
					<div className='dig-progress-line-inner'>
						<div className='dig-progress-line-bg' style={percentStyle}></div>
					</div>
				</div>
			</div>
		);
	}
});

var Circle = React.createClass({

	mixins: [Classable],

	propTypes: {
		status: React.PropTypes.oneOf(['normal', 'exception', 'success']),
		percent: React.PropTypes.number,
		strokeWidth: React.PropTypes.number,
		width: React.PropTypes.number,
		trailColor: React.PropTypes.string,
		format: React.PropTypes.oneOfType([
			React.PropTypes.node,
			React.PropTypes.string,
			React.PropTypes.func
		])
	},

	getDefaultProps: function() {
	  return {
		  width: 132,
		  percent: 0,
		  strokeWidth: 6,
		  status: 'normal', // exception
		  trailColor: '#f3f3f3'
	  };
	},

	getInitialState: function() {
		return {
			statusColorMap: {
				normal: DigConfig.ConfigCache.Colors.primaryColor1,
				exception: '#ff5500',
				success: '#87d068'
			}
		};
	},

    render: function () {

		var props = assign({}, this.props);

		if (parseInt(props.percent, 10) === 100) {
			props.status = 'success';
		}

		var style = {
			width: props.width,
			height: props.width,
			fontSize: props.width * 0.16 + 6
		};

		var progressInfo;
		var percentText = props.percent + '%';
		var text = props.format || percentText;

		if (props.format) {
			warning(typeof props.format === 'function',
				'dig.Progress props.format type is function, change format={xxx} to format={() => xxx}');
		}

		if (typeof props.format === 'string') {
			// ���¼���ԭ�����ַ����滻��ʽ
			text = props.format.replace('${percent}', props.percent);
		} else if (typeof props.format === 'function') {
			text = props.format(props.percent);
		}

		if (props.status === 'exception') {
			progressInfo = (
				<span className='dig-progress-circle-text'>
          {props.format ? text : <FontIcon className="bingo-dig-icons-679" />}
        </span>
			);
		} else if (props.status === 'success') {
			progressInfo = (
				<span className='dig-progress-circle-text'>
          {props.format ? text : <FontIcon className="bingo-dig-icons-676" />}
        </span>
			);
		} else {
			progressInfo = (
				<span className='dig-progress-circle-text'>{text}</span>
			);
		}

		var statusClassName = 'status-' + props.status;

		var classObj = {};
		classObj['dig-progress-circle-wrap'] = true;
		classObj[statusClassName] = true;

		var classes = this.getClasses('dig-progress', classObj);

        return (
			<div className={classes} style={props.style}>
				<div className='dig-progress-circle-inner' style={style}>
					<Progresscircle percent={props.percent} strokeWidth={props.strokeWidth}
									strokeColor={this.state.statusColorMap[props.status]} trailColor={props.trailColor} />
					{progressInfo}
				</div>
			</div>
        )
    }
});

module.exports = {
	Line: Line,
	Circle: Circle
};