module.exports = {
	
	jsonToObj: function(param){
		var obj = {};
		if (typeof(param) == "string") {
			obj = eval('(' + param + ')');
		} else if (typeof(param) == "object") {
			obj = param;
		}
		return obj;
	},

	objToJson: function(param){
		var string = '';
		if (typeof(param) == "string") {
			string = param;
		} else if (typeof(param) == "object") {
			string = JSON.stringify(param);
		}
		return string;
	}
}