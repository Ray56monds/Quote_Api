import { StatusCodes } from "http-status-codes";

function isAdmin(req, res, next) {
    console.log(req.user.role);
    if(req.user.role === "ADMIN") {
        next();
}else
{
    return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorized"});
}
}

function isUser(req, res, next) {
    console.log(req.user.role);
    if(req.user.role === "USER") {
        next();
}else
{
    return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorized"});
}
}

export { isAdmin, isUser};

