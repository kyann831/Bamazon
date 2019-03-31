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

    // function which prompts the user for what action they should take
    function start() {
        inquirer
        .prompt([{
            type: "input",
            name: "askid",
            message: "What is the id of the product you would like to buy?"
        },
        {   
            type: "input",
            name: "howmany",
            message: "How many would you like to buy?"

    }])
    }
