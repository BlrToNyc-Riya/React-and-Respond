// const mongoCollections = require('../config/mongoCollections');
const { ObjectID } = require('bson');
const mongoCollections = require('../config/mongoCollection');
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const {
	isValidString,
	isValidUsername,
	isValidPassword,
} = require('../utils/utils');
const saltRounds = 10;

module.exports = {
	async createUser({ email, username, password }) {
		console.log('data', email, username, password);
		isValidString(email, 'name');
		isValidString(username, 'username');
		isValidString(password, 'password');
		email = email.toLowerCase().trim();
		username = username.toLowerCase().trim();
		password = password.trim();
		isValidUsername(username);
		// isValidPassword(password);
		const userCollection = await users();
		const userData = await userCollection.findOne({ username });
		if (userData) {
			throw { message: 'User already exists', code: 403 };
		}
		const hash = await bcrypt.hash(password, saltRounds);

		const user = {
			email,
			username,
			password: hash,
		};
		const insertInfo = await userCollection.insertOne(user);
		if (insertInfo.insertedCount === 0)
			throw { message: 'Unable to add user', code: 500 };
		return { userInserted: true, user: user };
	},

	async loginUser(userName, password) {
		const usersCollection = await users();
		const user = await usersCollection.findOne({ userName: userName });
		if (!user) throw 'User not found';
		// const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw 'Invalid password';
		return user;
	},

	async getUserById(id) {
		const usersCollection = await users();
		const user = await usersCollection.findOne({ _id: new ObjectID(id) });
		if (user === null) throw 'No user with that id';
		return user;
	},
};
