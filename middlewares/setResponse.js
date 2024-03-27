const setResponseObject = (req, res, next) => {
  (req).responseObject = res;
  next();
};

module.exports = setResponseObject;