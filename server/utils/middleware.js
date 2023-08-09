const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
}

const authenticateToken = (request, response, next) => {
    const token = request.header("Authorization");

    console.log(!token);
    if (!token) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        const user = User.findById(decoded.id);

        if (!user) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        request.user = user;
        next();
    } catch (error) {
        return response.status(401).json({ error: "Unauthorized" });
    }
};  

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  "JsonWebTokenError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  authenticateToken,
  unknownEndpoint,
  errorHandler
}