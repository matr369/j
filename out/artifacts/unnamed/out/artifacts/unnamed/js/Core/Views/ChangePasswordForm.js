define(["Views/Page"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "form.changepassword.html?v=1"
            },

            title: "header",
            passwordField:"col-md-4 control-label",
            oldPassword: "Old Password",
            newPassword: "New Password",
            confirmField: "Confirm Password",
            confirmButton: "Confirm"
        })
    });
});