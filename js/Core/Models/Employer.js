/**
 * Created by Administrator on 29.07.2014.
 */
define(["Models/Base"],function(Base){
    return Base.extend({
        defaults: function(){
            return {
                name: "",
                students: [" sda"]
            };
        },

        addStudent: function(id){
            this.students[this.students.length] = id;
        }
    });
});