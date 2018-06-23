var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencoderParser = bodyParser.urlencoded({extended: false});

mongoose.connect('mongodb://test:test16@ds117101.mlab.com:17101/paramtodo16');
var schema = mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', schema);

module.exports = function(app) {
	app.get('/todo', function(req, res){
		Todo.find({}, function(error, data){
			if(error) throw error;
			res.render('todo', {todos: data});	
		});
	});

	app.post('/todo', urlencoderParser, function(req, res){

		var newTodo = Todo(req.body).save(function(err, data){
			if(err){
				console.log(err);
			}
			res.json(data);
		});
		//res.render('todo', {todos: data});
	});

	app.delete('/todo/:item', function(req, res){
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		
	});
};