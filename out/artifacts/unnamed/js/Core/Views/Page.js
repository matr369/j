/**
 * Created by Mantsevich on 21.07.2014.
 */
define(["App", "Views/Base", "jquery"], function(App, View, $){
    var Config = App.Config.pages,

        // In this div we will insert all pages
        pageWrapper = $("<div/>", {
            "class": Config.classForPageWrapper
        }),

        // Manage all pages
        PagesManager = {
            __current: null,
            show: function(page){
                if (this.__current !== page) {
                    this.__current && (this.__current.remove());
                    pageWrapper.append(page.$el);
                    page.__showComplete();
                    this.__current = page;
                    $("title").text(Config.titlePrefix + page.options.title + Config.titleSuffix);
                }
            }
        },

        /**
         * Default page constructor
         * @type {*|void}
         */
        PageView = View.extend({

            constructor: function(){
                if (this.constructor._instance) {
                    return this.constructor._instance;
                } else {
                    View.prototype.constructor.apply(this, arguments);
                    this.constructor._instance = this;
                }
            },

            /**
             * Override base behavior
             */
            show: function(){
                var self = this;
                this.render().done(function(){
                    PagesManager.show(self);
                });
            },

            /**
             * Override base remove behavior
             */
            remove: function(){
                delete this.constructor._instance;
                View.prototype.remove.apply(this, arguments);
                return this;
            }

        }, {
            defaults: $.extend(true, {}, View.defaults, {
                title: ""
            })
        });

    $(Config.containerForWrapper).append(pageWrapper); // Add page wrapper to the container

    return PageView;
});