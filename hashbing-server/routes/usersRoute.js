const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const users = require('../data/users');
const { handleUserInfo, objectIdToString } = require('../utils/utils');

router.get('/test', async (req, res) => {
	return res.json({ test: 'test' });
});

router.post('/signup', async (req, res) => {
	try {
		let { password, email,firstName, lastName } = req.body;
		if (!password || !email || !firstName || !lastName) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			let user = {
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

router.post('/signin',async(req,res)=>{
	try {
		const { email, password } = req.body;
		if (!email || !password) throw 'You must supply both username and password';
		if (email === ' ' || password === ' ') throw 'You must supply valid username or password';
		if (!(typeof email === 'string') || !(typeof password === 'string'))
			throw 'You must supply valid username or password';
		// if (email.search(/[a-z][a-z0-9]+@stevens\.edu/i) === -1) throw 'You must supply valid username or password';
		// if (password.length < 8 || password.length > 15) throw 'You must supply valid username or password';

		const { authenticated, user } = await users.authenticateUser(email, password);
		if (authenticated) {
			req.session.userid = objectIdToString(user._id);

			const userInfo = handleUserInfo(user);
			console.log(req.session);
			res.json(userInfo);
		}
	} catch (error) {
		res.status(400).send(error?.message ?? error); //need to render
	}
});

module.exports = router;
