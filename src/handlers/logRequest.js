const logRequest = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
exports.logRequest = logRequest;
