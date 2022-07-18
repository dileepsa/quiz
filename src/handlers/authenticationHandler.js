const authenticationHandler = (req, res, next) => {
  if (req.session.isPopulated) {
    next();
    return;
  }
  res.redirect('/');
  return;
};

module.exports = { authenticationHandler };
