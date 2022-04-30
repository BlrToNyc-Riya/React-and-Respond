const users = require('./usersRoute');
const courses = require('./coursesRoute');


const constructorMethod = app => {
	// app.use('/', home);
	app.use('/users', users);
	app.use('/courses', courses);
	

	app.use('*', (_, res) => {
		// return res.redirect('/');
		res.status(404).send('Not found');
	});
};

module.exports = constructorMethod;
