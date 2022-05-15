const dbConnection = require('../config/mongoConnection');
const courseList = require('./courses.json');
const userList = require('./users.json');
// const userData = require('../data/courses');
// const postData = require('../data/users');
const { loadDefaultCourses, loadDefaultUsers} = require('./func');


async function main() {
	const db = await dbConnection();
	await db.dropDatabase();

	/**
	 * add users to DB
	 */
	await loadDefaultUsers(userList);

	/**
	 * add courses to DB
	 */
	await loadDefaultCourses(courseList);


	console.log('Done seeding database');
	await db.s.client.close();
}

main().catch(console.log);
