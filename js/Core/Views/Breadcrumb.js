define(["Views/Base"], function(View){
    return View.extend({},{
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "breadcrumb.html?v=1"
            },
            path: [],
            title: "header",
            homeIcon:"fa fa-home home-icon",
            homeTitle: "X-Students"
        })
    });
});