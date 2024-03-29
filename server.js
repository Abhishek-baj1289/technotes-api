require('dotenv').config()
const express= require("express");
const app =  express();
const PORT = process.env.PORT || 3500 ;
const path  = require('path');
const { logger } = require('./middleware/logger.js')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const {logEvents} = require('./middleware/logger')
const corsOptions = require('./config/corsOptions')

//
//Uername : home password: Abcd@123



console.log(process.env.NODE_ENV);

connectDB()
app.use(cors(corsOptions))

app.use(logger)

app.use(express.json())  //inbuilt middleware to parse the json

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname,'/public')));   //express.static is the middleware and its telling the server from where to grab the public fuiles

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views','404.html'))
    } else if(req.accepts('json')){
        res.json({message: '404 not found'})
    }
    else{
        res.type('txt').send('404 not found')
    }
})


app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log('Connected to mongo DB');
    app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));

})
mongoose.connection.on('error', err=>{
    console.log(err);   
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log')
})
