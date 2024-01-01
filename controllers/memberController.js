// memberController.js


const User = require('../models/userModel');
const Course = require('../models/courseModel');
const DoctorSession = require('../models/doctorSessionModel');

exports.getDashboard = async (req, res) => {
    try {
        // Fetch user details
        const user = await User.findById(req.user._id).populate("courses");
        // Fetch all courses
        const courses = await Course.find();
        // Fetch all sessions for the logged-in member
        const sessions=await DoctorSession.find().populate("doctorId");
        console.log(sessions);

        res.render('pages/dashboard', { user, courses, sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getQuiz = async (req, res) => {
    // Implement the logic to book a session for a member
    res.render("pages/self_assessment",{user:req.user});
};


exports.postQuiz = async (req, res, next) => {
    const { question1, question2, question3, question4, question5, question6, question7 } = req.body;

    // Calculate the total range based on user's answers
    const totalRange = calculateTotalRange(question1, question2, question3, question4, question5, question6, question7);

    try {
        // Fetch courses based on the calculated range
        console.log(totalRange);
        const courses = await Course.find({ range: { $gte: totalRange - 10, $lte: totalRange + 10 } });

        // Render a new page with the available courses and their range
        res.render('pages/courses', { user:req.user,courses, totalRange ,selected:false});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Helper function to calculate the total range
function calculateTotalRange(q1, q2, q3, q4, q5, q6, q7) {
    // Convert answer values to numeric values (e.g., 'not-at-all' becomes 0)
    const answerValues = {
        'not-at-all': 0,
        'sometimes': 1,
        'often': 2,
        'always': 3,
    };

    // Sum up the values of all answers
    const total = answerValues[q1] + answerValues[q2] + answerValues[q3] + answerValues[q4] + answerValues[q5] + answerValues[q6] + answerValues[q7];

    // Calculate the average range
    const averageRange = total / 7;

    // Convert the average range to an integer
    const totalRange = Math.round(averageRange);

    return totalRange*10;
}

exports.getSessions=async (req,res)=>{
    try {
        // Fetch courses based on the calculated range
        const sessions = await DoctorSession.find();

        // Render a new page with the available courses and their range
        res.render('pages/book_session', { user:req.user,sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


exports.postSession=async(req,res)=>{
    try {
        // Ensure the user is authenticated

            // Extract session data from the request
            const { doctorId } = req.params; // Assuming doctorId is in the route parameters
            const { sessionId } = req.body;

            // Find the session by ID
            const session = await DoctorSession.findById(sessionId);

            // Check if the session exists
            if (!session) {
                return res.status(404).send('Session not found');
            }

            // Add the session to the member's docSessions array
            req.user.docSessions.push(sessionId);

            // Save the updated user data
            await req.user.save();
            // Fetch user details
            const user = await User.findById(req.user._id);
            let doctorSessions=user.docSessions;
            let sessions=[];
            doctorSessions.forEach(doctorSession=>{
                DoctorSession.find({doctorId:doctorSession})
                    .then(doc=>{
                        sessions.push(doc);
                    })
            });
            // Fetch all courses
            const courses = await Course.find();
            // Fetch all sessions for the logged-in member
            // const sessions = await DoctorSession.find({ doctorId: user.doctorId });
            // Redirect or send a response as needed
            res.render('pages/dashboard',{user:user,courses,sessions}); // Redirect to the member's dashboard after successful submission
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getCourses=async(req,res)=>{
    try {
        const courses=await Course.find();

        res.render("pages/courses",{user:req.user,courses,selected:true});
    }catch (error){
        res.status(500).send('Internal Server Error');
    }
}
exports.getCoursesContent=async(req,res)=>{
    try {
        const course=await Course.findOne({_id:req.params.courseId}).populate("courseContent");
        console.log(course.courseContent);
        res.render("pages/courseContent",{user:req.user,course,courseContent:course.courseContent});
    }catch (error){
        res.status(500).send('Internal Server Error');
    }
}

exports.postCourses=async(req,res)=>{
    const { courseId } =req.params;
    try{
        const user=await User.find({_id:req.user});
        req.user.courses.push(courseId);

        // Save the updated user data

        await req.user.save();
        console.log(req.user);
        const getUser=await User.findById(req.user._id).populate('courses')
        // Populate the 'courses' field with actual Course objects
        console.log(getUser.courses);
        try {
            // Fetch user details
            const user = await User.findById(req.user._id).populate("courses");
            // Fetch all courses
            const courses = await Course.find();
            // Fetch all sessions for the logged-in member
            const sessions=await DoctorSession.find().populate("doctorId");
            console.log(sessions);

            res.render('pages/dashboard', { user, courses, sessions });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
        // res.render("pages/courses",{user:req.user,courses:getUser.courses,selected:true})
    }catch (error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }


}