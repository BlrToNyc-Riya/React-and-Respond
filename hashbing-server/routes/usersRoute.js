const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const users = require('../data/users');

router.get('/test', async (req, res) => {
	return res.json({ test: 'test' });
});

router.post('/signup', async (req, res) => {
	try {
		let { username, password, email } = req.body;
		if (!username || !password || !email) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			let user = {
				username: username,
				password: password,
				email: email,
			};
			console.log('here');
			// return res.sendStatus(200).json({ data: 1 });
			const data = await users.createUser(user);
			console.log('here after', data);
			return res.status(200).json({ data: data });
			console.log('here after again');
		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.json({ error: err });
	}
});

module.exports = router;
