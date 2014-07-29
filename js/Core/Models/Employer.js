/**
 * Created by Administrator on 29.07.2014.
 */
define(["Models/Base"],function(Base){
    return Base.extend({
        defaults:{
            name: "",
            students: []
        }
    });
});