const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const courses = require('../data/courses');
const users = require('../data/users');
const { isValidObjectId } = require('../utils/utils');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: '.././hashbing/src/public/upload/',
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 3,
	},
}).single('photo');

router.get('/test', async (req, res) => {
	return res.json({ test: 'test' });
});

router.post('/uploadPic', function (req, res) {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		console.log('req', req.file);
		return res.status(200).send(req.file);
	});
});

router.post('/newcourse', async (req, res) => {
	try {
		let { title, body, author, topicsTagged } = req.body;
		if (!title || !body || !author || !topicsTagged) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			console.log('here');
			// return res.sendStatus(200).json({ data: 1 });
			const data = await courses.createCourse(
				title,
				body,
				author,
				topicsTagged
			);
			console.log('here after', data);
			if (!data) throw 'Error in creating the new course';
			return res.status(200).json({ data: data });
		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.json({ error: err });
	}
});
router.put('/:id/enroll', async (req, res) => {
	try {
		let courseId = req.params.id;
		let { email } = req.body;
		if (!email) {
			return res.sendStatus(400).send('User not logged in');
		} else {
			console.log('here');
			// return res.sendStatus(200).json({ data: 1 });
			const data = await courses.enrollToCourse(email, courseId);
			console.log('here after', data);
			if (!data) throw 'Error in creating the new course';
			return res.status(200).json({ data: data });
		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.json({ error: err });
	}
});
router.get('/:id', async (req, res) => {
	try {
		try {
			isValidObjectId(req.params.id);
		} catch (error) {
			res.status(400).send(error?.message ?? error);
			return;
		}
		try {
			const course = await courses.getCourseById(
				req.params.id.toString()
			);
			if (!course) {
				throw 'Invalid course Id';
			}
			return res.status(200).json(course);
		} catch (error) {
			return res.status(500).send(error?.message ?? error);
		}
	} catch (err) {}
});
module.exports = router;
