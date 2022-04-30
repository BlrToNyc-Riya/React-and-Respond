const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const courses = require('../data/courses');
const { isValidObjectId } = require('../utils/utils');

router.get('/test', async (req, res) => {
	return res.json({ test: 'test' });
});

router.post('/newcourse', async (req, res) => {
	try {
		let { title,body,author,topicsTagged } = req.body;
		if (!title || !body || !author || !topicsTagged) {
			return res.sendStatus(400).send('Missing required fields');
		} else {
			console.log('here');
			// return res.sendStatus(200).json({ data: 1 });
			const data = await courses.createCourse(title,body,author,topicsTagged);
			console.log('here after', data);
			return res.status(200).json({ data: data });

		}
	} catch (err) {
		console.log('err>>>>>>>>>>>>>>>>>>>>>>', err);
		return res.json({ error: err });
	}
});

router.get('/:id',async(req,res)=>{
    try{
        try {
            isValidObjectId(req.params.id);
        } catch (error) {
            res.status(400).send(error?.message ?? error);
            return;
        }
        try {
            const course = await courses.getCourseById(req.params.id.toString());
            if(!course){
                throw "Invalid course Id";
            }
            return res.status(200).json(course);
        } catch (error) {
            return res.status(500).send(error?.message ?? error);
        }
    }
    catch(err) {

    }
});
module.exports = router;