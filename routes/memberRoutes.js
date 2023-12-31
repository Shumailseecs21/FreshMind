const express=require("express");
const memberController=require("../controllers/memberController");

const router =express.Router();

router.get("/dashboard",memberController.getDashboard);

router.get("/book_session");

router.get("/book_session/:doctorId");

router.post("/book_session/:doctorId");

router.get("/courses");

router.get("/courses/:courseId");

router.get("/quiz",memberController.getQuiz);

router.post("/quiz",memberController.postQuiz);

module.exports = router;