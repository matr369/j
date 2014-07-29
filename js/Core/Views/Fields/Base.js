/**
 * Created by dmantsevich on 7/25/2014.
 */
define(["Views/Base", "jquery", "underscore", "Core/Validator", "bootstrap"], function(View, $, _, Validator, bootstrap){
    return View.extend({

        __ready: function(){
            var $el = this.$el;
            _.each(this.options.attrs || {}, function(val, key){
                $el.attr(key, val);
            });
            if (this.options.disable === true) {
                this.disable();
            } else {
                this.enable();
            }
            View.prototype.__ready.apply(this, arguments);
            return this;
        },

        serialize: function(){
            var result = {};
            result[this.options.name] = this.getValue();
            return result;
        },

        getValue: function(){
            return this.$el.val();
        },

        setValue: function(value){
            this.$el.val(value);
        },

        verify: function(){
            this.dropLastVerificationResult();
            var validationResult = Validator.check(this.getValue(), this.options.rules || null);
            this.setVerificationResult(validationResult);
            return (validationResult === true)? true : false;
        },

        dropLastVerificationResult: function(){
            this.$el.parent().removeClass("has-error has-success");
            this.$el.tooltip('destroy');
        },

        setVerificationResult: function(result){
            if (result !== true) {
                this.$el.parent().addClass("has-error");
                this.$el.tooltip({
                    title: result,
                    trigger: "focus",
                    placement: "bottom"
                }).focus();
            } else {
                this.$el.parent().addClass("has-success");
            }
        },

        disable: function(){
            this.disabled = true;
            this.dropLastVerificationResult();
            this.$el
                .attr("disabled", "disabled")
                .addClass(this.options.disableClass);
        },

        enable: function(){
            this.disabled = false;
            this.dropLastVerificationResult();
            this.$el
                .removeAttr("disabled")
                .removeClass(this.options.disableClass);
        },

        reset: function(){
            this.setValue(this.options.value);
        }
    },{
        defaults: $.extend(true, {}, View.defaults, {
            disableClass: "field-disabled",
            disable: false,
            name: "",
            value: null,
            attrs: {},
            type: "hidden",
            title: "",
            rules: null,
            tpl: {
                src: "fields.html?v=1",
                $: "field"
            }
        })
    });
});