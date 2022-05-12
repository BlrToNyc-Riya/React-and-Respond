const admin = require('firebase-admin');
const serviceAccount = require('../config/e-learning-2dcea-firebase-adminsdk-sb5rd-871f977143.json');
const chalk = require('chalk');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	// databaseURL: 'https://e-learning-2dcea.firebaseapp.com.firebaseio.com',
});
async function decodeIDToken(req, res, next) {
	if (req.session.user) {
		console.log('here');
		next();
	} else {
		const header = req.headers?.authorization;
		console.log(
			'here in else block',
			header !== 'Bearer null' &&
				req.headers?.authorization?.startsWith('Bearer ')
		);
		if (
			header !== 'Bearer null' &&
			req.headers?.authorization?.startsWith('Bearer ')
		) {
			const idToken = req.headers.authorization.split('Bearer ')[1];
			try {
				const decodedToken = await admin.auth().verifyIdToken(idToken);
				console.log('decodedToken', chalk.blue(decodedToken));
				req.session.user = decodedToken;
				console.log(chalk.green('decodedToken'), req.session.user);
				next();
			} catch (err) {
				console.log(err);
				return res.json({ error: 'Unauthorized user' });
				// next();
			}
		}
		// next();
	}
	// return next();
}
module.exports = decodeIDToken;
