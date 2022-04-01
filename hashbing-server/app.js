const express = require('express');
const cors = require('cors');
const constructorMethod = require('./routeConstructor');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', (req, res, next) => {
	console.log(
		'request',
		req.body,
		'Req URL',
		req.url,
		'Auth Status :',
		req?.session?.user
			? 'User is authenticated'
			: 'User is not authenticated'
	);
	req.url = req.url.trim();
	next();
});
constructorMethod(app);

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
