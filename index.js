var express = require('express');
var app = express();

var port = process.env.PORT || 2000;

var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'punchcarddb.cntex7nlrohd.us-east-1.rds.amazonaws.com',
  user     : 'marcaaron',
  password : '32bit*man',
  database : 'punchCard'
});

// var database =
// [
//   {
//     punchType: 'Punch In',
//     currentDate: '12/18/85',
//     currentTime: '11:30 AM'
//   },
//   {
//     punchType: 'Lunch In',
//     currentDate: '12/18/85',
//     currentTime: '11:35 AM'
//   },
//   {
//     punchType: 'Lunch Out',
//     currentDate: '12/18/85',
//     currentTime: '11:40 AM'
//   },
//   {
//     punchType: 'Punch Out',
//     currentDate: '12/18/85',
//     currentTime: '5:00 PM'
//   }
// ];

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use('/', function(req,res,next){
  console.log(`Request url: ${req.url}`);
  next();
});

// return data from mysql
var database = [];
var arrayItem = {}
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM punchcard", function (err, result, fields) {
    if (err) throw err;
    for (i=0; i < result.length; i++){
      arrayItem = {result[i].punchType, result[i].currentDate, result[i].currentTime}
      database.push(arrayItem);
    }
  });
});


app.get('/', function(req, res){
  res.render('index', { serverDatabase: database });
});

app.listen(port);


//delete all data

// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DELETE FROM punchcard WHERE currentDate = '12/18/85'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });
// });

// create data

// var currentDate = new Date().toLocaleDateString();
// var currentTime = new Date().toLocaleTimeString();

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = `INSERT INTO punchcard (punchType, currentDate, currentTime) VALUES ('punchIn', '${currentDate}', '${currentTime}')`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
//
