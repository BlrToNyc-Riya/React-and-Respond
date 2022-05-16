const { ObjectID } = require('bson');
const mongoCollections = require('../config/mongoCollection');
const courses = mongoCollections.courses;
const userData = require('./users');
const { v4: uuidv4 } = require('uuid');
const {
	objectIdToString,
	isValidStringField,
	isValidArray,
	isValidObject,
} = require('../utils/utils');
const users = mongoCollections.users;
module.exports = {
	async createCourse(
		title,
		body,
		description,
		author,
		topicsTagged,
		courseOutcome,
		file
	) {
		// errorCheckingCourse(title,body,author);
		// const id = ObjectID(author);
		// const user = await userData.getUserByEmail(author);
		isValidStringField(title, 3);
		isValidStringField(body, 3);
		isValidStringField(file, 3);
		isValidStringField(description, 10);
		isValidStringField(topicsTagged, 1);
		isValidObject(courseOutcome);
		let topics = topicsTagged;
		topics = [
			...new Set(
				topicsTagged
					.split(',')
					.map((topic) =>
						topic.trim().length > 0 ? topic.trim() : null
					)
			),
		];
		isValidArray(topics);
		isValidObject(courseOutcome);
		const usersCollection = await users();
		const user = await usersCollection.findOne({ email: author });
		if (user === null) throw { message: 'No user with that id', code: 404 };
		console.log(user);
		if (!user) throw { message: 'Author not found', code: 404 };

		const courseCollection = await courses();
		const course = {
			title,
			body,
			description,
			author: author,
			topicsTagged: topics,
			courseId: uuidv4(),
			courseOutcome,
			fileName: file,
			metaData: { timeStamp: new Date().getTime(), published: true },
		};

		const newCourseInfo = await courseCollection.insertOne(course);
		if (newCourseInfo.insertedCount === 0)
			throw { message: 'Insert failed!', code: 500 };
		console.log(newCourseInfo.insertedId);
		user.courseAuthored.push(objectIdToString(newCourseInfo.insertedId));
		const userCollection = await users();
		const updateInfo = await userCollection.updateOne(
			{ _id: user._id },
			{ $set: user }
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw { message: 'Update failed', code: 500 };
		console.log(user);
		return 'Insertion successful';
	},
	async getCourseById(id) {
		if (!id || typeof id != 'string')
			throw { message: 'Invalid id passed', code: 400 };
		const courseId = ObjectID(id);
		const courseCollection = await courses();
		const course = await courseCollection.findOne({ _id: courseId });
		if (!course)
			throw { message: 'No course found with this id', code: 404 };
		return course;
	},
	async getCourseByIdPerUser(id, email) {
		if (!id || typeof id != 'string')
			throw { message: 'Invalid id passed', code: 404 };
		const courseId = ObjectID(id);
		const usersCollection = await users();
		const user = await usersCollection.findOne({ email });
		console.log('user', user.coursesEnrolled, id);
		if (!user) throw { message: 'User not found', code: 404 };
		const isUserEnrolled = user.coursesEnrolled.filter((courseId) => {
			console.log(id);
			return id.toString() === courseId.toString();
		});
		console.log('isUserEnrolled', isUserEnrolled);
		if (isUserEnrolled.length <= 0)
			throw {
				message: 'User is not enrolled to this course/ Access Denied',
				code: 403,
			};
		const courseCollection = await courses();
		const course = await courseCollection.findOne({ _id: courseId });
		if (!course)
			throw { message: 'No course found with this id', code: 404 };
		return course;
	},

	async enrollToCourse(email, courseId) {
		if (!email || !courseId)
			throw {
				message:
					"Error with user's email or the course id not fetched..",
				code: 400,
			};
		courseId = ObjectID(courseId);
		const courseCollection = await courses();
		const course = await courseCollection.findOne({ _id: courseId });
		if (!course)
			throw {
				message: 'No course found with this id, unable to register',
				code: 404,
			};
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (!user) {
			throw {
				message:
					'Invalid user login, unable to register for the course',
				code: 404,
			};
		}
		const found = user.coursesEnrolled.find(
			(element) => element == objectIdToString(courseId)
		);
		if (found) {
			throw { message: 'Course already enrolled', code: 403 };
		}
		user.coursesEnrolled.push(objectIdToString(courseId));
		const updateInfo = await userCollection.updateOne(
			{ _id: user._id },
			{ $set: user }
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw { message: 'Update failed', code: 500 };
		return 'Enrolled successfully!!';
	},
	async unregisterCourse(email, courseId) {
		if (!email || !courseId)
			throw {
				message:
					"Error with user's email or the course id not fetched..",
				code: 400,
			};
		courseId = ObjectID(courseId);
		const courseCollection = await courses();
		const course = await courseCollection.findOne({ _id: courseId });
		if (!course)
			throw {
				message: 'No course found with this id, unable to unregister',
				code: 404,
			};
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (!user) {
			throw {
				message:
					'Invalid user login, unable to register for the course',
				code: 403,
			};
		}
		user.coursesEnrolled = user.coursesEnrolled.filter(function (
			value,
			index,
			arr
		) {
			return value != objectIdToString(courseId);
		});
		const updateInfo = await userCollection.updateOne(
			{ _id: user._id },
			{ $set: user }
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw { message: 'Update failed', code: 500 };
		return 'Unregistered successfully!!';
	},
	async getAllAuthoredCourses(email) {
		if (!email)
			throw {
				message: 'You must be signed in to update profile..',
				code: 403,
			};
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (!user) throw { message: 'Could not fetch user data', code: 404 };
		return user.courseAuthored;
	},
	async getAllEnrolledCourses(email) {
		if (!email)
			throw {
				message: 'You must be signed in to update profile..',
				code: 403,
			};
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (!user) throw { message: 'Could not fetch user data', code: 404 };
		return user.coursesEnrolled;
	},
	async getAllCourses() {
		const courseCollection = await courses();
		const allCourses = await courseCollection.find({}).toArray();
		if (!allCourses)
			throw { message: 'could not fetch courses', error: 401 };
		return allCourses;
	},

	async deleteCourse(email, courseId) {
		if (!email || !courseId)
			throw {
				message:
					"Error with user's email or the course id not fetched..",
				code: 403,
			};
		parsedId = ObjectID(courseId);
		const courseCollection = await courses();
		const course = await courseCollection.findOne({ _id: parsedId });
		if (!course)
			throw {
				message: 'No course found with this id, unable to unregister',
				code: 404,
			};
		const userCollection = await users();
		const user = await userCollection.findOne({ email });
		if (!user) {
			throw {
				message: 'User not found, unable to delete the course',
				code: 404,
			};
		}
		const authoredCourse = user.courseAuthored;
		if (!authoredCourse.includes(courseId)) {
			throw {
				message:
					'This course is not created by the logged in user. Only the created user can delete the course!',
				code: 403,
			};
		}
		const usersCollection = await users();
		const updateInfo = await usersCollection.updateMany(
			{},
			{
				$pull: {
					coursesEnrolled: { $in: [courseId] },
					courseAuthored: { $in: [courseId] },
				},
			}
		);
		console.log(updateInfo);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw { message: 'Update failed', code: 500 };
		let userList = await userCollection.find({}).toArray();
		console.log(userList);
		const deleteInfo = await courseCollection.deleteOne({ _id: parsedId });
		if (deleteInfo.deletedCount === 0)
			throw { message: 'delete failed', code: 500 };
		return 'deleted successfully!!';
	},
};
