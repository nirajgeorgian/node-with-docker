import express from "express";
import { signup, signin, me } from "../controller/auth";
import User from "../models/user";

export const authRoutes = () => {
  const router = express.Router();

  router.post("/signup", signup);
  router.post("/signin", signin);
  router.get("/me", me);

  return router;
};
