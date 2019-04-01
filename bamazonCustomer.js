var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {

    if (err) throw err;
      // run the start function after the connection is made to prompt the user
    start();
  });

    // function start loops through the database index to show the user item id, product and price
    function start() {
        connection.query('SELECT * FROM products', function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                //%s stringifies the results to display them more orderly
                console.log("%s %s %s", results[i].item_id, results[i].product_name,  "$" + results[i].price);
            }
            //calls prompt function to obtain user the id of product and how many are wanted
            prompt();
        }

        );

        
    }

    function prompt() {

        inquirer
        .prompt([{
            type: "input",
            name: "askid",
            message: "What is the id of the product you would like to buy?"

        },
        {   
            type: "input",
            name: "howmany",
            message: "How many would you like to buy?",
        }])
        .then(function(answer) {
            // based on answers
            console.log('answer: %o', answer);

            var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.askid }, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    var row = res[i];
                    console.log("Item id: " + res[i].item_id); 
                    if (answer.howmany > row.stock_quantity) {
                        console.log("Insufficient quantity!");
                        start();
                    }
                    else { 
                        connection.query (
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: row.stock_quantity - answer.howmany
                                },
                                {
                                    item_id: row.item_id
                                }
                            ],
                            function(error, res2) {
                                if (error) throw err;
                                console.log("table updated");
                                console.log(res2);
                                start();
                            }
                        );
                    }
                    
                }   
            });
        });
    }
