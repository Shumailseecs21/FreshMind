// adminController.js
const path=require("path");

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
        const allMembers = users.filter(user => user.role === 'Member');
        const allDoctors = users.filter(user => user.role === 'Doctor');
        const absolutePath = path.resolve(__dirname,"../").replaceAll('\\','/');
        console.log(absolutePath);
        res.render('pages/dashboard', { absolutePath:absolutePath,user:req.user,users, courses, sessions ,allMembers,allDoctors,allCourses:courses,allSessions:sessions});

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


