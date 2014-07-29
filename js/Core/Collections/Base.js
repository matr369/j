/**
 * Created by dmantsevich on 7/18/2014.
 */
define(["Backbone", "jquery"], function(Backbone, $){
    return Backbone.Collection.extend({
        fetch: function(){
            return $.Deferred().resolve([]);
        }
    });
});