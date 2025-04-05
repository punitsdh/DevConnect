const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        console.log("Admin Not Authorized");
        res.status(401).send("Access Denied");
    }
    else{
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "xyzabc";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        console.log("Admin Not Authorized");
        res.status(401).send("Access Denied");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}