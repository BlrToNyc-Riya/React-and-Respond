const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const users = require('../data/users');

router.get('/test', async (req, res) => {
	return res.json({ test: 'test' });
});

router.post('/signup', async (req, res) => {
	try {
		let { userName, password, email,firstName, lastName } = req.body;
		if (!userName || !password || !email || !firstName || !lastName) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			let user = {
				userName: userName,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName
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
