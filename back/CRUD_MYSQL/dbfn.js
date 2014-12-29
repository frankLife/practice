var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

function buildDB(){
  connection.connect(function(err) {
  if(err) {
    throw err;
  }
  console.log('database connect');
  });
}


function createTable(){
  db.query("CREATE TABLE IF NOT EXISTS timetrack_node (" 
  + "id INT(10) NOT NULL AUTO_INCREMENT, "
  + "hours DECIMAL(5,2) DEFAULT 0, "
  + "date DATE, "
  + "archived INT(1) DEFAULT 0, "
  + "description LONGTEXT,"
  + "PRIMARY KEY(id))",function(err) {
    if(err) {
      throw err;
    }
    console.log('table created');
  });
}
function insertTable(hours,date,description,cb){
  db.query('insert into timetrack_node(hours,date,description) values(?,?,?) ',
    [hours,date,description],function(err) {
      if(err) {
        throw err;
      }
      cb();
    });
}