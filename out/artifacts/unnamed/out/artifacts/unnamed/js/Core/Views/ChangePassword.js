define(["Views/Base", "bootstrap"], function(View, bootstrap){
    return View.extend({

        events: {

        }


    }, {
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "change.password.html?v=1"

            },

            theme: "danger"
        })
    });
});