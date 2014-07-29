/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Base","Collections/Employers","underscore", "Views/FilterEmployerForm"],function(Base, Employers, _, FilterEmployerForm ){
    return Base.extend({
    /*    constructor: function(){
          //   debugger;
            Base.prototype.constructor.apply(this, arguments);
           // this.collection = new Employers();
       },*/
        __ready: function(){
            var filterEmployer = new FilterEmployerForm({
            container: this.$(".filter-container"),
            containerResolveMethod: "replaceWith"});
            filterEmployer.render();
        }
  /*      __renderChildrenViews: function(){
             Base.prototype.__renderChildrenViews.apply(this, arguments);
        }*/

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

