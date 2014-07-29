define(["Views/Base"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "form.addradiofield.html?v=1"
            },

            title: "header"

        })
    });
});