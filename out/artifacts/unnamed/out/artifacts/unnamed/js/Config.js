/**
 * Created by Mantsevich on 17.07.2014.
 */
define({
    validateBrowserFeatures: function(){
        return !!(window.localStorage && window.JSON && Function.prototype.bind);
    },
    invalidBrowserClass: "update-your-browser",
    readyClass: "app-ready",
    disableStorage: true,
    request: {
    },
    pages: {
        titlePrefix: "Exadel Students - ",
        titleSuffix: "",
        containerForWrapper: "body",
        classForPageWrapper: "page-container"
    },
    spooler: {
        autoShow: true,
        showEvent: "loading:start",
        hideEvent: "loading:stop"
    },
    templates: {
        settings: {
            interpolate: /\{%=(.+?)%\}/g,
            evaluate: /\{%(.+?)%\}/g,
            escape: /\{%-(.+?)%\}/g
        },
        exportName: "data",
        clearCache: true,
        core: "core.html?v=4",
        folder: "templates/",
        urlFormat: /(.+)\?v=(\d+)/
    },
    notification: {
        showOnError: true
    },
    routers: {
        list: [
            "Routes/Core"/*,
            "Routes/StudentProfile",
            "Routes/MemberLists",
            "Routes/Settings"*/
        ]
    },
    preloadModules: [
        "Views/Notification",
        "Views/Spooler"
    ]
});