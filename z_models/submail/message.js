var request = require('request');
var crypto = require('crypto');
var netData = require('../netData');
var code = require('../../z_util/code');
function Message(appid,signtype,appkey) {
    this.appid = appid;
    this.signtype = signtype;
    this.appkey = appkey;
    this.send = function(params) {
        var api = 'https://api.submail.cn/message/send.json';
        var requestParams = params;
        requestParams['appid'] = this.appid;
        var self = this;
        request({
            uri: 'https://api.submail.cn/service/timestamp.json',
            method: 'GET'
        }, function(error, response, body) {
            var result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', body);
            });
        });
    };

    this.voicexsend = function(params,callback) {
        console.log(params);
        var api = 'https://api.submail.cn/voice/xsend.json';
        var requestParams = params;
        requestParams['appid'] = this.appid;
        var self = this;
        request({
            uri: 'https://api.submail.cn/service/timestamp.json',
            method: 'GET'
        }, function(error, response, body) {
            var result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            console.log(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                //if (err) {
                //    return console.error('upload failed:', err);
                //}
                console.log('Upload successful!  Server responded with:', body);
                var sendResult;
                if(err)
                {
                    sendResult = new netData(code.submail.sendMessageError,{},err);
                }
                else
                {
                    //console.log(body);
                    //console.log(body.status);
                    var jBody = JSON.parse(body);
                    if(jBody.status === "success")
                    {
                        sendResult = new netData(code.success,{},"消息发送成功");
                    }
                    else
                    {
                        sendResult = new netData(code.submail.sendMessageError,{},'Server responded with:'+ body);
                    }
                }
                callback(sendResult);
            });
        });
    };

    this.xsend = function(params,callback) {
        var api = 'https://api.submail.cn/message/xsend.json';
        var requestParams = params;
        requestParams['appid'] = this.appid;
        var self = this;
        request({
            uri: 'https://api.submail.cn/service/timestamp.json',
            method: 'GET'
        }, function(error, response, body) {
            var result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                //if (err) {
                //    return console.error('upload failed:', err);
                //}
                console.log('Upload successful!  Server responded with:', body);
                var sendResult;
                if(err)
                {
                    sendResult = new netData(code.submail.sendMessageError,{},err);
                }
                else
                {
                    //console.log(body);
                    //console.log(body.status);
                    var jBody = JSON.parse(body);
                    if(jBody.status === "success")
                    {
                        sendResult = new netData(code.success,{},"消息发送成功");
                    }
                    else
                    {
                        sendResult = new netData(code.submail.sendMessageError,{},'Server responded with:'+ body);
                    }
                }
                callback(sendResult);
            });
        });
    };
    this.subscribe = function(params) {
        var api = 'https://api.submail.cn/addressbook/message/subscribe.json';
        var requestParams = params;
        requestParams['appid'] = this.appid;
        var self = this;
        request({
            uri: 'https://api.submail.cn/service/timestamp.json',
            method: 'GET'
        }, function(error, response, body) {
            var result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', body);
            });
        });
    };
    this.unsubscribe = function(params) {
        var api = 'https://api.submail.cn/addressbook/message/unsubscribe.json';
        var requestParams = params;
        requestParams['appid'] = this.appid;
        var self = this;
        request({
            uri: 'https://api.submail.cn/service/timestamp.json',
            method: 'GET'
        }, function(error, response, body) {
            var result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', body);
            });
        });
    };
    this.createSignature = function(params) {
        if (this.signtype == 'normal') {
            return this.appkey;
        } else {
            return this.buildSignature(params);
        }
    };

    this.buildSignature = function(params) {
        var sortedParams = this.sortOnKeys(params);
        var signStr = "";
        for(var key in sortedParams) {
            signStr += key + '=' + sortedParams[key] + '&';
        }
        signStr = signStr.substring(0, signStr.length-1);
        signStr = this.appid + this.appkey + signStr + this.appid + this.appkey;
        if (this.signtype == 'md5') {
            var md5sum = crypto.createHash('md5');
            md5sum.update(signStr);
            return md5sum.digest('hex');
        }
        if (this.signtype == 'sha1') {
            var sha1sum = crypto.createHash('sha1');
            sha1sum.update(signStr);
            return sha1sum.digest('hex');
        }
        return '';
    };

    this.sortOnKeys = function(dict) {
        var sorted = [];
        for(var key in dict) {
            if (key == 'attachments') {
                continue;
            }
            sorted[sorted.length] = key;
        }
        sorted.sort();

        var tempDict = {};
        for(var i = 0; i < sorted.length; i++) {
            tempDict[sorted[i]] = dict[sorted[i]];
        }

        return tempDict;
    };
};

module.exports = Message;
