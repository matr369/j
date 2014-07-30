/**
 * Created by Mantsevich on 21.07.2014.
 */
define(["Views/Base", "bootstrap"], function(View, bootstrap){
    return View.extend({

        events: {
            "view:render": "initBootstrapElements",
            "{menuEvent} {changePassword}": "openChangePasswordPopup"
        },

        /*
        The idea, is that this will make the cross work as a cross (close)
         */
        initBootstrapElements:function()
        {
            this.childrenViews.changePasswordPopup.$el.modal();
        },

        /*
        Makes the ChangePasswordPopup popup
         */
        openChangePasswordPopup: function(){
           this.childrenViews.changePasswordPopup.show();
        }
    }, {
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "usermenu.html",
                $: "menu"
            },
            menuEvent: "click",
            changePassword: ".change-password-link",
            iconChangePassword: "fa fa-repeat",
            textChangePassword: "Change Password",
            iconSettings: "glyphicon glyphicon-wrench",
            textSettings: "Settings",
            iconLogout: "glyphicon glyphicon-off",
            textLogout: "Logout",
            iconCross: "fa fa-times"
        })
    });
});