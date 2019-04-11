var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"band3D016#",
    database:"bamazon",
})

connection.connect(function(err) {
    if (err) throw err;

    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
       console.log("------------------");
       console.log("Welcome to Bamazon");
       console.log("__________________");
    
     var maketable = new Table({
         head: ["Item Id", "Department", "Price", "Quantity"],
         colWidth: [10, 75, 7, 10]
        })   
      
        for (var i = 0; i < results.length; i++){
            maketable.push([results[i].item_id, res[i].department_name, results[i].Price, results[i].quantity])
        }
        
        console.log(maketable.toString());
          
        inquirer
        .prompt({
            name: "confirm",
            type: "list",
            message: "Would you like to [BUY] or [EXIT]?",
            choices: ["BUY", "EXIT"]
        })
        .then(function(answer) {
            if (answer.confirm === "BUY") {
                Products();
            }
           else if(answer.confirm === "EXIT") {
               connection.end();
           } 
       });
    });
    
    

    

    

    
}


function Products() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        
       inquirer
            .prompt([
                {
                 name: "item id",
                 type: "input",
                    choices: function() {
                     var productsArray = [];
                        for (var i = 0; i < results.length; i++) {
                         productsArray.push(results[i].item_id);
                        }

                    },
                    message: "Enter the item id of the product you wish to purchase."
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                } 
            ])
            .then(function(answer) {

                var chosenProduct;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenProduct = results[i];
                    }
                }
                // If Product has insufficientnumbers
                if(chosen.stock_quantity > parseInt(answer.quantity)) {
                    // qunatity is not enough, so re-enter the stock numbers
                    connection.query(
                        "Insufficient quantity! Re-enter the numbers?",
                        [
                            {
                             stock_quantity: answer.quantity
                            },
                            {
                                id: chosenProduct.id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("Purchase successful!");
                            start();
                        }
                    );
                }
            });     
    });
}
