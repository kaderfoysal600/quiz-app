const { constants } = require("../constant");

const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode ? res.statusCode : 500;
  const error = err.message ? err.message : "Error Not Assigned in error handler";

  if (statusCode === constants.VALIDATION_ERROR) {
    res.json({
      title: "Validation Failed",
      message: err.message,
      stackTrace: err.stack,
    });
  } else if (statusCode === constants.NOT_FOUND) {
    res.json({
      title: "Not Found",
      message: err.message,
      stackTrace: err.stack,
    });
  } else if (statusCode === constants.UNAUTHORIZED) {
    res.json({
      title: "Unauthorized",
      message: err.message,
      stackTrace: err.stack,
    });
  } else if (statusCode === constants.FORBIDDEN) {
    res.json({
      title: "Forbidden",
      message: err.message,
      stackTrace: err.stack,
    });
  } else if (statusCode === constants.SERVER_ERROR) {
    res.json({
      title: "Server Error",
      message: err.message,
      stackTrace: err.stack,
    });
  } else if (error === constants.CAST_ERROR) {
    res.json({
      title: "Error",
      message: err.message,
      stackTrace: err.stack,
    });
  } else {
    res.json({
      title: "Unknown Error",
      message: "An unknown error occurred.",
      stackTrace: err.stack,
    });
  }
};

module.exports = errorHandler;

