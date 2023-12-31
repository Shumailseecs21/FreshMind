const express=require("express");
const doctorController=require("../controllers/doctorController");

const router =express.Router();

router.get("/dashboard",doctorController.getDashboard);

router.get("/sessions");

router.post("/sessions/:sessionId");

router.post("/certifications");

module.exports = router;