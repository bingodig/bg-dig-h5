var $ = require('jquery');
var DigConfig = require('./dig-config');
var _ = require('underscore');

module.exports = {
	checkPermission: function(permissionId, callback) {
		var params = {key: permissionId};
		$.get(DigConfig.ConfigCache.PermissonsActionAddress, params, function(result) {
			var isValidatePass = result.details;
			callback(isValidatePass);
		});
	},

	getPermission: function (callback) {
		$.get(DigConfig.ConfigCache.PermissonsAddress, function(result) {
			var permissions = result.details;
			callback(permissions);
		});
	},

	getUserInfo: function (callback) {
		$.get(DigConfig.ConfigCache.UserInfoAddress, function(result) {
			var userInfo = result.details;
			callback(userInfo);
		});
	},

	checkMenuPermission: function(permissions, menuItems){
        if(permissions && permissions.length > 0){
            for (var i=0; i < menuItems.length; i++) {
                var menuItem = menuItems[i];
                if(menuItem.props.title && menuItem.props.children.length > 0){
                    var children = this.checkMenuPermission(permissions, menuItem.props.children);
                    menuItems[i] = React.cloneElement(menuItem, { children: children });
                }else{
                    if(!_.findWhere(permissions, {operation: menuItem.key})){
                        menuItems[i] = React.cloneElement(menuItem, { disabled: true });
                    }
                }
            }
        }

		return menuItems;
	}

};