// Budget Controller
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;

            if(type === 'exp'){
               newItem = new Expense(ID, des, val);
               }
            else if(type === 'inc'){
                newItem = new Income(ID, des, val);
                    }
            data.allItems[type].push(newItem);
            return newItem;
        }

    };

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
        //   Get input data:
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
