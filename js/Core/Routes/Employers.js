/**
 * Created by Administrator on 28.07.2014.
 */
define(["Routes/Base", "App"], function(Router, App){
    return Router.extend({
        routes: {
            "employers":"showEmployersList"
        },
        showEmployersList: function(){
            require(["Views/Pages/Employers"], function(Page){
                (new Page()).show();
            });
        }
    });
});