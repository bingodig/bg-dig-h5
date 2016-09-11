var $ = require('jquery');
var UniqueId = require('./unique-id');
var Convert = require('./convert');
var DigConfig = require('./dig-config');

var formatResponse = function(resp, returnDataType) {
    var result = {};
    var response = resp.responseText;
    var dmsReturnObj = Convert.jsonToObj(response);
    if (dmsReturnObj && dmsReturnObj.resultCode == 200) {
        result.ok = true;
        result.status = dmsReturnObj.resultCode;
        result.statusText = dmsReturnObj.resultDesc;
        result.affectedRows = dmsReturnObj.affectedRows;
        result.RowsCount = dmsReturnObj.rows ? dmsReturnObj.rows.length : 0;
        result.data = dmsReturnObj.rows ? formatReturnData(dmsReturnObj.columnNames, dmsReturnObj.rows, returnDataType) : [];
    }
    else{
        result.ok = false;
        result.status = dmsReturnObj ? dmsReturnObj.resultCode : 0;
        result.statusText = 'ERROR';
        result.affectedRows = -1;
        result.RowsCount = 0;
        result.data = null;
    }
    return result;
};

var	formatReturnData = function(columnNames, rows, returnDataType) {
    var returnArr = [];
    var type = returnDataType || 'obj';
    for (var i = 0; i < rows.length; i++) {
        var obj = {};
        for (var j = 0; j < columnNames.length; j++) {
            obj[columnNames[j]] = rows[i][j];
        }
        if (type === 'obj') {
            returnArr.push(obj);
        }
        else{
            returnArr.push(Convert.objToJson(obj));
        }
    }
    return returnArr;
};

module.exports = {
    getDataWithParamsForJson: function(commandName, params, callback){
        this.post(commandName, params, function(response){
            var result = formatResponse(response, 'json');
            callback(result);
        });
    },

    getDataWithParams: function(commandName, params, callback){
        this.post(commandName, params, function(response){
            var result = formatResponse(response, 'obj');
            callback(result);
        });
    },

    getDataForJson: function(commandName, callback){
        this.post(commandName, null, function(response){
            var result = formatResponse(response, 'json');
            callback(result);
        });
    },

    getData: function(commandName, callback){
        this.post(commandName, null, function(response){
            var result = formatResponse(response, 'obj');
            callback(result);
        });
    },

    post: function(commandName, params, callback){
        var obj = {};
        obj.RequestId = UniqueId.generate();
        obj.CommandName = commandName;
        obj.Params = params || {};

        obj = Convert.objToJson(obj);
        $.ajax({
            type: "POST",
            url: DigConfig.ConfigCache.DmsAddress,
            data: obj,
            contentType:"text/html;charset=UTF-8",
            complete: function(resp) {
                if(callback){
                    callback(resp);
                }
            }
        });
    }
};