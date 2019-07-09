module.exports = function(app) {
	app.get('/', function(req, res) {
		res.send('Hello from project');
	});
};

//to => module.exports = (app, connection) => {

//};