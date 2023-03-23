import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/registration", (req: Request, res: Response, next: NextFunction) => {
	res.send("Hello world!");
});
router.post("/login");

export default router;
