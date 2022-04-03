let path = require('path');
let express = require('express');
let hbs = require('hbs');
let app = express();
let weather = require('./utils/weather');
let port = process.env.PORT || 3000;


/* app.get('',(req, res) => {


});
*/


let publicDirectory = path.join(__dirname, '../public');
let viewsDirectory = path.join(__dirname, '../templates/views');
let partialsDirectory = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));

app.get('',(req, res) => {

	
	res.render('index', 
	{
		title: 'Home Page',
		name: 'Tyler McHugh',
		course: 'CSC 174'
	}
	);

});

app.get('/help',(req, res) => {

	res.render('help', {
		title: 'Help Page',
		helpText: 'This is some helpful text from the help page',
		name: 'Tyler McHugh',
		course: 'CSC 174'
	});


});
app.get('/about',(req, res) => {

	res.render('about', {
		title: 'About Page',
		name: 'Tyler McHugh',
		course: 'CSC 174'
	});


});

app.get('/weather',(req, res) => {
	//res.send("You have reached the weather page");

	if(!req.query.city)
	{
		res.send({
			error: 'You must provide a city to search.'
		});
	}
	else
	{
		weather(req.query.city, (error, weatherData) =>{
			if(error)
			{
				return res.send({error: error});
			}
			else
			{
				res.send({weather: weatherData});
			}
		});
		
		/*res.send({
			forecast: "47 Degrees and Cloudy.",
			location: req.query.city
		});*/
	}


});


app.get('/products', (req, res) => {
	if(!req.query.search)
	{
		res.send({
			error: 'You must provide a search term.'
		});
	}
	else
	{
		res.send({
		products: []
	});
	}
	//console.log(req.query)
	
});


app.get('/help/*',(req, res) => {
	//res.send("Help Article Not Found");
	res.render('4042', {
		error: "Page not found",
		errorType: "404 Help Article Error"
	});

});

app.get('*',(req, res) => {
	//res.send("404 Error Page");
	res.render('4041',{
		error: "Page not found",
		errorType: "404 Error"
	});

});




app.listen(port, () =>{
	console.log('Server is live. ');
	console.log('Open your web browser and go to the following url- localhost:3000');
	console.log('To exit, come back to Node.js command prompt and enter CTRL+C');

});