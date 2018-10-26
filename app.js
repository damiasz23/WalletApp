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
        document.querySelector(DOM.inputBtn).addEventListener('click', function(){
        console.log('dziala');
    });

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            console.log('klawiatura działa');
        }

    });
    }

    var DOM = UICrtl.getDomSettings();

    var crtlAddItem = function(){

    }




})(budgetController, UIController);
