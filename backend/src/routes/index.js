import express from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";

function getRoutes() {
  const router = express.Router();

  router.use("/user", userRoutes());
  router.use("/auth", authRoutes());

  return router;
}

export { getRoutes };
