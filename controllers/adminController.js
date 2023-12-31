// adminController.js
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const DoctorSession = require('../models/doctorSessionModel');

exports.getDashboard = async (req, res, next) => {
    try {
        // Fetch all users
        const users = await User.find();
        // Fetch all courses
        const courses = await Course.find();
        // Fetch all sessions
        const sessions = await DoctorSession.find();

        res.render('admin/dashboard', { users, courses, sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.adminCourses = async (req, res) => {
    try {
        // Fetch all courses
        const courses = await Course.find();
        res.render('admin/courses', { courses });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.adminSessions = async (req, res) => {
    try {
        // Fetch all sessions
        const sessions = await DoctorSession.find();
        res.render('admin/sessions', { sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.adminMembers = async (req, res) => {
    try {
        // Fetch all users with role 'Member'
        const members = await User.find({ role: 'Member' });
        res.render('admin/members', { members });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


