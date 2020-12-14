import express from "express";
import { userList, singleUser } from "../controller/user";

export const userRoutes = () => {
  const router = express.Router();

  router.get("/", userList);
  router.get("/:id", singleUser);

  return router;
};
