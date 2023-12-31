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

exports.bookSession = async (req, res) => {
    // Implement the logic to book a session for a member
    res.send('Book a session functionality for member');
};


