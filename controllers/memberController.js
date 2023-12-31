// memberController.js
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const DoctorSession = require('../models/doctorSessionModel');

exports.getDashboard = async (req, res) => {
    try {
        // Fetch user details
        const user = await User.findById(req.user._id);
        // Fetch all courses
        const courses = await Course.find();
        // Fetch all sessions for the logged-in member
        const sessions = await DoctorSession.find({ memberId: req.user._id });

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
        const courses = await Course.find({ range: { $gte: totalRange - 10, $lte: totalRange + 10 } });

        // Render a new page with the available courses and their range
        res.render('pages/courses', { user:req.user,courses, totalRange });
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

    return totalRange;
}
