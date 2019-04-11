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
    connection.query("SELECT * FROM bamazon.products", function(err, results) {
        if (err) throw err;
       console.log("------------------");
       console.log("Welcome to Bamazon");
       console.log("__________________");
    
     var maketable = new Table({
         head: ["Item Id", "Product", "Department", "Price", "Quantity"],
         colWidth: [10, 50, 75, 7, 10]
        });   
      
        for (var i = 0; i < results.length; i++){
            maketable.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity])
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
    connection.query("SELECT * FROM bamazon.products", function(err, results) {
        if (err) throw err;
        
        
       inquirer
            .prompt([
                {
                 name: "item_id",
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
                // If Quantity of product is invalid //
                for (var i = 0; i < results.length; i++) {
                    if (answer.item_id === results[i].item_id) {
                        if(answer.quantity > res[i].quantity) {
                            console.log("Insufficient quantity!")
                            connection.end()
                        };
                    }
                    else { 
                        

                    }
                }
                
            });     
    });
}
