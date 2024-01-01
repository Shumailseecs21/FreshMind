const express=require("express");
const memberController=require("../controllers/memberController");

const router =express.Router();

router.get("/dashboard",memberController.getDashboard);

router.get("/sessions",memberController.getSessions);

router.post("/sessions/:doctorId",memberController.postSession);

router.get("/courses",memberController.getCourses);

router.get("/courses/:courseId",memberController.getCoursesContent);

router.post("/courses/:courseId",memberController.postCourses);

router.get("/quiz",memberController.getQuiz);

router.post("/quiz",memberController.postQuiz);

module.exports = router;