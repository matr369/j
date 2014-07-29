define(["Views/Base"], function(View){
    return View.extend({},{
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "page.description.html?v=1"
            },
            descriptionStyle:"page-written-info blue-bg p",
            pageTitle:"X-Students",
            pageDescription:""
        })
    });
});