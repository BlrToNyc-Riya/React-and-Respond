const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const courses = require('../data/courses');
const users = require('../data/users');
const { isValidObjectId } = require('../utils/utils');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: '.././hashbing/src/Components/Editor/hooks/',
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

router.get('/',async (req, res) => {
	try{
		const allCourses = await courses.getAllCourses();
		if(!allCourses)
			throw "error in fetching the courses";
		 res.json({courses:allCourses});

	}catch(e){
		res.status(400).send(e?.message ?? e);
	}
});
router.get('/Authored',async(req,res)=>{
	console.log('here');
        try {
			
            const email = req.session.userid;
			if(!email)
				throw "could not fetch authored courses, please login";
			const data = await courses.getAllAuthoredCourses(email);
			if(!data)
				throw "No Authored courses found";
			res.json({Authored:data});
        } catch (error) {
            res.status(400).send(error?.message ?? error);
            return;
		}
});
router.get('/Enrolled',async(req,res)=>{
	console.log('here');
        try {
			
            const email = req.session.userid;
			if(!email)
				throw "could not fetch enrolled courses, please login";
			const data = await courses.getAllEnrolledCourses(email);
			if(!data)
				throw "No Enrolled courses found";
			res.json({Enrolled:data});
        } catch (error) {
            res.status(400).send(error?.message ?? error);
            return;
		}
});
router.post('/uploadPic', function (req, res) {
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
router.post('/newcourse', async (req, res) => {
	try {
        if(!req.session.userid)
            throw "You need to signin to be able to create courses"
		let { title,body,description,topicsTagged, courseOutcome1,courseOutcome2,courseOutcome3,courseOutcome4 } = req.body;
		if (!title || !body ) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			console.log('here');
            if (!courseOutcome1)
                courseOutcome1 = "";
            if (!courseOutcome2)
                courseOutcome2 = "";
            if (!courseOutcome3)
                courseOutcome3 = "";
            if (!courseOutcome4)
                courseOutcome4 = "";
            if(!topicsTagged)
                topicsTagged = "";        
			// return res.sendStatus(200).json({ data: 1 });
            let author = req.session.userid;
			const data = await courses.createCourse(title,body,description,author, topicsTagged, courseOutcome1,courseOutcome2,courseOutcome3,courseOutcome4);
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
		let  email  = req.session.userid;
		if (!email) {
			return res.sendStatus(400).send('User not logged in');
		} else {
			console.log('here');
			// return res.sendStatus(200).json({ data: 1 });
			const data = await courses.enrollToCourse(email, courseId);
			console.log('here after', data);
            if(!data)
                throw "Error while enrolling you into the course, please try again";
			return res.status(200).json({ data: data });

		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.json({ error: err });
	}
});
router.put('/:id/unregister', async (req, res) => {
	try {
        let courseId = req.params.id;
		let  email  = req.session.userid;
		if (!email) {
			return res.sendStatus(400).send('User not logged in');
		} else {
			console.log('here');
			// return res.sendStatus(200).json({ data: 1 });
			const data = await courses.unregisterCourse(email,courseId);
			console.log('here after', data);
            if(!data)
                throw "Error while unregistering the course, please try again";
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
