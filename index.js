require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser')
const port = 3000;
const connectDB = require('./config/db');
connectDB();
const userRoute = require('./routes/userRoute');
const jobRout = require('./routes/jobRoute');
const applicationRoute = require('./routes/applicationRoute');
const authRoute = require('./routes/authRoute');
const saveJobRoute = require('./routes/saveJobRoute');

app.use(cors({origin:true, credentials: true}))
app.use(cookieParser())
app.use(express.json())



app.use('/users', userRoute);
app.use('/jobs', jobRout);
app.use('/applications', applicationRoute);
app.use('/login', authRoute);
app.use('/saveJob', saveJobRoute);

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`);
})  