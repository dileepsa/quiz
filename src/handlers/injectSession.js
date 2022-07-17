const injectSession = (sessions) => {
  return (req, res, next) => {
    if (!req.cookies.id) {
      next();
      return;
    }
    const { id } = req.cookies;
    console.log('sessions', sessions);
    const session = sessions[id];
    req.session = session;
    next();
  };
}

module.exports = { injectSession };
