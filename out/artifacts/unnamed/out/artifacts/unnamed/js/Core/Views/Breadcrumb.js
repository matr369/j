define(["Views/Base"], function(Page){
    return Page.extend({
        set:function(path)
        {
            this.options.breadcrumbs=path;
            this.rerender();
        }
    },{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "breadcrumb.html?v=1"
            },
            breadcrumbs:["a", "b", "c"],
            homeIcon:"fa fa-home home-icon"
        })
    });
});