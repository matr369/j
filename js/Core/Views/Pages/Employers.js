/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Page"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/employers.html?v=1"
            },

            title: "Page employers",
            textAddEmployer: "Add Employer"
        })
    });
});