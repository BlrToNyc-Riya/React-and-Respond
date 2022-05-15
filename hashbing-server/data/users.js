// const mongoCollections = require('../config/mongoCollections');
const { ObjectID } = require('bson');
const mongoCollections = require('../config/mongoCollection');
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const {
	isValidString,
	isValidUsername,
	isValidPassword,
	isValidEmail
} = require('../utils/utils');
const { use } = require('../routes/coursesRoute');
const saltRounds = 10;

module.exports = {
	async createUser({ email, firstName, lastName  }) {	
		email = email.toLowerCase().trim();
		if(typeof email != 'string' || typeof firstName != 'string' || typeof lastName != 'string') 
			throw "type error: input should of string type";
		isValidEmail(email);
		const userCollection = await users();
		const userData = await userCollection.findOne({ email });
		if (userData) {
			throw { message: 'User already exists', code: 403 };
		}

		const user = {
			email,
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


	async getUserById(id) {
		const usersCollection = await users();
		const user = await usersCollection.findOne({ _id: new ObjectID(id) });
		if (user === null) throw 'No user with that id';
		return user;
	},
	async getUserByEmail(email) {
		if(!email)
			throw "can't fetch the user, please login and try agin";
		isValidEmail(email);
		const usersCollection = await users();
		const user = await usersCollection.findOne({ email: email });
		if (user === null) throw 'No user with that id';
		return user;
	},
	async userExists(email){
		const usersCollection = await users();
		const user = await usersCollection.findOne({ email: email });
		if (user === null) return false;
		return true;
	},
	async authenticateUser(email) {
		if (!email) throw 'You must supply both username';
		if (typeof email !== 'string') throw 'Email is invalid';
		else if (email.trim() === '') throw 'Email is empty spaces';
		email = email.toLowerCase();
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (user) {
				return { authenticated: true, user };
			}
		
		throw 'Invalid username or password';
	},
	async updateUser(firstName="",lastName="", bio="",email){
		if(!email)
			throw "You must be signed in to update profile..";
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if(!user)
			throw "Could not fetch user data";
		if(firstName !="")
			user.firstName = firstName;
		if(lastName != "")
			user.lastName = lastName;
		if(bio !="")
			user.bio = bio;

		const updatedInfo = await userCollection.updateOne({_id: user._id},{$set: user});
		if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) throw 'Update failed';
		return user;
	},
	async uploadPic(email,path){
		if(!email)
			throw "You must be signed in to update profile..";
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if(!user)
			throw "Could not fetch user data";
		user.profilePic = path;
		const updatedInfo = await userCollection.updateOne({_id: user._id},{$set: user});
		if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) throw 'Update failed';
		return user.profilePic;
	}
};
