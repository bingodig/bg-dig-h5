module.exports = {
	formatFloat: function (num, pos) {
	    return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
	},

	formatNumberToString: function(value, unit) {
	    var number = Number(value);

	    if (unint == "%") {
	        return this.formatFloat(number * 100, 2) + "%";
	    }
	    else {
	        if (number >= 100000000) {
	            return this.formatFloat((number / 100000000.0), 2) + "亿" + unint;
	        }
	        else if (number >= 10000) {
	            return this.formatFloat((number / 10000.0), 2) + "万" + unint;
	        }
	        else {
	            if (value.indexOf(".") > -1) {
	                return this.formatFloat(number, 2) + unint;
	            }
	            else {
	                if (number <= -100000000) {
	                    return this.formatFloat((number / 100000000.0), 2) + "亿" + unint;
	                }
	                else if (number <= -10000) {
	                    return this.formatFloat((number / 10000.0), 2) + "万" + unint;
	                }
	                else {
	                    return number + unint;
	                }
	            }
	        }
	    }
	}

}