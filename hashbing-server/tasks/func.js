const {  users, courses } = require('../config/mongoCollection');

const loadDefaultUsers = async userList => {
	const userCollection = await users();
	const insertInfo = await userCollection.insertMany(userList);
	if (insertInfo.insertedCount === 0) throw 'Could not add default users';
};

const loadDefaultCourses = async courseList => {
	const topicsCollection = await courses();
	const insertInfo = await topicsCollection.insertMany(courseList);
	if (insertInfo.insertedCount === 0) throw 'Could not add default courses';
};


module.exports = {
	loadDefaultUsers,
	loadDefaultCourses
};
