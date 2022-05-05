const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const users = require('../data/users');
const { handleUserInfo, objectIdToString, isValidEmail } = require('../utils/utils');

router.get('/test', async (req, res) => {
	return res.json({ test: 'test' });
});

router.post('/signup', async (req, res) => {
	try {
		let { email,firstName, lastName } = req.body;
		if (!email || !firstName || !lastName) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			let user = {
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
		const { email } = req.body;
		isValidEmail(email);
		const { authenticated, user } = await users.authenticateUser(email);
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
