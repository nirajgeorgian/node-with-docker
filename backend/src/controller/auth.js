import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config";

export const signup = async (req, res, next) => {
  passport.authenticate("signup", (err, user, info) => {
    if (err) {
      return res
        .status(409)
        .send({ status: false, message: err.message || "signup error" });
    }
    if (user) {
      return res.json({ status: true, user });
    }
  })(req, res, next);
};

export const signin = async (req, res, next) => {
  passport.authenticate("signin", (err, user, info) => {
    if (err) {
      return res
        .status(409)
        .send({ status: false, message: err.message || "signin error" });
    }
    if (user) {
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res
            .status(409)
            .send({ status: false, message: err.message || "signin error" });
        }

        const payload = {
          id: user.id,
          username: user.username,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        return res.json({ status: true, token });
      });
    }
  })(req, res, next);
};

export const me = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(409)
        .send({ status: false, message: err.message || "signin error" });
    }
    if (user) {
      res.status(200).send({
        status: true,
        metadata: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          aadharNo: user.aadharNo,
        },
      });
    }
  })(req, res, next);
};
