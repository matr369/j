/**
 * Created by Administrator on 22.07.2014.
 */
define(["Views/Form", "App"], function(Form, App){
   return Form.extend({
        /*
         function handles user's authentication
         */
       __sendData: function(fields){
           return App.user.auth(fields.login, fields.password);
       },
       onSuccessSubmit: function(){
           Form.prototype.onSuccessSubmit.apply(this, arguments);
           App.redirectTo(App.user.get('defaultPage'));
       },
       onFailSubmit: function(e){
           Form.prototype.onFailSubmit.apply(this, arguments);
           App.Error("Invalid login or password.");
       }
   }, {
       defaults: $.extend(true, {}, Form.defaults, {
           tpl: {
               src: "form.login.html?v=1"
           },
           formTitle: "Sing in",
           submitButtonText: "Sign in",
           submitButton: ".btn-signin",
           loginIcon: "glyphicon glyphicon-user",
           loginPlaceholder: "Login",
           passwordIcon: "glyphicon glyphicon-lock",
           passwordPlaceholder: "Password",
           forgotPasswordText: "Forgot password?",
           forgotLink: "#forgot",
           showPassword: true
       })
   });
});