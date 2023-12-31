function logErrors (error,req,res,next){
    console.error(error.stack)
    next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error,req,res,next){
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
}

function boomErrorHandler(error,req,res,next){
    if (error.isBoom) {
        const { output } = error;
        res.status(output.statusCode).json(output.payload);
    }else{
        next(error);
    }
}

module.exports = [logErrors, boomErrorHandler, errorHandler];