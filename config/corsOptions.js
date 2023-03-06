const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback)=>{
        if (allowedOrigins.indexOf(origin)!==-1|| !origin){
            callback(null, true)
        } else{
            callback(null, true)
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
// added callback for global pages
module.exports = corsOptions;
