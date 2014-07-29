/**
 * Created by dmantsevich on 7/17/2014.
 */
//TODO: Fix hide event!
define(["Views/Base", "jquery", "App"], function(View, $, App){

    var Config = App.Config.spooler;

    var Spooler = View.extend({

        events: {
			"{showEvent}": "show",
			"{hideEvent}": "hide",
            "view:remove": "stopListenContainerEvents",
            "{removeEvent}": "remove"
        },

        /**
         * Constructor
         */
		initialize: function(){
			View.prototype.initialize.apply(this, arguments);
			var container = $(this.options.container);
			(container.css("position") === "static") && (container.css("position", "relative"));
			(this.options.show) && (this.show());
            this.startListenContainerEvents();
		},

        /**
         * Bind container and view
         */
        startListenContainerEvents: function(){
            var options = this.options;
            $(options.container)
                .on(options.showEvent, $.proxy(this.show,this))
                .on(options.hideEvent, $.proxy(this.hide,this));
        },

        /**
         * Unbind container and view
         */
        stopListenContainerEvents: function(){
            var options = this.options;
            $(options.container)
                .off(options.showEvent, $.proxy(this.show, this))
                .off(options.hideEvent, $.proxy(this.hide, this));
        }
    },{
		defaults: $.extend(true, {}, View.defaults, {
			tpl: {
                $: "spooler"
            },
            text: "Loading...",
			size: "small", // large
			show: true,
			removeEvent: "view:hide",
			hideEvent: "spooler:hide",
			showEvent: "spooler:show"
		})
	});

    if (Config.autoShow) {
        $("body").on(Config.showEvent, function(e, options){
            options = options || {};
            if (e.target) {
                new Spooler({
                    container: e.target,
                    text: options.text,
                    hideEvent: Config.hideEvent
                });
            }
        });
    }

    return Spooler;
});