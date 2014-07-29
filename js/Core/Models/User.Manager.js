/**
 * Created by Administrator on 23.07.2014.
 */
define(["Models/User"], function(User){
    return User.extend({
        defaults: {
            defaultPage: "students"
        },
        /**
         * function to check allowed actions user
         */
        can: function(whatCan){
            var i;
            for(i = 0; i < this.canDo.length; i++){
                if(whatCan == this.canDo[i]){
                    return true;
                }
            }
            return false;
        }

    });
});