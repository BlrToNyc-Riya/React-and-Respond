const { ObjectID } = require('bson');
const mongoCollections = require('../config/mongoCollection');
const courses = mongoCollections.courses;
const userData = require("./users")
module.exports = {
    async createCourse(title,body,author,topicsTagged){
        // errorCheckingCourse(title,body,author);
        const id = ObjectID(author);
        const user = await userData.getUserById(id);
        console.log(user);
        if(!user)
            throw "Author not found";
        
        const courseCollection = await courses();
        const course = {
            title,
            body,
            author: id,
            topicsTagged,
            metaData:{timeStamp:new Date().getTime(),published:false}
        }

        const newCourseInfo = await courseCollection.insertOne(course);
	    if (newCourseInfo.insertedCount === 0) throw 'Insert failed!';
        console.log(newCourseInfo);
	    return "Insertion successful";
	    // user.courseAuthored.push(postId);
    },
     async getCourseById(id){
         if(!id || typeof id != 'string')
            throw "Invalid id passed"
        const courseId = ObjectID(id);
        const courseCollection = await courses();
        const course = await courseCollection.findOne({_id:courseId});
        if(!course)
            throw "No course found with this id";
        return course;
     }

}
