/**
 * Created by Administrator on 29.07.2014.
 */
define(["Views/Base", "Collections/Employers", "Models/Employer", "underscore", "jquery", "Views/EmployerRow"], function(Base, Employers, Employer, _, $, EmployerRow){
    return Base.extend({
        constructor: function(){
            Base.prototype.constructor.apply(this, arguments);
            this.collection = new Employers();
            _.bindAll(this,'render');
            this.collection.bind('add',this.render);
        },
        render: function(){
            this.showEmployer(new Employer({name: "dfsdf", email: "fdfdfsd"}));
            //_.each(this.collection,this.showEmployer())
        },
        showEmployer: function(model){

            var row = new EmployerRow({
                container: this.$el,
                containerResolveMethod: "append"
            });
           row.show();
            debugger;
        }

    },{
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: null
        })
    });
});