var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table2");

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
         colWidth: [10, 75, 50, 20, 20]
        });   
      
        for (var i = 0; i < results.length; i++){
            maketable.push([results[i].itemid, results[i].productname, results[i].departmentname, results[i].price, results[i].stockquantity])
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
                Products(results);
            }
           else if(answer.confirm === "EXIT") {
               connection.end();
           } 
       });
    });
   
    

    

    
}


function Products(inventory) {
        
       inquirer
            .prompt([
                {
                 name: "item_id",
                 type: "input",
                 message: "Enter the item id of the product you wish to purchase."
                },
                
            ])
            .then(function(answer) {
               var itemArray = []; 
                var choiceId = parseInt(answer.item_id);
                var product = checkInventory(choiceId, inventory)

                if (product) {
                    console.log("We have this item!");
                    Amount(product);
                } else {
                    console.log("\nThis item is not in the inventory.");
                    start();
                }         
      
            });     
    };



function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].itemid == choiceId) {
            return inventory[i];
        }
    }

    return null;
}



function Amount(product) {
    inquirer
     .prompt([
        {
            name: "quantity",
            type: "input",
            message: "Enter the amount you want to purchase."
        }
      ])
    .then(function(answer) {
        var quantity = parseInt(answer.quantity);

        if (quantity <= product.stockquantity) {
            var newamount = parseInt(quantity) - parseInt(answer.quantity);
            console.log("Purchase accepted");
            
            console.log("Updating Stock");
            
            connection.query("UPDATE bamazon.products SET? WHERE?", [{stockquantity: newamount}], function(err, results) {
        
             console.log("Stock Updated")
            });
            connection.end();

        } else {
            console.log("Inufficient quantity! Enter again");
            Amount(product);
        }
       
      }); 

      


    }
   
function checkQuantity(inventory, choiceId, quantity) {
        return null;
    
    };   
