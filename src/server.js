import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/allRoutes';
import passport from "passport";
import path from 'path';

//set up environment variables
// require('dotenv').config()
// the above is now being handled in the command-line when running dev

const app = express();
const PORT = process.env.PORT || 5000
const mongo_url = process.env.MONGODB_URL

//mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(res => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cors());

//passport middleware setup
app.use(passport.initialize());
require('./helpers/passport')(passport);

routes(app);

app.get('/api', (req, res) => {
    res.send('It works!');
});

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});