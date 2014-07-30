/**
 * Created by Mantsevich on 26.07.2014.
 */
define(["underscore"], function (_) {
    return {
        patterns: {
            __defaults: {},
            login: {
                required: true,
                minsize: 3
            },
            password: {
                required: true,
                minsize: 5,
                maxsize: 16
            },
            name:{
                required: true,
                minsize:4,
                maxsize: 40,
                name: true
            },
            email:{
                required: true,
                minsize: 5,
                email: true
            },
            emailExadel:{
                required: true,
                minsize: 5,
                emailExadel: true
            }
        },

        __processRules: function (rules) {
            if (_.isString(rules)) {
                return this.patterns[rules] || {};
            }
            var result = _.cloneDeep(this.patterns[rules.pattern || "__defaults"]);
            _.assign(result, rules);
            delete result.pattern;
            return result;
        },

        check: function (value, rules, label) {
            var self = this,
                verificationResult = true;
            label = label || "";
            if (!rules) {
                return true;
            }
            rules = this.__processRules(rules);
            _.all(rules, function (ruleValue, ruleName) {
                ruleName = "$" + ruleName;
                if (_.isFunction(self[ruleName])) {
                    verificationResult = self[ruleName](value, ruleValue, label);
                    return (verificationResult === true)? true : false;
                } else {
                    return true;
                }
            });
            return verificationResult;
        },

        // Проверка на обязательность
        $required: function(value, rule, name){
            return (value.trim() !== "")? true : "Field "+name+" are required.";
        },
        $condition: function(){
            return true;
        },
        // Проверка на тип email
        $email: function(value, rule, name){
            return (this.$equal(value, '^[a-z0-9]+[-\\._a-z0-9][a-z0-9]@(?:[a-z0-9]+[-a-z0-9]*\\.){1,3}[a-z]{2,9}$', name) === true)? true : "Field "+name+" must be email.";
        },
        // Проверка на полное соответствие регулярному выражению. Регулярное выражение передается в виде строки
        $equal: function(value, rule, name){
            return (_.first(value.match(new RegExp(rule,'ig'))) === value)? true : "Field "+name+" has invalid format.";
        },
        // Проверить является ли значение числом
        $number: function(value, rule, name){
            var number = parseInt(value,10);
            return (_.isNumber(number) && !_.isNaN(number) && number.toString()===value)? true : "Field "+name+" must be number.";
        },
        // Краткая форма equal.
        $only: function(value, rule, name){
            var reg = '',
                error = "Field "+name+" has invalid format.";
            switch (rule){
                case 'digits':
                    reg = '\\d*';
                    error = "Field "+name+" can contain only digits.";
                    break;
                default:
                    return true;
                    break;
            }
            return (this.$equal(value, reg, name) === true)? true : error;
        },
        // Точная длина поля.
        $size: function(value, rule, name){
            return (value.length === rule)? true : "Length of the field "+name+" must be equal "+rule ;
        },
        $minsize: function(value, rule, name){
            return (value.length >= rule)? true : "Length of the field "+name+" must be no less than "+rule ;
        },
        $maxsize: function(value, rule, name){
            return (value.length <= rule)? true : "Length of the field "+name+" must be no more than "+rule ;
        },
        // проверка является ли строка именем и фамилией
        $name: function(value, rule, name){
            return (this.$equal(value, '[a-z]+[\\ ][a-z]+', name) === true)? true: "Field "+name+" must be first name and last name.";
        },
        //проверка email на домен exadel.com
        $emailExadel: function(value, rule, name){
            return (this.$equal(value,'^[a-z0-9]+[-\\._a-z0-9][a-z0-9]@exadel.com$', name)=== true)? true: "Field "+name+" must be youremail@exadel.com";
        }
    }
});