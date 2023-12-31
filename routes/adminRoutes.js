const express=require("express");
const adminController=require("../controllers/adminController");

const router =express.Router();

router.get("/dashboard",adminController.getDashboard);

router.get("/courses");

router.get("/courses/:courseId");

router.post("/courses/:courseId");

router.get("/sessions");

router.get("/sessions/:sessionId");

router.post("/sessions/:sessionId");

router.get("/members");

router.get("/members/:memberId");

router.post("/members/:memberId");

module.exports = router;