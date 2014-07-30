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
                //TODO: Дописать, когда будет инфа о сервисах
                url: ""
            }))
            .send({
                login: login,
                password: this.__hashPass(password)
            })
            .done(function(result){
                //TODO: Дописать, когда будет инфа о сервисах
                require(["Models/User." + result],function(Employer){
                    // Подгружаем нужный класс для юзера и создаем его экземпляр в App.user = new U();
                    //TODO: Дописать, когда будет инфа о сервисах
                    App.user = new Employer();
                    deferred.resolve();
                }, deferred.reject);
            })
            .fail(deferred.reject);

            return deferred;
        },
        changePassword: function(oldPassword, newPassword){
            var deferred = $.Deferred();
                //TODO: Implement!
            deferred.resolve();
                /*(new Request({
                    url: ""
                }))
                    .send({
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    })
                    .done(function(result){
                        deferred.resolve();
                    })
                    .fail(function(){
                        deferred.reject();
                    })
                */
            return deferred;
        }

    });

    return User;
});