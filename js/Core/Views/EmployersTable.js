/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Base", "Models/Employer","Collections/Employers","underscore"],function(Base, Employer, Employers, _){
    return Base.extend({

       /* el: "body",
        events:{
        },

        constructor: function(){
          //this.option.collection = new Employers();
        },

        initialize: function(){
          //  _.bindAll(this,"render");
           // this.model.bind("change", this.render);
           // this.collection.bind("add", this.render)
        }

        *//*
         TODO realize function render
         *//*
       // render: function(){
        //    return this;
       // }*/
    },{
        defaults: $.extend(true, {}, Base.defaults, {
          tpl: {
              src: "employerstable.html?v=1"
          },
           employerName: "Name",
           employerStudents: "Students",
           employerNamePlaceholder: "Masha Masha",
           employerStudentsPlaceholder: "masha masha"
        })
    });
});

