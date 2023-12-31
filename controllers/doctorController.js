// doctorController.js
const DoctorSession = require('../models/doctorSessionModel');

exports.getDashboard = async (req, res) => {
    try {
        // Fetch all sessions for the logged-in doctor
        const sessions = await DoctorSession.find({ doctorId: req.user._id });
        res.render('pages/dashboard', { sessions ,user:req.user});
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

