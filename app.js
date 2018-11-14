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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;
            if(data.allItems[type].length > 0){
               ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
               }
            else {
                ID = 0;
            }

            if(type === 'exp'){
               newItem = new Expense(ID, des, val);
               }
            else if(type === 'inc'){
                newItem = new Income(ID, des, val);
                    }
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
               return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }


        },


        calculateBugdet: function(){
          //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
          //calculate budget
            data.budget = data.totals.inc - data.totals.exp;

        // calculate the percentage
            if(data.totals.inc > 0){
               data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
               } else{
                   data.percentage = -1;
               }

        },

        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentege: data.percentage
            }
        },


        testing: function(){
            console.log(data);
        }

    };

})();





// UI Controller
var UIController = (function(){

    var DOMSettings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }

    return {
        getInput: function(){
            return {
            type: document.querySelector(DOMSettings.inputType).value,
            description: document.querySelector(DOMSettings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMSettings.inputValue).value) // parseFloat() change String for float

            };
        },
        addListItem: function(obj, type){
            var html, newHtem, element;
            // HTML string with placeholder
            if(type === 'inc'){
                element = DOMSettings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button</div></div></div>';
            } else if(type === 'exp'){
                element = DOMSettings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                      }

            // Replace placeholder with actual data
            newHtem = html.replace('%id%', obj.id);
            newHtem = newHtem.replace('%description%', obj.description);
            newHtem = newHtem.replace('%value%', obj.value);
            //Insert the HTML into the DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtem);
        },

        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMSettings.inputDescription + ', ' + DOMSettings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, intex, array){
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        dispalyBudget:  function(obj){
            document.querySelector(DOMSettings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMSettings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMSettings.expensesLabel).textContent = obj.totalExp;
            if(obj.percentege > 0){
                document.querySelector(DOMSettings.percentageLabel).textContent = obj.percentege + '%';
            }else {
                document.querySelector(DOMSettings.percentageLabel).textContent = '---';
            }



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
            document.querySelector(DOM.container).addEventListener('click', crtlDeleteItem);

    });
 };
    var updateBudget = function(){

        //Calculate the budget
        budgetCrtl.calculateBugdet();
        //Return the budget
        var budget = budgetCrtl.getBudget();
        //Display the budget on the UI
        UICrtl.dispalyBudget(budget);

    };

    var crtlAddItem = function(){
        var input, newItem;

        //Get input data:
        input = UICrtl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        // Add item to the budget controller
        newItem = budgetCrtl.addItem(input.type, input.description, input.value);
        //Add item to UI
        UICrtl.addListItem(newItem, input.type);
        //Clear the fields
        UICrtl.clearFields();
        //Calculate budget
        updateBudget();
           }

    };

    var crtlDeleteItem = function(event){
        var itemID, splitID, type, ID;
       itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budgetCrtl.deleteItem(type, ID);


        }
    };

    return {
        init: function(){
            console.log('Aplication has started');
            UICrtl.dispalyBudget({
                budget: 0,

                totalInc: 0,
                totalExp: 0,
                percentege: -1
            });
            setupEventListeners();

        }
    };

})(budgetController, UIController);

controller.init();
