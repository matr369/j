/**
 * Created by Administrator on 29.07.2014.
 */
define(["Views/Form"], function(Form){
    return Form.extend({
    },{
        defaults: $.extend(true, {}, Form.defaults, {
            tpl:{
                src: "form.filteremployer.html?v=1"
            }
        })
    });
});