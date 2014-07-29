/**
 * Created by dmantsevich on 7/21/2014.
 */
define(["Routes/Base", "App"], function(Router, App){
    return  Router.extend({
        routes: {
            "": "redirectToDefaultPage",
            "login": "showLoginPage",
            "forgot": "showForgotPage",
            "404": "show404",
            "logout": "logout",
            "_dev_": "checkIfItWorks",
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
         * Login page
         */
        "showLoginPage": function(){
            require(["Views/Pages/Login"], function(Page){
                (new Page()).show();
            });
        },


        /*
         _dev_ page
         */
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
         * Logout page
         */
        "logout": function(){
            (App.user) && (App.user.logout());
            this.navigate("login");
        },


        /*
         show forgot page
         */
        "showForgotPage": function(){
            require(["Views/Pages/Forgot"], function(Page){
                (new Page()).show();
            });
        }

    });
});