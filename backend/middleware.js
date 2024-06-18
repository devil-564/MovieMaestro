const jwt = require("jsonwebtoken");
const JWT_SEC_KEY = "MOVIE_TICKET_MANAGEMENT_WEBAPPLICATION_111223";

const middleware = async (req, res, next) => {

    const token = req.header('auth-token')

    try {
        if(!token)
            throw new Error("Please check the credentials");

        const data = jwt.verify(token, JWT_SEC_KEY);
        req.ticket = data.isCustomer
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = middleware