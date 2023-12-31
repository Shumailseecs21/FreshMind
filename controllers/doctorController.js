// doctorController.js
const DoctorSession = require('../models/doctorSessionModel');

exports.doctorDashboard = async (req, res) => {
    try {
        // Fetch all sessions for the logged-in doctor
        const sessions = await DoctorSession.find({ doctorId: req.user._id });
        res.render('doctor/dashboard', { sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.bookSession = async (req, res) => {
    // Implement the logic to book a session
    res.send('Book a session functionality for doctor');
};

exports.updateCertifications = async (req, res) => {
    // Implement the logic to update certifications
    res.send('Update certifications functionality for doctor');
};

