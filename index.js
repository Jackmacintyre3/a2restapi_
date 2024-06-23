var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
// 
var model = require('./model/db.js');  //

var app = express();

app.use(cors());

// serves files in public folder
app.use(express.static('public'));

// NB:: this must be included to get JSON content sent with requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//
// routes
//

// /teams
app.route('/teams/')
  .get(function (req, res) {  
    model.getTeams(req, res);
  })

// /players
app.route('/players/')
  .get(function (req, res) {  
    model.getPlayers(req, res);
  })

  app.route('/results/')
  .get(function (req, res) {  
    model.getResults(req, res);
  })

  app.route('/results/:division')
  .get((req, res) => {
    const division = req.params.division;

    model.getResultsByDivision(division, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching results' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.route('/tap/')
  .get(function (req, res) {  
    model.getTAP(req, res);
  })

  app.route('/login/')
  .get(function (req, res) {  
    model.getLogin(req, res);
  })

  app.delete('/results/:id', function (req, res) {
    const id = req.params.id;
    model.deleteResult(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error deleting result' });
      } else {
        res.status(200).json({ message: 'Result deleted successfully' });
      }
    });
  });

  app.route("/results/:id").put(model.updateResult);
  

var myServer = app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
