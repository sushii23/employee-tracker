const mysql = require("mysql2");

const connectM = mysql.createConnection({
   host:"localhost",
   user:"root",
   passcode:"",
   database:"employees"
});

connectM.connect(function(err){
 if(err);
});

module.exports = connectM;