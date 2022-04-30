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
	async createUser({ email, userName, password, firstName, lastName  }) {
		console.log('data', email, userName, password);
		isValidString(email, 'name');
		isValidString(userName, 'username');
		isValidString(password, 'password');
		email = email.toLowerCase().trim();
		userName = userName.toLowerCase().trim();
		password = password.trim();
		isValidUsername(userName);
		// isValidPassword(password);
		const userCollection = await users();
		const userData = await userCollection.findOne({ userName });
		if (userData) {
			throw { message: 'User already exists', code: 403 };
		}
		const hash = await bcrypt.hash(password, saltRounds);

		const user = {
			email,
			userName,
			password: hash,
			DOB:"",
			bio:"",
			profilePic:"",
			role: "Learner",
			coursesEnrolled:[],
			courseAuthored: [],
			firstName:firstName,
			lastName:lastName,
			phoneNumber:""
		};
		const insertInfo = await userCollection.insertOne(user);
		if (insertInfo.insertedCount === 0)
			throw { message: 'Unable to add user', code: 500 };
		return { userInserted: true, user: user };
	},

	// async loginUser(userName, password) {
	// 	const usersCollection = await users();
	// 	const user = await usersCollection.findOne({ userName: userName });
	// 	if (!user) throw 'User not found';
	// 	// const isPasswordValid = await bcrypt.compare(password, user.password);
	// 	if (!isPasswordValid) throw 'Invalid password';
	// 	return user;
	// },

	async getUserById(id) {
		const usersCollection = await users();
		const user = await usersCollection.findOne({ _id: new ObjectID(id) });
		if (user === null) throw 'No user with that id';
		return user;
	},
	async authenticateUser(email, password) {
		if (!email || !password) throw 'You must supply both username and password';
		if (typeof email !== 'string') throw 'Email is invalid';
		else if (email.trim() === '') throw 'Email is empty spaces';
		if (typeof password !== 'string') throw 'Password is invalid';
		else if (password.trim() === '') throw 'Password is empty spaces';
	
		// if (email.search(/[a-z][a-z0-9]+@stevens\.edu/i) === -1) throw 'You must supply valid username or password';
		// if (password.length < 8 || password.length > 15) throw 'Password must be between 8 and 15 characters';
		email = email.toLowerCase();
	
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (user) {
			let match = await bcrypt.compare(password, user.password);
			if (match) {
				return { authenticated: true, user };
			}
		}
		throw 'Invalid username or password';
	}
};
