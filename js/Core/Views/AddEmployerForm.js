/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Form", "App", "jquery"], function(Form, App, $){
    return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "view:parent:hide": "reset"
        })
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