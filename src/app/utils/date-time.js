module.exports = {

	addDays: function(d, days) {
		var newDate = this.clone(d);
		newDate.setDate(d.getDate() + days);
		return newDate;
	},

	addMonths: function(d, months) {
		var newDate = this.clone(d);
		newDate.setMonth(d.getMonth() + months);
		return newDate;
	},

	clone: function(d) {
		return new Date(d.getTime());
	},

	getDaysInMonth: function(d) {
		var resultDate = this.getFirstDayOfMonth(d);

		resultDate.setMonth(resultDate.getMonth() + 1);
		resultDate.setDate(resultDate.getDate() - 1);

		return resultDate.getDate();
	},

	getFirstDayOfMonth: function(d) {
		return new Date(d.getFullYear(), d.getMonth(), 1);
	},

	getFirstMonthOfYear: function(d) {
		return new Date(d.getFullYear(), 1, 1);
	},

	getStartYear: function(d) {
		var remainder = d.getFullYear() % 12;
		if (remainder === 0) {
			remainder = 12;
		};
		var startYear = d.getFullYear() - remainder + 1;
		return new Date(startYear, 1, 1);
	},

	getFullMonth: function(d) {
		var month = d.getMonth();
		switch (month) {
			case 0: return '1月';
			case 1: return '2月';
			case 2: return '3月';
			case 3: return '4月';
			case 4: return '5月';
			case 5: return '6月';
			case 6: return '7月';
			case 7: return '8月';
			case 8: return '9月';
			case 9: return '10月';
			case 10: return '11月';
			case 11: return '12月';
		}
	},

	getShortMonth: function(d) {
		var month = d.getMonth();
		switch (month) {
			case 0: return '1月';
			case 1: return '2月';
			case 2: return '3月';
			case 3: return '4月';
			case 4: return '5月';
			case 5: return '6月';
			case 6: return '7月';
			case 7: return '8月';
			case 8: return '9月';
			case 9: return '10月';
			case 10: return '11月';
			case 11: return '12月';
		}
	},

	getDayOfWeek: function(d) {
		var dow = d.getDay();
		switch (dow) {
			case 0: return '星期日';
			case 1: return '星期一';
			case 2: return '星期二';
			case 3: return '星期三';
			case 4: return '星期四';
			case 5: return '星期五';
			case 6: return '星期六';
		}
	},

	getWeekArray: function(d) {
		var dayArray = [];
		var daysInMonth = this.getDaysInMonth(d);
		var daysInWeek;
		var emptyDays;
		var firstDayOfWeek;
		var week;
		var weekArray = [];

		for (var i = 1; i <= daysInMonth; i++) {
			dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
		};

		while (dayArray.length) {
			firstDayOfWeek = dayArray[0].getDay();
			daysInWeek = 7 - firstDayOfWeek;
			emptyDays = firstDayOfWeek;
			week = dayArray.splice(0, daysInWeek);

			for (var i = 0; i < emptyDays; i++) {
				week.unshift(null);
			};

			weekArray.push(week);
		}

		return weekArray;
	},

	getMonthArray: function(d) {
		var monthArray = [];
		var resultArray = [];
		var row;

		for (var i = 0; i < 12; i++) {
			var date = new Date(d.getFullYear(), i, 1);
			monthArray.push(date);
		};

		while (monthArray.length) {
			row = monthArray.splice(0, 4);

			resultArray.push(row);
		}

		return resultArray;
	},

	getYearArray: function(d) {
		var remainder = d.getFullYear() % 12;
		var startYear = d.getFullYear() - remainder + 1;
		var yearArray = [];
		var resultArray = [];
		var row;

		for (var i = startYear; i < startYear + 12; i++) {
			yearArray.push(new Date(i, 1, 1));
		};

		while (yearArray.length) {
			row = yearArray.splice(0, 4);

			resultArray.push(row);
		}

		return resultArray;
	},

	format: function(date, mode) {
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var y = date.getFullYear();

		if (mode === "Day") {
			return y + '-' + m + '-' + d;
		}else if (mode === "Month") {
			return y + '-' + m;
		}else if (mode === "Year") {
			return y;
		}

	},

	isEqualDate: function(d1, d2) {
		return d1 && d2 &&
			(d1.getFullYear() === d2.getFullYear()) &&
			(d1.getMonth() === d2.getMonth()) &&
			(d1.getDate() === d2.getDate());
	},

	isEqualMonth: function(d1, d2) {
		return d1 && d2 &&
			(d1.getFullYear() === d2.getFullYear()) &&
			(d1.getMonth() === d2.getMonth());
	},

	isEqualYear: function(d1, d2) {
		return d1 && d2 &&
			(d1.getFullYear() === d2.getFullYear());
	},

	monthDiff: function(d1, d2) {
		var m;
		m = (d1.getFullYear() - d2.getFullYear()) * 12;
		m += d1.getMonth();
		m -= d2.getMonth();
		return m;
	},

	//将数字格式日期转换为显示日期。20131030 to 2013年10月30日
	getDisplayDateString: function(date) {
		var result = "";
		var strDate = date.toString();
		var intDate = parseInt(strDate, 10);
		if (strDate.length == 8) {
			var year = Math.floor(intDate / 10000);
			var month = Math.floor((intDate % 10000) / 100);
			var day = intDate % 100;

			result = year + "年" + month + "月" + day + "日";
		}
		else if (strDate.length == 6) {
			var year = Math.floor(intDate / 100);
			var month = intDate % 100;

			result = year + "年" + month + "月";
		}
		else if (strDate.length == 4) {
			result = intDate + "年";
		}
		else if (strDate.length == 2) {
			result = intDate + "日";
		}
		else {
			result = strDate;
		}

		return result;
	},

	//将数字格式日期转换为显示日期。201310301225 to 2013年10月30日 12:25
	getDisplayDateTimeString: function(date) {
		var result = date;
		var strDate = date.toString();
		if (strDate.length == 12) {
			result = this.getDisplayDateString(strDate.substr(0, 8));
			var strTime = strDate.substr(8, 2) + ":" + strDate.substr(10, 2);
			result += " " + strTime;
		}
		return result;
	}

}