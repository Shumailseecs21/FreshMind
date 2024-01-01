const express=require("express");
const adminController=require("../controllers/adminController");

const router =express.Router();

router.get("/dashboard",adminController.getDashboard);

router.get("/courses",adminController.getCourses);

router.post("/courses/",adminController.postCourses);

router.get("/courses/:courseId",adminController.getCourseContent);

router.post("/courses/:courseId",adminController.postCourseContent);

router.get("/sessions");

router.get("/sessions/:sessionId");

router.post("/sessions/:sessionId");

router.get("/members");

router.get("/members/:memberId");

router.post("/members/:memberId");

module.exports = router;