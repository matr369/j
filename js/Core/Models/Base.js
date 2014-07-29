/**
 * Created by Mantsevich on 17.07.2014.
 */
define(["Backbone", "jquery"], function(Backbone, $){
    return Backbone.Model.extend({

        /**
         * Fetch data from server
         * @returns {*}
         */
        fetch: function(){
            //TODO: Realize
            return $.Deferred().resolve();
        }
    });
});