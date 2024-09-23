const errorHandeler = (err, req, res, _)=>{
    let statusCode = 500;
    
    if(!err.statusCode && (err.name=='ValidationError' || err.name=='CastError')) statusCode = 400

    return res
    .status(err.statusCode || statusCode)
    .json({
        statusCode : err.statusCode || statusCode,
        message: err.message,
        stack: err.stack,
        success : false
    });
}

export default errorHandeler