/**
 * Created by Mantsevich on 27.07.2014.
 */
define(["Models/Base"], function(Model){
    return Model.extend({

        /**
         * Singleton
         * @returns {*|PageView.constructor._instance}
         */
        constructor: function(){
            if (this.constructor._instance) {
                return this.constructor._instance;
            } else {
                Model.prototype.constructor.apply(this, arguments);
                this.constructor._instance = this;
            }
        }
    });
});