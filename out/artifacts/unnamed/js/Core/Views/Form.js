/**
 * Created by dmantsevich on 7/25/2014.
 */
define(["Views/Base", "Views/Fields/Base", "jquery", "underscore", "Core/Request"], function(View, Field, $, _, Request){
    return View.extend({
        events: {
            "submit": "__resolveSubmit",
            "{submitEvent} {submitButton}": "submit",
            "{resetEvent} {resetButton}": "reset"
        },

        /**
         * Override from base - View is ready
         * @private
         */
        __ready: function(){
            this.__initFields();
            this.$el.trigger("view:ready");
        },

        /**
         * Finding and Preparing fields before using
         * @returns {*}
         * @private
         */
        __initFields: function(){
            this.fields = _.filter(this.childrenViews || [], function(view){
                return !!((view instanceof Field) && view.options.name);
            }) || [];
            window.f = this;
            return this;
        },

        /**
         * Stop default submit for <form>
         * @param e
         * @private
         */
        __resolveSubmit: function(e){
            e.preventDefault();
            this.submit();
            return false;
        },

        /**
         * Serialize all fields
         * @returns {{}}
         */
        serialize: function(){
            var result = {};
            _.each(this.fields || [], function(field){
                _.extend(result, field.serialize());
            });
            return result;
        },

        /**
         * Verify all fields
         * @returns {*|boolean}
         */
        verify: function(){
            return _.all(this.fields || [], function(field){
                return field.verify();
            });
        },

        /**
         * Helper for sending data
         * @param data
         * @returns {*}
         * @private
         */
        __sendData: function(data){
            return (new Request({
                url: self.options.url || self.$el.attr("action"),
                type: self.$el.attr("method") || "POST",
                dataType: "json"
            })).submit(data);
        },

        onBeforeSubmit: function(){
            this.$el.trigger("loading:stop")
                    .trigger("loading:start");
        },

        /**
         *   Run when __sendData is done
         */
        onSuccessSubmit: function(){
            this.$el.trigger("form:submit:success");
        },

        /**
         * Run when __sendData is fail
         */
        onFailSubmit: function(){
            this.$el.trigger("form:submit:fail");
        },

        /**
         * Run after submit
         */
        onCompleteSubmit: function(){
            this.$el.trigger("loading:stop");
        },

        /**
         * Submit data to the server
         */
        submit: function(e){
            e.preventDefault();
            var self = this;
            if (this.verify() === true) {
                this.onBeforeSubmit();
                this.__sendData(this.serialize())
                    .always(self.onCompleteSubmit.bind(self))
                    .done(self.onSuccessSubmit.bind(self))
                    .fail(self.onFailSubmit.bind(self));
            } else {
                this.onVerificationError();
            }
        },

        /**
         * Run when verification is incorrect
         * @param verificationResult
         */
        onVerificationError: function(verificationResult){
            this.$el.trigger("form:error");
        },

        /**
         * Reset form
         */
        reset: function(e){
            e.preventDefault();
            _.each(this.fields || [], function(field){
                field.reset();
            });
        },

        /**
         * Get field by name
         * @param name
         * @returns {*}
         */
        getFieldByName: function(name){
            if (this.fields){
                return _.find(this.fields, function(field){
                    return !!(field.options.name === name);
                }) || null;
            }
            return null;
        },

        /**
         * Disable form fields
         */
        disable: function(){
            _.each(this.fields || [], function(field){
                field.disable();
            });
        },

        /**
         * Enable form fields
         */
        enable: function(){
            _.each(this.fields || [], function(field){
                field.enable();
            });
        }

    }, {
        defaults: $.extend(true, {}, View.defaults, {
            "url": "",
            "resetButton": ".reset-button",
            "resetEvent": "click",
            "submitButton": ".submit-button",
            "submitEvent": "click"
        })
    });
});