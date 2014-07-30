define(["Views/Form", "App", "jquery"], function(Form, App, $){
    return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "view:parent:hide": "reset"
        }),
        __sendData: function(data){
            return App.user.changePassword(data.oldPassword, data.newPassword);
        },

        verify: function(){
            var verificationResult = Form.prototype.verify.apply(this, arguments);
            if (verificationResult === true && this.getFieldByName('newPassword').getValue() !== this.getFieldByName('confirmPassword').getValue()) {
                verificationResult = false;
                App.Error(this.options.newPassword + " and " + this.options.confirmField + " must be equal.");
            }
            return verificationResult;
        }

    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.changepassword.html?v=2"
            },
            submitButton: ".button-change-password",
            submitButtonText: "Change password",
            oldPassword: "Old Password",
            newPassword: "New Password",
            confirmField: "Confirm Password"
        })
    });
});
