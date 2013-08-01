var express = require('express'),
  app = express();

app.configure(function(){
  app.set('views', './src/views');
  app.set('view options', {layout: false});
  app.use(express.static(__dirname + '/public/'));
});

/*
app.get('/', function(req, res){
    res.sendfile('index.html');
});
*/

app.listen(3000);
