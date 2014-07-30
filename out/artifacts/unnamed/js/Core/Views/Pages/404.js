/**
 * Created by Mantsevich on 21.07.2014.
 */
define(["Views/Page"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/404.html?v=1"
            },

            title: "404 Page Not Found"
        })
    });
});