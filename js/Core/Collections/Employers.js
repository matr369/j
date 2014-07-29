/**
 * Created by Administrator on 28.07.2014.
 */
define(["Collections/Base", "Models/User.Employer"], function(Base, Employer){
   return Base.extend({
       model: Employer,
       constructor: function(){
           this.getEmployers();
       },
       /*
       function get employers from server
        */
       getEmployers: function(){

       }
   });
});