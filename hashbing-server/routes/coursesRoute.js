const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const courses = require('../data/courses');
const users = require('../data/users');
const { isValidObjectId, isValidEmail } = require('../utils/utils');
const multer = require('multer');
const path = require('path');
const decodeIDToken = require('../middlewares/authMiddleware');
const lodash = require('lodash');
const chalk = require('chalk');
const xss = require('xss');

require('dotenv').config();
const {
	objectIdToString,
	isValidStringField,
	isValidArray,
	isValidObject,
} = require('../utils/utils');

const storage = multer.diskStorage({
	destination: '.././hashbing/src/Images/',
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 3,
	},
}).single('file');

router.get('/', decodeIDToken, async (req, res) => {
	try {
		const email = req.session.user;
		if (!email)
			throw {
				message: 'could not fetch authored courses, please login',
				code: 401,
			};
		isValidEmail(email);
		const allCourses = await courses.getAllCourses();
		if (!allCourses)
			throw { message: 'error in fetching the courses', code: 401 };
		res.json({ courses: allCourses });
	} catch (e) {
		res.status(e.code || 500).send(e?.message ?? e);
	}
});
router.get('/authored', decodeIDToken, async (req, res) => {
	try {
		const email = req.session.user;
		if (!email)
			throw {
				message: 'could not fetch authored courses, please login',
				code: 403,
			};
		isValidEmail(email);
		const data = await courses.getAllAuthoredCourses(xss(email));
		if (!data) throw { message: 'No Authored courses found', code: 404 };
		res.json({ Authored: data });
	} catch (error) {
		res.status(error.code || 500).send(error?.message ?? error);
		return;
	}
});
router.get('/enrolled', decodeIDToken, async (req, res) => {
	console.log('enrolling');
	try {
		const email = req.session.user;
		if (!email)
			throw {
				message: 'could not fetch enrolled courses, please login',
				code: 403,
			};
		isValidEmail(email);
		const data = await courses.getAllEnrolledCourses(xss(email));
		if (!data) throw { message: 'No Enrolled courses found', code: 404 };
		return res.json({ Enrolled: data });
	} catch (error) {
		console.log('error', error);
		res.status(error.code || 500).send(error?.message ?? error);
		return;
	}
});
router.post('/uploadPic', decodeIDToken, function (req, res) {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		var options = {
			root: path.join(__dirname),
		};
		return res.status(200).send(req.file);
	});
});
router.post('/create', decodeIDToken, async (req, res) => {
	try {
		let {
			title,
			body,
			description,
			topicsTagged,
			courseOutcome,
			fileName,
		} = req.body;
		if (!title || !body || !description) {
			throw { message: 'Missing required fields', code: 400 };
		} else {
			isValidStringField(title, 3);
			isValidStringField(fileName, 3);
			isValidStringField(body, 3);
			isValidStringField(description, 10);
			if (lodash.isEmpty(courseOutcome))
				throw { message: 'Course Outcome is required', code: 400 };

			if (!topicsTagged)
				throw {
					message: 'Course needs to be linked with a tag',
					code: 400,
				};
			let author = req.session.user;
			const data = await courses.createCourse(
				xss(title),
				body,
				xss(description),
				xss(req.session.user),
				xss(topicsTagged),
				courseOutcome,
				fileName
			);
			console.log('here after', data);
			if (!data)
				throw {
					message: 'Error in creating the new course',
					code: 500,
				};
			return res.status(200).json({ data: data });
		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.status(err.code || 500).json({ error: err?.message || err });
	}
});
router.put('/:id/enroll', decodeIDToken, async (req, res) => {
	console.log(chalk.blue('enrolling'));
	try {
		let courseId = req.params.id;
		let email = req.session.user;

		console.log('here');
		// return res.sendStatus(200).json({ data: 1 });
		const data = await courses.enrollToCourse(xss(email), xss(courseId));
		console.log('here after', data);
		if (!data)
			throw {
				message:
					'Error while enrolling you into the course, please try again',
				code: 500,
			};
		return res.status(200).json({ data: data });
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.status(err.code || 400).json({ error: err?.message || err });
	}
});
router.put('/:id/unregister', decodeIDToken, async (req, res) => {
	try {
		let courseId = req.params.id;
		let email = req.session.user;
		if (!email) {
			throw { message: 'User not logged in', code: 403 };
		} else {
			const data = await courses.unregisterCourse(
				xss(email),
				xss(courseId)
			);
			if (!data)
				throw {
					message:
						'Error while unregistering the course, please try again',
					code: 500,
				};
			if (!data)
				throw {
					message: 'Error in creating the new course',
					code: 500,
				};
			return res.status(200).json({ data: data });
		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.status(err?.code || 500).json({ error: err.message || err });
	}
});
router.get('/:id', decodeIDToken, async (req, res) => {
	try {
		try {
			isValidObjectId(req.params.id);
		} catch (error) {
			res.status(error?.code || 400).send(error?.message ?? error);
			return;
		}
		try {
			const course = await courses.getCourseById(
				xss(req.params.id.toString())
			);
			if (!course) {
				throw { message: 'Invalid course Id', code: 403 };
			}
			return res.status(200).json(course);
		} catch (error) {
			return res.status(error?.code || 500).send(error?.message ?? error);
		}
	} catch (err) {}
});

router.delete('/:id', decodeIDToken, async (req, res) => {
	try {
		let courseId = req.params.id;
		let email = req.session.user;
		if (!email) {
			throw 'User not logged in';
		} else {
			const data = await courses.deleteCourse(xss(email), xss(courseId));
			if (!data)
				throw {
					message:
						'Error while deleting the course, please try again',
					code: 500,
				};
			return res.status(200).json({ data: data });
		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res
			.status(error.code || 400)
			.json({ error: err?.message || err });
	}
});

router.get('/user/enrolled/:id', decodeIDToken, async (req, res) => {
	try {
		isValidObjectId(req.params.id);
		console.log('testing');
		const course = await courses.getCourseByIdPerUser(
			req.params.id.toString(),
			req.session.user
		);
		console.log('course', course);
		if (!course) {
			throw { message: 'Invalid course Id', code: 403 };
		}
		return res.status(200).json(course);
	} catch (err) {
		console.log('err', err);
		return res
			.status(err?.code || 500)
			.json({ error: err?.message || err });
	}
});
router.post('/bannerUpload', async (req, res) => {
	try {
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err);
			} else if (err) {
				return res.status(500).json(err);
			} else if (req.file.size > 1024 * 1024 * 10)
				return res
					.status(403)
					.json({ message: 'File size is too large' });
			var options = {
				root: path.join(__dirname),
			};
			return res.status(200).send(req.file);
		});
	} catch (err) {
		console.log('err', err);
		return res.status(err?.status || 500).json(err);
	}
});
module.exports = router;
