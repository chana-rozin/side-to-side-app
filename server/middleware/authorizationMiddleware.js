const authorizeUser = (data, user,res, next, dataField, userField) => {
    console.log(user);
    console.log("start autorizeUser", user[userField],data[dataField])
    if (user[userField] !== data[dataField]) {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("pass autorizeUser")
    next();
};

export { authorizeUser};
