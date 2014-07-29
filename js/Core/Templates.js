/**
 * Created by Mantsevich on 17.07.2014.
 */
define(["jquery", "underscore", "App", "Core/Storage", "libs/doT"], function($, _, App, Storage, doT){

    var Config = App.Config.templates, // Settings
        defaults = {
            compile: true,
            selector: ""
        },
        TemplateStorage = new Storage("TPL"); // Local Storage for templates

    // Clear old cache
    if (Config.clearCache) {
        var allItems = TemplateStorage.getAll(), // Get all items from storage
            latestTemplates = {}; // Actual versions here
        _.each(allItems, function(value, id){
            var matches = id.match(Config.urlFormat); // Format: tplid?v=VERSION&othersParams
            if (matches) {
                var path = matches[1] || "",
                    version = parseInt(matches[2] || 1, 10),
                    lastTemplate = latestTemplates[path] || {version: 0, id: ""};
                if (lastTemplate.version < version) { // Compare version
                    TemplateStorage.remove(lastTemplate.id);
                    latestTemplates[path] = {
                        id: id,
                        version: version
                    };
                }
            }
        });
        // We don't need it more
        allItems = null;
        latestTemplates = null;
    }

    (Config.settings) && (_.extend(doT.templateSettings, Config.settings));
    doT.templateSettings.varname = Config.exportName;

    return {

        /**
         * Get sub template by selector
         * @param tpl
         * @param selector
         * @returns {*|jQuery}
         */
        findBySelector: function(tpl, selector){
            return $("<section>" + tpl + "</section>").find(selector).html();
        },

        /**
         * Compile template to function
         * @param tpl
         * @returns {Function|string}
         */
        compile: function(tpl){
            return doT.template(tpl);
        },

        /**
         * Resolve xhr
         * @param xhr
         * @param tpl
         * @param params
         * @private
         */
        __resolveXHR: function(xhr, tpl, params){
            try {
                (params.selector) && (tpl = this.findBySelector(tpl, params.selector));
                (params.compile) && (tpl = this.compile(tpl));
                xhr.resolve(tpl);
            } catch (e){
                this.__rejectXHR(xhr, e, params);
            }
        },

        /**
         * Reject xhr
         * @param id
         * @param options
         * @returns {*}
         */
        __rejectXHR: function(xhr, e, params){
            e.message = "Template Error: " + e.message;
            App.Error(e);
            xhr.reject(e);
        },

        /**
         * Load template from a server. Return deferred object. You can use: Template.get('path/to/html?v=1').done(function(template){ ...your code... });
         * @param id
         * @param options
         * @returns {*}
         */
        get: function(id, options){ // id format: path/to/tpl?v=VERSION
            var self = this,
                xhr = $.Deferred(),
                cache,
                params = _.defaults(options || {}, defaults);
            cache = TemplateStorage.get(id);
            if (cache !== null) {
                this.__resolveXHR(xhr, cache, params);
            } else {
                require(["Core/Request"], function(Request){
                    (new Request({
                        url: Config.folder + id,
                        type: "GET",
                        dataType: "text"
                    })).send().then(function(result){
                        TemplateStorage.set(id, result);
                        self.__resolveXHR(xhr, result, params);
                    }, function(jxhr, status, error){
                        self.__rejectXHR(xhr, new Error(jxhr.statusText), params);
                    });
                });
            }
            return xhr;
        }
    }


});