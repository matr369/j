/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Base","Collections/Employers","underscore", "Views/FilterEmployerForm", "Views/ListEmployers"],function(Base, Employers, _, FilterEmployerForm, ListEmployers ){
    return Base.extend({
        events: {
            "view:ready": "initSubViews"
        },
        constructor: function(){
            Base.prototype.constructor.apply(this, arguments);
       },
        initSubViews: function(){
            var filterEmployer = new FilterEmployerForm({
                el: this.$(".filter-container")
            });
            filterEmployer.render();
            this.registerChildView("filter", filterEmployer);
            var listEmployers = new ListEmployers({
                el: this.$("tbody")
            });
        }
  /*      __renderChildrenViews: function(){
             Base.prototype.__renderChildrenViews.apply(this, arguments);
        }*/

    },{
        defaults: $.extend(true, {}, Base.defaults, {
          tpl: {
              src: "employerstable.html?v=1",
              $ : "container"
          },

           employerName: "Name",
           employerStudents: "Students",
           employerNamePlaceholder: "Masha Masha",
           employerStudentsPlaceholder: "masha masha"
        })
    });
});

