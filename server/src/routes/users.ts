import { Router } from "express";

const router = Router();

router.get("/", async (_req, res) => {
  res.json({"message": "Users Route HERE"});
});

export default router;