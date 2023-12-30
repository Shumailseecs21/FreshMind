const express=require("express");
const indexController=require("../controllers/indexController");

const router =express.Router();

router.get("/",indexController.getIndex);

router.get("/onlineresorces",indexController.getOnlineRes);

router.get("/quiz",indexController.getQuiz);

router.get("/courses",indexController.getCourses);

router.get("/book_session",indexController.getBookSession);

router.get("/contact",indexController.getContact);

router.get("/feedback",indexController.getFeedback);

router.post("/feedback",indexController.postFeedback);

module.exports = router;





/*
update method is put
get
post adding in database

flow of app**
app
engine set
extended body parser
picture storage
static folder
session create
csrf
flash messages
setting variables for authentication
storing user in the request
register all routes
mongoose
listen


admin**
no signup should be technically but here for simple operation
login post
adminid/dashboard/ get all the sections can change /course add delete /quiz add delete /courses add or delete update /course content update or delete /session update or delete
/doctor add or delete post
/member add or delete


doctor**
signup post
login post
/dashboard only the session section there update the certification form post (new page get then update)
/dashboard session update


member**
signup post
login as member he can see all the sections post
take the quiz then manipulation and take to the courses /quiz get and post
(/quiz after post show the results then redirection if possible)
memberid/courses get the list all
memberid/course/content get
memberid/courses/content post if checklist
memberid/booksession get
memberid/booksession/specificdoctor get
memberid/booksession/specificdoctor post
add or delete session


others**
dashboard home get
contact
feedback post
online resources only reading content available

all other redirect -> login

*/