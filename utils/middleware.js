import { StatusCodes } from "http-status-codes";

function isAdmin(req, res, next) {
    if(res.tokenData.author_role !== "ADMIN")
    return res
    .status(StatusCodes.FORBIDDEN)
    .json({message: "Access Denied, Please Contact Your System Administrator"});
    next();
}

function isUser(req, res, next) {
    if(res.tokenData.author_role !== "USER")
    return res
    .status(StatusCodes.FORBIDDEN)
    .json({message: "Access Denied, Not a system user"});
    next();
}

function isUserORAdmin(req, res, next){
    const role = res.tokenData.author_role;
    if(role !=="USER" && role !=="ADMIN"){
        return res
        .status(StatusCodes.FORBIDDEN)
        .json({message: "Access Denied, Not a system user or administrator"});
    }  
    next(); 
}

export { isAdmin, isUser, isUserORAdmin };