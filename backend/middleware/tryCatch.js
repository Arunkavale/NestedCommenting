const handleError = require('./error');

/* this middleware will take function as parameter and handle it in side try catch */
function tryCatch(handler){
    return async (req,res,next)=>{
        try{
            await handler(req,res);
        }catch(ex){
            handleError(ex ,res); // if exception then calling  handleError middleware
        }
    }
}

module.exports = tryCatch ;