function allCapsPOST(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

function allCapsPUT(req, res, next) {
  req.body.changes.name = req.body.changes.name.toUpperCase();
  next();
}

module.exports = { allCapsPOST, allCapsPUT };
