var React = require('react');
var Classable = require('../mixins/classable');

var SilverlightHost = React.createClass({

	mixins: [Classable],

	propTypes: {
	  xapPath: React.PropTypes.string
	},

	getDefaultProps: function() {
		return {
			xapPath: ""
		};
	},

	render: function() {

		var classes = this.getClasses('dig-silverlight-host', {});

		var iframeStyle = { visibility:"hidden", width:0, height:0, border:0 };

		return (
			<form id="form1" runat="server" style={{height:'100%'}}>
				<div id="silverlightControlHost" className={classes}>
				    <object width="100%" height="100%"
				        type="application/x-silverlight-2" 
				        data="data:application/x-silverlight-2," >
				        <param name="source" value={this.props.xapPath}/>
				        <param name="onerror" value={this._onSilverlightError} />
				        <param name="background" value="white" />
				        <param name="minRuntimeVersion" value="4.0.60310.0" />
				        <param name="autoUpgrade" value="true" />
				        <a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.60310.0" 
				            style={{textDecoration:'none'}}>
				            <img 
				                src="http://go.microsoft.com/fwlink/?LinkId=161376" 
				                alt="Get Microsoft Silverlight" 
				                style={{borderStyle:'none'}}/>
				        </a>
				    </object>
				    <iframe id="_sl_historyFrame" 
				        style={iframeStyle}>
				    </iframe>
				</div>
			</form>
		);
	},

	_onSilverlightError: function(sender, args) {
	    var appSource = "";
	    if (sender != null && sender != 0) {
	        appSource = sender.getHost().Source;
	    }

	    var errorType = args.ErrorType;
	    var iErrorCode = args.ErrorCode;

	    if (errorType == "ImageError" || errorType == "MediaError") {
	        return;
	    }

	    var errMsg = "Unhandled Error in Silverlight Application " + appSource + "\n";

	    errMsg += "Code: " + iErrorCode + "    \n";
	    errMsg += "Category: " + errorType + "       \n";
	    errMsg += "Message: " + args.ErrorMessage + "     \n";

	    if (errorType == "ParserError") {
	        errMsg += "File: " + args.xamlFile + "     \n";
	        errMsg += "Line: " + args.lineNumber + "     \n";
	        errMsg += "Position: " + args.charPosition + "     \n";
	    }
	    else if (errorType == "RuntimeError") {
	        if (args.lineNumber != 0) {
	            errMsg += "Line: " + args.lineNumber + "     \n";
	            errMsg += "Position: " + args.charPosition + "     \n";
	        }
	        errMsg += "MethodName: " + args.methodName + "     \n";
	    }

	    throw new Error(errMsg);
	}

});

module.exports = SilverlightHost;