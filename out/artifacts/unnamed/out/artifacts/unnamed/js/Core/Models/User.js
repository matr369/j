/**
 * Created by Administrator on 23.07.2014.
 */
define(["Backbone","Models/Base","crypto","jquery", "Core/Request"], function(Backbone, Base, crypto, $, Request){
    var User = Backbone.Model.extend({
        defaults: {
            defaultPage: "login",
            avatar: "images/user-avatar.png",
            name: "Janne",
            canDo: []

        },
        /*
         function hashing user's password
         */
        __hashPass: function(password){
            return CryptoJS.SHA3(password,{ outputLength: 512 }).toString();
        },
        /**
         * function to check allowed actions user
         */
        can: function(whatCan){
            return false;
        },

        /**
         * function check data of user's on the server
         * @param login
         * @param password
         * @returns {*}
         */
        auth: function(login, password){
            var deferred = $.Deferred();
            (new Request({
                url: ""
            }))
            .send({
                login: login,
                password: this.__hashPass(password)
            })
            .done(function(result){
                require(["Model/"+result],function(Employer){
                    App.user = new Employer({

                    });
                })
                //this.response;
                // Подгружаем нужный класс для юзера и создаем его экземпляр в App.user = new U();
                //deferred.resolve();
            })
            .fail(function(result){
                //deferred.reject();
            });
            window.setTimeout(function(){
                if(false){
                }
                else{
                    deferred.reject();
                }
            }, 2000);
            return deferred;
        },
        changePassword: function(oldPassword, newPassword, confirmPassword){
            var deferred = $.Deferred();
            if(oldPassword === newPassword) {
                (new Request({
                    url: ""
                }))
                    .send({
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    })
                    .done(function(result){

                    })
                deferred.resolve();
                return deferred;
            }
            deferred.reject();
            return deferred;
        }

    });

    return User;
});