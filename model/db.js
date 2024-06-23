var mysql = require('mysql');

///////////////////////////////////////////////////////////////////////////////////////////

// Setup MySQL connection
// timezone is very NB

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gaanfl2024',
  timezone: 'utc+0'  
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to MySQL database gaaNFL2024`);
});

///////////////////////////////////////////////////////////////////////////////////////////

exports.getTeams = function(req,res){

  connection.query(`SELECT * FROM teams`, function(err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));	  
  });	
}

exports.getPlayers = function(req,res){

  connection.query(`SELECT * FROM players`, function(err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));	  
  });	
}

exports.getResults = function(req,res){

  connection.query(`SELECT * FROM results`, function(err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));	  
  });
}

exports.getResultsByDivision = function(division, callback) {
  connection.query('SELECT * FROM results WHERE division = ?', [division], function(err, rows, fields) {
      if (err) {
          callback(err, null);
          return;
      }
      callback(null, rows);
  });
}

exports.getTAP = function(req, res) {
  connection.query(`SELECT players.id, players.name AS playerName, players.squadNumber, players.age, players.matches, teams.name AS teamName
      FROM players
      INNER JOIN teams ON players.teamID = teams.id`
  , function(err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));
  });
};

exports.getResults = function(req,res){

  connection.query(`SELECT * FROM results`, function(err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));	  
  });	
}

exports.getLogin = function(req,res){

  connection.query(`SELECT * FROM users`, function(err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));	  
  });	
}

exports.updateResult = function(req, res) {
  connection.query(
    'UPDATE results SET team1Score = ?, team2Score = ?, team1Goals = ?, team2Goals = ?, team1Points = ?, team2Points = ? WHERE id = ?',
    [
      req.body.team1Score,
      req.body.team2Score,
      req.body.team1Goals,
      req.body.team2Goals,
      req.body.team1Points,
      req.body.team2Points,
      req.params.id
    ],
    function (err, result) {
      if (err) {
        throw err;
      }
      if(result.affectedRows === 0) {
        res.status(404).json({ error: 'Result not found' + req.params.id });
        return;
      }
      res.json({ message: 'Result updated successfully' });
    }
  );
};

exports.deleteResult = function(id, callback) {
  connection.query('DELETE FROM results WHERE id = ?', [id], function(err, result) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};




