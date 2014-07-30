/**
 * Created by Administrator on 30.07.2014.
 */
define(["Views/Base", "jquery"],function(Base, $){
    return Base.extend({},{
        defaults: $.extend(true, {}, Base.defaults,{
            tpl: "<tr><td>{%- data.model.cid %}</td><td>{%- data.model.get('name') %}</td><td>{%- data.model.get('email') %}</td></tr>"
        })
    });

});