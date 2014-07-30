/**
 * Created by dmantsevich on 7/17/2014.
 */
define(["App", "Views/Base", "jquery", "Core/Templates"], function(App, View, $, Templates){

    var Config = App.Config.notification;

    var NotificationView = View.extend({
        events: {
            "mouseenter": "_stopHideTimeout",
            "mouseleave": "_startHideTimeout",
            "view:hide": "remove",
            "{hideEvent}": "hide",
            "view:show": "_startHideTimeout"
        },

        /**
         * Hide notification after {options.timeout} ms.
         * @private
         */
        _startHideTimeout: function(){
            this._stopHideTimeout();
            if (this.options.timeOut) {
                this._timer = setTimeout(this.hide.bind(this), this.options.timeOut);
            }
        },

        /**
         * Remove autohide
         * @private
         */
        _stopHideTimeout: function(){
            clearTimeout(this._timer);
        }

    },{
        defaults: $.extend(true, {}, View.defaults, {
            className: "",
            hideEvent: "click",
            message: "Hello! It's notification.",
            theme: "info",
            timeOut: 3000,
            container: "body",
            fx: {
                show: {
                    fx: "slideDown"
                },
                hide: {
                    fx: "slideUp"
                }
            },
            tpl: {
                $: "notification"
            }
        })
    });

    if (Config.showOnError) {
        App.on("error", function(e){
            (new NotificationView({
                className: "global-notification",
                theme: 'danger',
                message: e.message
            })).show();
        });
    }

    return NotificationView;
});