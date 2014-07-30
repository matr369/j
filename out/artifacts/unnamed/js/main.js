/**
 * Created by Mantsevich on 16.07.2014.
 */
/**
 * Config for Require
 */
require.config({
    baseUrl: "js",
    paths: {
        "underscore": "libs/lodash-2.4.1",
        "Backbone": "libs/backbone",
        "jquery": "libs/jquery-2.1.1",
        "bootstrap": "libs/bootstrap.min",
        "crypto": "libs/sha3",
        "Models": "Core/Models",
        "Collections": "Core/Collections",
        "Views": "Core/Views",
        "Routes": "Core/Routes"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },
    waitSeconds: 5
});

require(["Config", "underscore"], function(Config, _){
    if (Config.validateBrowserFeatures() === true) {

        // Start Application
        require(["App"], function(App){
            // Start our app
            App.on("start", function(){
                document.body.className += Config.readyClass;
            });
            App.start();
        });

    } else {
        document.body.className += Config.invalidBrowserClass;
    }
});