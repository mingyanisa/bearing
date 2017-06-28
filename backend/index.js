var mysql = require('mysql');
var express = require('express');
var app = express();
app.listen(8000);
var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "password",
	database : "BearingWeb"
});
connection.connect((err)=>{
	if (err) throw err;
	console.log("mingLoveSQL");
	app.get("/test",(req,res)=>{
		console.log("mingLovePython");
		connection.query("SELECT * FROM `products` WHERE 1",(err,result)=>{
			if (err) throw err;
			res.send(result);
		});
	});
});
