const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
}

const authenticateToken = (request, response, next) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split("")[1];
  
    if (token == null) {
      return response.sendStatus(401);
    }
  
    jwt.verify(token, process.env.SECRET, (error, user) => {
      if (error) {
        return response.sendStatus(403);
      }
      request.user = user;
      next();
    });
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