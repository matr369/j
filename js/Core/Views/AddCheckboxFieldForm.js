define(["Views/Base"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "form.addcheckboxfield.html?v=1"
            },

            title: "header"

        })
    });
});