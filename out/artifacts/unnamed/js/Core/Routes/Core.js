/**
 * Created by dmantsevich on 7/21/2014.
 */
define(["Routes/Base", "App"], function(Router, App){
    return  Router.extend({
        routes: {
            "": "redirectToDefaultPage",
            "managers":"showManagersPage",
            "settings":"showSettingsPage",
            "setting/field":"showNewFieldPage",
            "setting/skill":"showNewSkillPage",
            "login": "showLoginPage",
            "404": "show404",
            "logout": "logout",
            "_dev_":"checkIfItWorks",
            "*path": "checkPageIsExists"
        },

        /**
         * Default router. Check page is exists or not(redirect to 404)
         * @param path
         */
        "checkPageIsExists": function(path){
            if (!this.routeExists(path)) {
                this.navigate("404");
            } else {
                this.navigate(path);
            }
        },

        /**
         * 404 Page
         */
        "show404": function(){
            require(["Views/Pages/404"], function(Page){
                (new Page()).show();
            });
        },



        /**
         * New field
         */
        "showNewFieldPage": function(){
            require(["Views/Pages/SettingsField"], function(Page){
                (new Page()).show();
            });
        },



        /**
         * New skill
         */
        "showNewSkillPage": function(){
            require(["Views/Pages/SettingsSkill"], function(Page){
                (new Page()).show();
            });
        },


        /**
         * Managers Page
         */
        "showManagersPage": function(){
            require(["Views/Pages/Managers"], function(Page){
                (new Page()).show();
            });
        },

        /**
         * Login page
         */
        "showLoginPage": function(){
            require(["Views/Pages/Login"], function(Page){
                (new Page()).show();
            });
        },


        "checkIfItWorks": function(){
            require(["Views/CheckView"], function(Page){
                (new Page()).show();
            });
        },

        /**
         * If hash is empty try to correct navigate
         */
        "redirectToDefaultPage": function(){
            this.navigate(App.user.get("defaultPage"));
        },




        /**
         * Settings Page
         */
        "showSettingsPage": function(){
            require(["Views/Pages/Settings", "Models/Settings"], function(Page, Settings){
                (new Page({
                    model: new Settings()
                })).show();
            });
        },


        /**
         * Logout page
         */

        "logout": function(){
            (App.user) && (App.user.logout());
            this.navigate("login");
        }




    });
});