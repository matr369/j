/**
 * Created by Administrator on 22.07.2014.
 */
define(["Views/Base", "Models/User", "App"], function(View, User, App){
   return View.extend({
       events:{
           "{submitEvent} {submitButton}": "submitForm"
       },
        /*
         function handles user's authentication
         */
       submitForm: function(){
           var self = this,
               login = this.$(".field-login").val(),
               password = this.$(".field-password").val();
           this.$el.trigger("loading:start");

           App.user.auth(login, password)
               .always(function() {
                   self.$el.trigger("loading:stop");
               })
               .done(function(){
                   //App.user.defaultPage
                   //this.redirectToDefaultPage();
                })
               .fail(function(){
                   App.Error("Invalid login or password.");
               });

           }
   }, {
       defaults: $.extend(true, {}, View.defaults, {
           tpl: {
               src: "form.login.html?v=1"
           },
           formTitle: "Sing in",
           submitEvent: "click",
           submitButtonText: "Sign in",
           submitButton: ".btn-signin",
           loginIcon: "glyphicon glyphicon-user",
           loginPlaceholder: "Login",
           passwordIcon: "glyphicon glyphicon-lock",
           passwordPlaceholder: "Password",
           forgotPasswordText: "Forgot password?"
       })
   });
});