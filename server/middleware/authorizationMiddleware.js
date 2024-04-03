const authorizeUser = (req, res, next, bodyField, userField) => {
    const data = req.body[bodyField];
    if (req.user[userField] !== data[bodyField]) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};

export { authorizeUser};
