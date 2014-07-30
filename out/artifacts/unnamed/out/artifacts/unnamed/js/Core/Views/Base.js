/**
 * Created by dmantsevich on 7/17/2014.
 */
define(["Backbone", "underscore", "jquery", "App", "Core/Templates"], function(Backbone, _, $, App, Templates){

    return Backbone.View.extend({

        /**
         * Constructor for View
         * @param options
         * @returns {*}
         */
        initialize: function(options) {
            this.options = $.extend(true, {}, this.constructor.defaults, options || {}); // Options
            this.isRendered = !!this.options.el; // Helper. Indicate views rendered or not
            this.childrenViews = {}; // List with children views
            return this;
        },

        /**
         * Hide view
         */
        hide: function(){
            var self = this,
                el = this.$el,
                options = this.options.fx.hide;
            this.__stopRender();
            el.stop()[options.fx](options.duration, function(){
                el.trigger("view:hide", self); // You can subscribe on event view:hide
            });
        },

        /**
         * Show view
         */
        show: function(){
            var self = this;
            this.render().done(function(){
                var el = self.$el,
                    options = self.options.fx.show;
                el.stop()[options.fx](options.duration, function(){
                    el.trigger("view:show", self); // You can subscribe on event view:show
                });
            });

        },

        /**
         * Inner method for resolving render view
         * @param xhr
         * @param template
         * @returns {*}
         * @private
         */
        __resolveRender: function(xhr, template){
            var self = this,
                viewMarkup = $(template(this.options)).addClass(this.options.className);
            if (!this.__isRenderStopped()) {
                // Try to find children views and render it
                this.__renderChildrenViews(viewMarkup).done(function(){
                    if (!self.__isRenderStopped()) {
                        self.setElement(viewMarkup); // Update element
                        self.isRendered = true;
                        self.$el.trigger("view:ready");
                        if (self.options.container &&
                            self.options.containerResolveMethod) { // If container exists append element to it
                            $(self.options.container)[self.options.containerResolveMethod](self.$el);
                        }
                        xhr.resolveWith(this, []);
                    }
                }).fail(function(){
                    self.__rejectRender(xhr);
                });
            }
            return this;
        },

        /**
         * Reject Render
         * @param html
         * @returns {*}
         * @private
         */
        __rejectRender: function(xhr){
            if (!this.__isRenderStopped()) {
                xhr.rejectWith(this, []);
            }
        },

        /**
         * Find and render children views.
         * example:
         *      <view data-id='loader' data-constructor='Views/Spooler' data-options='{"hideEvent": "mouseenter"}' />
         * @param html
         * @returns {*}
         * @private
         */
        __renderChildrenViews: function(html){
            var self = this,
                views = [];
            // Find all view tags
            $(html).find("view").each(function(){
                // Get info from tag
                var $view = $(this),
                    control = $view.attr("data-constructor"),
                    options = $view.attr("data-options") || "",
                    id = $view.attr("data-id") || "",
                    xhr = $.Deferred();
                views.push(xhr);
                // Parse options
                try {
                    options = JSON.parse(options) || {};
                } catch (e) {
                    options = {};
                }
                if (control) {
                    // Load constructor
                    require([control], function(View){
                        options.container = $view;
                        options.containerResolveMethod = "replaceWith";
                        var childrenView = new View(options); // Create instance
                        self.registerChildView(id, childrenView);
                        childrenView.render().then(xhr.resolve, xhr.reject);
                    }, xhr.reject);
                } else {
                    xhr.resolve();
                }
            });
            return $.when.apply($, views);
        },

        /**
         * Register child view
         * @returns {*}
         */
        registerChildView: function(id, view) {
            (id) && (this.childrenViews[id] = view);
            return this;
        },

        /**
         * Helper fot stoping render
         * @private
         */
        __stopRender: function(){
            this.__renderStopped = true;
        },

        /**
         * Check stop render or not
         * @returns {boolean|*}
         * @private
         */
        __isRenderStopped: function(){
            return this.__renderStopped;
        },

        /**
         * Render our view to the page
         * @returns {*}
         */
        render: function(){
            var self = this,
                xhr = $.Deferred(),
                tpl = this.options.tpl;
            if (!this.isRendered) {
                this.__renderStopped = false;
                if (_.isObject(tpl)) { // Tpl is object
                    Templates.get(tpl.src, { //load template from src
                        selector: tpl.$  //find by $
                    }).done(function(template){
                        self.__resolveRender(xhr, template); // Success
                    }).fail(function(){
                        self.__rejectRender(xhr); // Fail
                    });
                } else if (_.isString(tpl)) {
                    // If tpl is string - parse it.
                    try {
                        var template = Templates.compile(tpl);
                        this.__resolveRender(xhr, template);
                    } catch (e) {
                        self.__rejectRender(xhr);
                    }
                } else {
                    // Other.
                    this.__resolveRender(xhr, tpl);
                }
            } else {
                xhr.resolveWith(this, []);
            }
            return xhr;
        },

        /**
         * Overrider base. You can set eventName and selectorFrom options. Examples: '{showEvent} li', 'click {mainContainer}' and others.
         * @param delegateEvents
         * @returns {*}
         */
        delegateEvents: function(delegateEvents){
            var events = {}, // New event list
                options = this.options;
            delegateEvents = delegateEvents || this.events;
            this.undelegateEvents(); // detach old events
            for (var event in delegateEvents) {
                var newEventName = event.replace(/{(.+?)}/g, function(replacement, optionName){
                    if (_.isString(options[optionName])) {
                        return options[optionName];
                    }
                });
                (newEventName.trim()) && (events[newEventName] = delegateEvents[event]);
            }
            Backbone.View.prototype.delegateEvents.call(this, events);
            return this;
        },

        /**
         * Override remove
         * @returns {*}
         */
        remove: function(){
            var self = this;
            this.__stopRender();
            // Remove child views
            _.each(this.childrenViews, function(view, key){
                view.remove();
                delete self.childrenViews[key];
            });
            this.$el.trigger("view:remove", this); // Fire remove event for element
            Backbone.View.prototype.remove.call(this); // Run default behavior for Backbone.View
            return this;
        }

    }, {

        /**
         * Default setting for View. For merging use: $.extend(true, {}, View.defaults, YOUR_DEFAULTS_SETTINGS);
         */
        defaults: {
            // Use it on your tpl
            className: "",

            // Settings for show/hide animation
            fx: {
                show: {
                    fx: "fadeIn",
                    duration: 500
                },
                hide: {
                    fx: "fadeOut",
                    duration: 500
                }
            },

            //Work with container
            container: null,
            containerResolveMethod: "append",

            // If tpl is object - load src and select by $. If tpl is string - parse as tpl
            tpl: {
                src: App.Config.templates.core,
                $: null
            }
        }
    });
});