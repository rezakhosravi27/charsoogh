const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(400).json({
        status: "unSuccess",
        message: "token not exist",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userExist = await usersModel.findById(decoded._id);
    if (!userExist) {
      return res.status(404).json({
        status: "unSuccess",
        message: "token not exist or user deleted",
      });
    }

    req.user = userExist;
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }

  next();
};
