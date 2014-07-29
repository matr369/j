define(["Collections/Skills", "Views/Base", "App", "jquery"], function (Skills, Base, App, $){
    return Base.extend({

        constructor: function(options){
            options.collection = new Skills();

            this.listenTo(options.collection, "add", this.addline);


            Base.prototype.constructor.apply(this, [options]);
        },


        addline:function(skill){
            this.$el.append("<li>"+skill.get("name")+"</li>");
        }



    }, {
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: {
                src: "form.skillstable.html?v=1"
            },
            formTitle :"skill table"

        })
    });


});