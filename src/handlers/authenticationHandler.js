const authenticationHandler = (req, res, next) => {
  console.log('req session in auth', req.session);
  if (!req.session) {
    res.statusCode = 302;
    res.setHeader('Location', '/contest.html');
    res.end();
    return;
  }
  next();
};

module.exports = { authenticationHandler };
