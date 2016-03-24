function factory(message) {
    var intro = message + " ";
    return function (param) {
        return intro + param;
    };
}

var bonjour = factory("Bonjour");
var aurevoir = factory("A bientôt");

alert(bonjour("Jean-Claude"));
alert(aurevoir("Jean-Claude"));
