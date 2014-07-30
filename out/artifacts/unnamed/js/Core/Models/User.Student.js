/**
 * Created by Administrator on 24.07.2014.
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
            /*switch(whatCan){
             case "view_settings": result = true; break;
             default : result = false; break;
             }*/
            for(i = 0; i < this.canDo.length; i++){
                if(whatCan == canDo[i]){
                    return true;
                }
            }
            return false;
        }

    });
});