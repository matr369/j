/**
 * Created by Mantsevich on 16.07.2014.
 */
define(["underscore", "Backbone", "jquery", "Config"],function(_, Backbone, $, Config){
    var Application = {
        Config: Config
    };
    // Add Events API
    _.extend(Application, Backbone.Events);


    // Our init script
    Application.start = _.once(function(){
        require(_.union(["Models/User","Collections/Employers"], Config.preloadModules), function(User, Employers){
            Application.user = new User();
            //Load Routes
            require(Config.routers.list, function(){
                var routes = [];
                _.each([].slice.call(arguments), function(Router){
                    var router = new Router();
                    routes.push(router.initComponents());
                });
                $.when.apply($, routes).done(function(){
                Backbone.history.start();
                window.App = Application;
                Application.trigger("start");
                });
            });
        });
    });

    Application.redirectTo = function(page){
        require(["Routes/Base"], function(Base){
            Base.prototype.navigate(page);
        });
    };

    // Error dispatcher
    Application.Error = function(error){
        (_.isString(error)) && (error = new Error(error));
        //Application.trigger("error", error); // You can subscribe on error event.
    };

    //window.onerror = Application.Error;

    // Authors
    Application.authors = [
        {
            name: "",
            email: ""
        }, {
            name: "",
            email: ""
        }
    ];

    return Application;
});