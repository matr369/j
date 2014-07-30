/**
 * Created by dmantsevich on 7/25/2014.
 */
define(["Views/Base", "jquery", "bootstrap"], function(View, $, bootstrap){
    return View.extend({
        events: {
            "shown.bs.modal": "__showComplete",
            "hidden.bs.modal": "__hideComplete",
            "view:ready": "__initBootstrapElements",
            "{showEvent}": "show",
            "{hideEvent}": "hide"
        },

        /**
         * Init botstrap modal component
         */
        __initBootstrapElements: function(){
            this.$el.modal({
                show: this.options.show,
                backdrop: "static"
            });
        },

        /**
         * Override show
         */
        show: function(){
            var self = this;
            this.render().done(function(){
                self.$el.modal("show");
            });
        },

        /**
         * Override hide
         */
        hide: function(){
            this.__stopRender();
            this.$el.modal("hide");
        }

    }, {
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "overlay.html?v=1"
            },
            show: false,
            title: "Dialog"
        })
    });
});