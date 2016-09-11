var React = require('react');
var ReactDOM = require('react-dom');
var Showdown = require('showdown');
var Classable = require('../../mixins/classable');
var converter = new Showdown.Converter();
converter.setOption('tables', true);
converter.setOption('tablesHeaderId', true);
var $ = require('jquery');
var hljs = require('highlight.js');

var MarkdownFile = React.createClass({

    mounted: false,

    mixins: [Classable],

    propTypes: {
        fileName: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
    	return {
    		isShowCounter: false
    	};
    },

    getInitialState: function() {
        return {
            md: ''
        };
    },
    componentDidMount: function() {
        this.mounted = true;
        $.get(this.props.fileName, function (data) {
            if (this.mounted) {
                this.setState({md: data}, function () {
                    hljs.initHighlighting();
                    hljs.initHighlighting.called = false;
                });
            }
        }.bind(this));
    },

    componentWillUnmount() {
        this.mounted = false;
    },

    render: function() {
        var { isShowCounter, className } = this.props;

        var classObj = {};
        classObj['dig-markdown'] = true;
        classObj['markdown-counter'] = isShowCounter;
        classObj[className] = !!className;

        var classes = this.getClasses(classObj);

        return (
            <div
                dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.md)}}
                className={classes} />
        );
    }
});

module.exports = MarkdownFile;