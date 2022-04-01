const userRoutes = require('./routes/usersRoute');

const constructorMethod = (app) => {
	// Landing page '/' route
	// all api will begin with /api
	// app.use('/', (req, res) => {
	// 	res.json({ message: 'Welcome to the HashBing API' });
	// });
	app.use('/users', userRoutes);
	app.get('/*', (req, res) => {
		console.log('<<<<<<here in all>>>>>>>>>>>>>>');
		return res.status(404).json({ error: 'Page not found' });
	});
};

module.exports = constructorMethod;
