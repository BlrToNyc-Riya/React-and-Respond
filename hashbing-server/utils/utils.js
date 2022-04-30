const { ObjectId } = require('mongodb');

exports.isValidString = (value, paramName, minLength) => {
	value = value.trim();
	if (value === null || value === undefined) {
		throw {
			message: `${paramName || 'value'} is null/undefined`,
			status: 400,
		};
	}
	if (typeof value !== 'string') {
		throw {
			message: `${paramName || 'value'} is not a string`,
			status: 400,
		};
	}
	if (minLength) {
		if (value.length < minLength) {
			throw {
				message: `${
					paramName || 'value'
				} cannot be less than ${minLength}`,
				status: 400,
			};
		}
	}
};

exports.isValidBlogTitle = (blogTitle) => {
	if (!blogTitle) throw { message: 'Blog title is not provided', code: 400 };
	this.isValidString(blogTitle, 'blogTitle', 3);
};

exports.isValidBlogBody = (body) => {
	if (!body) throw 'Blog body is not provided';
	this.isValidString(body, 'body', 3);
};

exports.isValidUsername = (username) => {
	let userNameregex = /^(?=.{3})[a-z][a-z\d]*_?[a-z\d]+$/i;
	if (!userNameregex.test(username)) {
		throw {
			message:
				'Username is not valid, only alphanumeric and underscore allowed and at least 3 characters and start with letter',
			code: 400,
		};
	}
};

exports.isValidNumber = (number, paramName) => {
	if (number === null || number === undefined) {
		throw {
			message: `${paramName || 'number'} is null/undefined`,
			code: 400,
		};
	}

	if (isNaN(number) || isNaN(Number(number))) {
		throw {
			message: `${paramName || 'number'} is not a number`,
			code: 400,
		};
	}

	if (typeof Number(number) !== 'number') {
		throw {
			message: `${paramName || 'number'} is not a number`,
			code: 400,
		};
	}
};

exports.isValidPassword = (password) => {
	let passwordRegex = /^[A-Za-z0-9!:',.@#$%^&*()_-]{6,}$/;
	if (!passwordRegex.test(password)) {
		throw { message: `Password is not valid ${password}`, code: 400 };
	}
};

exports.isValidObject = (object, paramName) => {
	if (object === null || object === undefined) {
		throw {
			message: `${paramName || 'object'} is null/undefined`,
			status: 400,
		};
	}
	if (Array.isArray(object)) {
		throw {
			message: `${paramName || 'object'} is not an array`,
			status: 400,
		};
	}
	if (typeof object !== 'object') {
		throw {
			message: `${paramName || 'object'} is not an object`,
			status: 400,
		};
	}
	return true;
};

exports.isValidAuthor = (author) => {
	this.isValidObject(author, 'author');
	const { username, _id } = author;
	const keys = Object.keys(author);
	if (
		keys.length !== 2 ||
		keys.indexOf('username') === -1 ||
		keys.indexOf('_id') === -1
	) {
		throw {
			message: `author object is not valid`,
			status: 400,
		};
	}
	this.isValidString(username, 'author.username');
	this.isValidObjectId(_id.toString(), 'author._id');
};

exports.isValidObjectId = (objectId, paramName) => {
	if (objectId === null || objectId === undefined) {
		throw {
			message: `${paramName || 'objectId'} is null/undefined`,
			status: 400,
		};
	}

	if (!ObjectId.isValid(objectId)) {
		throw {
			message: `${paramName || 'objectId'} is not valid`,
			status: 400,
		};
	}
};
exports.handleUserInfo = userInfo => {
	const props = ['firstname', 'lastname', 'userName', 'profilePic', 'bio', 'role', 'coursesEnrolled', 'courseAuthored', 'phoneNumber'];
	return props.reduce((pre, cur) => {
		pre[cur] = userInfo[cur];
		return pre;
	}, {});
};
exports.saltRounds = 12;
