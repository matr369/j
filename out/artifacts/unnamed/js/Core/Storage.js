/**
 * Created by Mantsevich on 17.07.2014.
 */
define(["App", "underscore"], function(App, _){

    // Helper
    var isDisable = function(){
        return App.Config.disableStorage;
    };
    /**
     * Constructor
     * @param ns
     * @returns {*}
     * @constructor
     */
    var Storage = function(ns) {
        if (Storage._instances[ns]) {
            return Storage._instances[ns];
        }
        this.NS = ns;
        Storage._instances[ns] = this;
    };

    // Instances collection
    Storage._instances = {};

    /**
     * Prototype
     * @type {{get: get}}
     */
    Storage.prototype = {

        /**
         * Get full NS for localstorage key
         * @private
         */
        _getFullNS: function(key){
            return this.NS + "#" + key;
        },

        /**
         * Get item by key
         * @param key
         * @returns {*}
         */
        get: function(key){
            var result = null;
            if (!isDisable() && key) {
                try {
                    result = JSON.parse(localStorage.getItem(this._getFullNS(key)));
                } catch (e){}
            }
            return result;
        },

        /**
         * Set item by key
         * @param key
         * @param value
         * @returns {*}
         */
        set: function(key, value){
            if (!isDisable() && key) {
                try {
                    localStorage.setItem(this._getFullNS(key), JSON.stringify(value));
                } catch (e){}
            }
            return value;
        },

        /**
         * Remove item from storage
         * @param pattern
         * @returns {*}
         */
        remove: function(key){
            var result = this.get(key);
            if (!isDisable() && key) {
                try {
                    localStorage.removeItem(this._getFullNS(key));
                } catch (e) {}
            }
            return result;
        },

        /**
         * Get all items in a storage
         * @param pattern
         * @returns {*}
         */
        getAll: function(){
            if (isDisable()) {
                return null;
            }
            var itemKeys = _.keys(localStorage),
                result = null,
                self = this,
                pattern = new RegExp("^" + this.NS + "#(.+)");
            _.forEach(itemKeys, function(itemKey){
                var keyPattern = itemKey.match(pattern);
                if (keyPattern && keyPattern.length > 1) {
                    result || (result = {});
                    result[keyPattern[1]] = self.get(keyPattern[1]);
                }
            });
            return result;
        }
    };

    return Storage;
});