// Budget Controller
var budgetController = (function(){

})();









// UI Controller
var UIController = (function(){

    var DOMSettings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function(){
            return {
            type: document.querySelector(DOMSettings.inputType).value,
            description: document.querySelector(DOMSettings.inputDescription).value,
            value: document.querySelector(DOMSettings.inputValue).value

            };
        },
        getDomSettings: function(){
            return DOMSettings;
        }
    };

})();




// Global app controller
var controller = (function(budgetCrtl, UICrtl){

    var setupEventListeners = function(){

        var DOM = UICrtl.getDomSettings();

        document.querySelector(DOM.inputBtn).addEventListener('click', crtlAddItem);

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            crtlAddItem();
        }

    });
 };

    var crtlAddItem = function(){
        var input = UICrtl.getInput();
        console.log(input);

    };

    return {
        init: function(){
            console.log('Aplication has started');
            setupEventListeners();

        }
    };

})(budgetController, UIController);

controller.init();
