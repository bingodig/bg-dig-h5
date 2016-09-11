var $ = require('jquery');
var DigConfig = require('./dig-config');
var warning = require('warning');

module.exports = {
	writeOperationLog: function(moduleName, operationName, description, callback) {
        warning(DigConfig.ConfigCache.OperationLogAddress,
            'OperationLogAddress is null, set the OperationLogAddress to config.jsx');
        warning(DigConfig.ConfigCache.SystemName,
            'SystemName is null, set the SystemName to config.jsx');

        var params = {
            systemName: DigConfig.ConfigCache.SystemName,
            moduleName: moduleName,
            operationName: operationName,
            description: description
        };
		$.post(DigConfig.ConfigCache.OperationLogAddress, params, function(result) {
            if(callback){
                callback(result);
            }
		});
	},

    writeLoginLog: function(resolution, description, callback) {
        warning(DigConfig.ConfigCache.LoginLogAddress,
            'LoginLogAddress is null, set the LoginLogAddress to config.jsx');
        warning(DigConfig.ConfigCache.SystemName,
            'SystemName is null, set the SystemName to config.jsx');

        var params = {
            systemName: DigConfig.ConfigCache.SystemName,
            resolution: resolution,
            description: description
        };
		$.post(DigConfig.ConfigCache.LoginLogAddress, params, function(result) {
            if(callback){
                callback(result);
            }
		});
	}

};