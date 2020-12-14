import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { User } from "../models";
import config from "../config";

/**
 * jwt passport options
 */
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = config.jwtSecret;
passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (user === null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  })
);

/**
 * local-strategy passport options
 */
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, username, password, done) => {
      try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser !== null) {
          return done(null, false, { message: "User already exist" });
        }

        const user = await User.create({
          username,
          password,
          aadharNo: uuidv4(),
          ...req.body.details,
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/**
 * local-strategy passport options
 */
passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);
