const express=require("express");
const doctorController=require("../controllers/doctorController");
const {getSession, postSession} = require("../controllers/doctorController");

const router =express.Router();

router.get("/dashboard",doctorController.getDashboard);

router.get("/sessions",doctorController.getSession);

router.post("/sessions",doctorController.postSession);


module.exports = router;