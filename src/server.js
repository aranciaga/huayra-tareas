var
  express = require("express"),
  path = require("path"),
  nedb = require('nedb'),
  databaseUrl = "db/tareas.db";

var db = {
  tareas: new nedb({ filename: databaseUrl, autoload: true })
};

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/tareas', function (req, res) {
  db.tareas.find({}, function(err, result) {
    res.send(result);
  });
});

app.post('/tareas', function (req, res) {
  var tarea = req.body;
  db.tareas.insert(tarea, function (err, result) {
    if (err) {
      res.send({'error':'Ocurrió un error'});
    } else {
      console.log('Creado: ' + JSON.stringify(result));
      res.send(result);
    }
  });
});

app.delete('/tareas/:id', function (req, res) {
  var id = req.params.id;
  db.tareas.remove({_id: id}, {}, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      console.log('' + result + ' tareas eliminadas');
      res.send(req.body);
    }
  });
});

app.listen(app.get('port'));
console.log('Corriendo en puerto ' + app.get('port'));