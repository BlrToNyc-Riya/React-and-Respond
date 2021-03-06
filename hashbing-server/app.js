const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const constructorMethod = require('./routeConstructor');
const configRoutes = require('./routes');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));

// var multer = require('multer');
// var upload = multer({dest:'uploads/'});

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '../hashbing/src/public/uploads');
//      },
//     filename: function (req, file, cb) {
//         cb(null , file.originalname);
//     }
// });
// var upload = multer({ storage: storage })
// app.post('/upload', upload.single('profile'), (req, res, error) => {
//   try {
//     console.log(req.file);
//     res.send(req.file);
//   }catch(err) {
//     res.send(400);
//   }
// });

app.use('/', (req, res, next) => {
	console.log('request', req.body, 'Req URL', req.url);
	req.url = req.url.trim();
	next();
});

app.use(
	session({
		name: 'AuthCookie',
		secret: 'some secret string!',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: true
		}
	})
);
// constructorMethod(app);
configRoutes(app);

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
