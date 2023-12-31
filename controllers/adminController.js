// adminController.js
const path=require("path");

const User = require('../models/userModel');
const Course = require('../models/courseModel');
const DoctorSession = require('../models/doctorSessionModel');
const CourseContent = require('../models/courseContentModel');
const {ObjectId} = require("mongodb");

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

exports.getCourses = async (req, res) => {
    try {
        // Fetch all courses
        const courses = await Course.find();
        res.render('pages/courses', { courses ,user:req.user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.postCourses = async (req, res) => {
    try {
        const { name, description, range } = req.body;

        // Create a new course
        const newCourse = await Course.create({
            name,
            description,
            range,
        });

        // Get the user ID from the session or wherever it's stored
        const userId = req.user._id; // Replace with your actual user ID retrieval logic

        // Find the user and push the new course to the courses array
        const user = await User.findById(userId);
        user.courses.push(newCourse._id);

        // Save the updated user with the new course
        await user.save();

        try {
            // Fetch all users
            const users = await User.find();
            // Fetch all courses
            const courses = await Course.find();
            // Fetch all sessions
            const sessions = await DoctorSession.find();
            const allMembers = users.filter(user => user.role === 'Member');
            const allDoctors = users.filter(user => user.role === 'Doctor');

            console.log(absolutePath);
            res.render('pages/dashboard', {user:req.user,users, courses, sessions ,allMembers,allDoctors,allCourses:courses,allSessions:sessions});

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getCourseContent = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        // Find the course by ID and populate the courseContent array
        const course = await Course.findById(courseId).populate('courseContent');

        if (!course) {
            return res.status(404).send('Course not found');
        }

        // Render the course content page with the retrieved course data
        res.render('pages/courseContent', { course,user:req.user,courseContent:course.courseContent });
    } catch (error) {
        console.error(error);

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


