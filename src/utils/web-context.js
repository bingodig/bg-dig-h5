var $ = require('jquery');
var DigConfig = require('./dig-config');
var Permission = require('./permission');

var user = {};
var isLoggedIn = false;
var permissions = [];

module.exports = {
	User: user,

	IsLoggedIn:  isLoggedIn,

	Permissions: permissions,

	init: function (callback) {
		$.get(DigConfig.ConfigCache.UserInfoAddress, function(result) {
			if(result.resultCode == 200 && result.resultDesc == 'OK'){
				this.User = result.details;
				this.IsLoggedIn = true;
			}else{
				this.IsLoggedIn = false;
			}
			Permission.getPermission(function(permissions) {
				this.Permissions = permissions;
				callback(this.IsLoggedIn);
			}.bind(this));
		}.bind(this));
	}
};