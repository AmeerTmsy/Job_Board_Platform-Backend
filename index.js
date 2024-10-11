require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser')
const port = 3000;
const connectDB = require('./config/db');
connectDB();

const userRoute = require('./routes/userRoute');
const employerRoute = require('./routes/employerRoute');
const jobRout = require('./routes/jobRoute');
const applicationRoute = require('./routes/applicationRoute');
const userAuthRoute = require('./routes/userAuthRoute');
const employerAuthRoute = require('./routes/employerAuthRoute');
const companyRoute = require('./routes/companyRoute');
const saveJobRoute = require('./routes/saveJobRoute');

app.use(cors({origin:true, credentials: true}))
app.use(cookieParser())
app.use(express.json())

app.use('/users', userRoute);
app.use('/employers', employerRoute);
app.use('/jobs', jobRout);
app.use('/applications', applicationRoute);
app.use('/user/auth', userAuthRoute);
app.use('/employer/auth', employerAuthRoute);
app.use('/companies', companyRoute);
app.use('/saveJob', saveJobRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})  
