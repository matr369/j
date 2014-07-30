/**
 * Created by Mantsevich on 17.07.2014.
 */
define(["jquery", "App"], function($, App){
    var Config = App.Config.request,
        defaults = {
            type: "GET"
        },

        /**
         * Constructor
         * @param params
         * @constructor
         */
        Request = function(params){
            // success, error - will run with all send call.
            this.options = _.defaults(params || {}, defaults);
        };

    Request.prototype = {

        /**
         * Send request with data
         * @param data
         * @returns {*}
         */
        send: function(data){
            var self = this,
                xhr = $.Deferred(),
                requestParams = $.extend(true, {}, this.options, { // add success :::???
                    data: data || {}
                }),
                ajXHR = $.ajax(requestParams);

            ajXHR.then(function(responce){
                if(responce["status"] == "fail"){
                    xhr.rejectWith(self, [error]);
                }
                else{
                    xhr.resolveWith(self, [responce]);
                }
            }, function(error){
                //TODO: App.Error("");
                xhr.rejectWith(self, [error]);
            });

            return xhr;
        }

    };

    return Request;
});