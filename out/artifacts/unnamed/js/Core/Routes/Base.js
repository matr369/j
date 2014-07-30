/**
 * Created by Mantsevich on 17.07.2014.
 */
define(["Backbone", "jquery", "underscore"], function(Backbone, $, _){

    var RoutesManager = {
        list: {},
        registerRoute: function(router){
            var self = this;
            _.each(router.routes, function(callback, route){
                self.list[route] = {
                    route: Backbone.Router.prototype._routeToRegExp(route)/*,
                    router: self*/
                };
            });
        },
        routeExists: function(fragment){
            return _.any(this.list, function(handler) {
                return !!(handler.route.test(fragment));
            });
        }
    };

    return Backbone.Router.extend({

        /**
         * Add router to manager
         */
        constructor: function(){
            RoutesManager.registerRoute(this);
            Backbone.Router.prototype.constructor.apply(this, arguments);
        },

        /**
         * Check exists route or not
         */
        routeExists: RoutesManager.routeExists,

        /**
         * Override if you need
         * @returns {resolve}
         */
        initComponents: function(){
            return $.Deferred().resolve();
        },

        /**
         * Override navigate
         */
        navigate: function(path, options){
            options = options || {trigger: true};
            Backbone.Router.prototype.navigate.call(this, path, options);
            return this;
        }
    });
});