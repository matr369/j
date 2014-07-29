define(["Views/Form", "App", "Collections/Skills"], function(Form, App, Skills){
    return Form.extend({

        constructor: function(options){
            options.collection = new Skills();
            Form.prototype.constructor.apply(this, [options]);
        },



        __sendData:function(skill){
            return $.Deferred().resolve(skill);
        },

        onSuccessSubmit: function(skill){
           //if(this.collection.where({name:skill.}).length==0)
            alert(this.collection.where({name:"1"}).length);
           this.collection.add(skill);
            alert(this.collection.slice());
            alert(this.collection.length);
        }


    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.newskill.html?v=1"
            },
            formTitle :"new skill"


        })
    });
});