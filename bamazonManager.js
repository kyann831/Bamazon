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
  });

 
  function viewProducts () {
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            //%s stringifies the results to display them more orderly
            console.log("%s %s %s", results[i].item_id, results[i].product_name, results[i].department_name, results[i].price,"$" + results[i].price);
        }

  })}

  function viewlowInventory () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            //%s stringifies the results to display them more orderly
            console.log(results[i].product_name);
            // var low = results[i].stock_quantity < 5; 
                    console.log(results[i]);
                
            }
        }

    )}
    
    // function addtoInventory () {
    //   connection.query("UPDATE product SET stock_inventory WHERE")
    // }
    
    // function prompt () {
    //   inquirer
    //   .prompt({
    //     type: "input",
    //     name: "addmore",
    //     message: "What product would you like to add more of?"
    //   })
    //   .then(function(answer) {
    //     console.log("answer: %o", answer);
    //     var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
    //     connection.query(query, { product_name: answer.addmore }, function(err,res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Item: " + res[i].product_name);
            
    //         prompt();
    //       }
          
    //     })});   
    // }

    //      function addnewProduct () {
    //       connection.query('INSERT INTO products SET', function(err, results) {
    //           if (err) throw err;
    //           for (var i = 0; i < results.length; i++) {
    //               //%s stringifies the results to display them more orderly
    //               console.log("%s %s %s", results[i].item_id, results[i].product_name, results[i].department_name, results[i].price,"$" + results[i].price);
    //           }
      
    //     })}
    


function switchcase(command){
    switch (command) {
      case 'View-Products-For-Sale':
        viewProducts();
        break;
      case 'View-Low-Inventory':
        viewlowInventory();
        break;
      case 'Add-to-Inventory':
        addtoInventory();
        break;
      case 'Add-New-Product':
        addnewProduct(param);
        break;
    }
}
    var command = process.argv[2];
    switchcase(command);