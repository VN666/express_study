var express = require('express');

var app = express();

/*git测试1*/

/*设置handlebars视图引擎*/
var handlebars = require('express3-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.type('text/html');
	res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.use( (req, res, next) => {
	res.status(404);
	res.render('404');
});

app.use( (err, req, res, next) => {
	console.error(err);
	res.status(500);
	res.render('500');
});

/*定制404页面*/
app.use( (req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

/*定制500页面*/
app.use( (err, req, res, next) => {
	console.error(err);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
	console.info('Exprss started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});
