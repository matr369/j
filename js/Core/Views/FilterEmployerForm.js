/**
 * Created by Administrator on 29.07.2014.
 */
define(["Views/Base"], function(Base){
    return Base.extend({},{
        defaults: $.extend(true, {}, Base.defaults, {
            tpl:{
                src: "form.filteremployer.html?v=1"
            }
        })
    });
});