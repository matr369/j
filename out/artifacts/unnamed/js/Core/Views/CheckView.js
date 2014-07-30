define(["Views/Page"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "header.html?v=1"
            },

            title: "header",
            homeIcon:"fa fa-home home-icon"
        })
    });
});