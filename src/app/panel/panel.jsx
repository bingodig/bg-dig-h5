
var React = require('react');
var Paper = require('../paper/paper.jsx');
var Classable = require('../../mixins/classable');

require('./style/index.scss');


var Header = React.createClass({

    propTypes: {
        headerRightElements: React.PropTypes.array,
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string
    },

	render: function(){
		return(
			<div className="header">
				<div className="title">
					{this.props.title}
				</div>
				<div className="sub-title">
					{this.props.subTitle}
				</div>
				<div className="header-right">
					{this.props.headerRightElements}
				</div>				
			</div>
		)
	}
});

var Panel = React.createClass({

    mixins: [Classable],

	propTypes: {
        headerRightElements: React.PropTypes.array,
		isShowHeader: React.PropTypes.bool,
		title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        color: React.PropTypes.string,
        zDepth: React.PropTypes.number,
        isDarkTheme: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
            isShowHeader: true,
			headerRightElements: [],
			title: '',
            subTitle: '',
            zDepth: 1,
            color: 'normal',
            isDarkTheme: false
		};
	},

	render: function() {
		//when a header,removing border-top
		var {
		  title,
		  subTitle,
		  zDepth,
		  color,
		  ...other } = this.props;

		var header = this.props.isShowHeader ? (
            <Header {...other} title={title} subTitle={subTitle} headerRightElements={this.props.headerRightElements} topborder={0}/>
		) : null;

		var content = (
            <div className="panelWrap" style={{borderTop:this.props.topBorder}}>
                {this.props.children}
            </div>
		);

        var classes = this.getClasses('dig-panel', {
            'dig-dark-theme': this.props.isDarkTheme,
            'dig-is-primary': color == 'primary',
            'dig-is-secondary': color == 'secondary',
            'dig-is-info': color == 'info',
            'dig-is-success': color == 'success',
            'dig-is-warning': color == 'warning',
            'dig-is-error': color == 'error'
        });

		return (
			<Paper zDepth={zDepth}>
                <div className={classes}>
                    {header}
                    {content}
                </div>
			</Paper>
		);
	}
});

module.exports = Panel;