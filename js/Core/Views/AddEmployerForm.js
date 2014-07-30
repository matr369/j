/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Form", "App", "jquery", "Collections/Employers", "Models/Employer"], function(Form, App, $, Employers, Employer){
    return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "view:parent:hide": "reset"
        }),
        
        constructor: function(options){
            options.collection = new Employers();
            Form.prototype.constructor.apply(this,[options]);
        },

        __sendData: function(data){
            return $.Deferred().resolve(data);
        },

        onSuccessSubmit: function(data){
            this.collection.add(data);
            //alert(JSON.stringify(this.collection));
            Form.prototype.onSuccessSubmit.apply(this, arguments);
        }

    }, {


        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.addemployer.html?v=2"
            },
            submitButton: ".button-create",
            submitButtonText: "Create",
            nameText: "Curator's name",
            emailText: "Curator's email",
            emailPlaceholder: "matr369@gmail.com",
            namePlaceholder: "Evgene Ivashkevich"
        })
    });
});