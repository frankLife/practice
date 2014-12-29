var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timetrack_node'
});

buildDB();
function buildDB(){
  db.connect(function(err) {
  if(err) {
    throw err;
  }
  console.log('database connect');
  });
}


function createTable(){
  db.query("CREATE TABLE IF NOT EXISTS work (" 
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
function insertTable(opt,cb){
  console.log('opt: ');
  console.log(opt);
  db.query('insert into work(hours,date,description) values(?,?,?) ',
    [opt.hours,opt.date,opt.description],function(err) {
      if(err) {
        throw err;
      }
      cb && cb();
    });
}

exports.insertTable = insertTable;