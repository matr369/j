/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Form", "App"], function(Form, App){
    return Form.extend({},{
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.login.html?v=1"
            },
            title: "Forgot password!",
            loginPlaceholder: "Login",
            formTitle: "Forgot",
            submitButtonText: "Send",
            submitButton: ".btn-signin",
            loginIcon: "glyphicon glyphicon-user",
            forgotLink: "#login",
            forgotPasswordText: "Sign in",
            showPassword: false
        })
    });
});