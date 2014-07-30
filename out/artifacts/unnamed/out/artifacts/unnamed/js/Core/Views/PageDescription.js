define(["Views/Page"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "page.description.html?v=1"
            },

            title: "header",

            descriptionStyle:"page-written-info blue-bg p",
            pageTitle:"Interview",
            pageDescription:"Add interview"

        })
    });
});