import { Router } from "express";

import searchRouter from "./search";

// Init
const router = Router();

// Public routes will be accessible without authentication by everyone
router.use("/api/public/search", searchRouter);

router.get("/", (req, res) => {
  return res.status(200).send("This is a backend of OpenSOM. Where the magic happens.");
});

// Export default
export default router;
