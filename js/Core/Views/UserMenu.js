/**
 * Created by Mantsevich on 21.07.2014.
 */
define(["Views/Base", "bootstrap"], function(View, bootstrap){
    return View.extend({
    }, {
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "usermenu.html",
                $: "menu"
            },
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