define(["Views/Page", "jquery"], function(Page, $){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/settings.html?v=1"
            },

            title: "Settings"
        })
    });
});