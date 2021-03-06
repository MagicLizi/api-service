var Message = require('./message.js');

function MessageXSend(appid,signtype,appkey) {
    this.to = [];
    this.to_name = [];
    this.addressbook = [];
    this.project = '';
    this.vars = {};

    // set email
    this.add_to = function(address) {
        this.to.push(address);
    };

    this.add_to_name = function(name) {
        this.to_name.push(name);
    };

    this.add_addressbook = function(addressbook) {
        this.addressbook.push(addressbook);
    };

    this.set_project = function(project) {
        this.project = project;
    };

    this.add_var = function(key, val) {
        this.vars[key] = val;
    };

    this.build_params = function() {
        var params = {};
        if (this.to.length > 0) {
            var toValue = '';
            for (index in this.to) {
                var name = ''
                if (this.to_name[index] != undefined) {
                    name = this.to_name[index];
                }
                toValue += name + '<' + this.to[index] + '>,';
            }
            params['to'] = toValue.substring(0, toValue.length-1);
        }
        if (this.addressbook.length > 0) {
            var addressbookValue = '';
            for (index in this.addressbook) {
                addressbookValue += this.addressbook[index] + ',';
            }
            params['addressbook'] = addressbookValue.substring(0, addressbookValue.length-1);
        }
        if (this.project != '') {
            params['project'] = this.project;
        }
        if (Object.keys(this.vars).length > 0) {
            params['vars'] = JSON.stringify(this.vars);
        }
        return params;
    };
    this.xsend = function(callback) {
        var message = new Message(appid,signtype,appkey);
        message.xsend(this.build_params(),callback);
    }

    this.vxsend = function(callback){
        var message = new Message(appid,signtype,appkey);
        var params = this.build_params();
        params.to = this.to[0];
        message.voicexsend(params,callback);
    }
};

module.exports = MessageXSend;
