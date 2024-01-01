// doctorController.js
const DoctorSession = require('../models/doctorSessionModel');

exports.getDashboard = async (req, res) => {
    try {
        // Fetch all sessions for the logged-in doctor
        const sessions = await DoctorSession.find({ doctorId: req.user._id }).populate("doctorId");
        res.render('pages/dashboard', { sessions ,user:req.user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getSession = async (req, res) => {
    try {
        // Fetch all sessions for the logged-in doctor
        const sessions = await DoctorSession.find({ doctorId: req.user._id });
        console.log(sessions);
        res.render('pages/book_session', { sessions ,user:req.user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.postSession=async (req,res)=>{
    try {
        // Extract session details from the form
        const { name, shift, description, picture } = req.body;

        // Create a new session
        const newSession = new DoctorSession({
            name,
            shift,
            description,
            picture: { path: picture },
            doctorId: req.user._id, // Assuming your DoctorSession model has a field named doctorId
        });

        // Save the session to the database
        await newSession.save();

        // Update the user's docSessions array
        req.user.docSessions.push(newSession);
        await req.user.save();

        // Redirect to the sessions page or any other appropriate page
        try {
            // Fetch all sessions for the logged-in doctor
            const sessions = await DoctorSession.find({ doctorId: req.user._id });
            console.log("ok");
            res.render('pages/dashboard', { sessions, user: req.user });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        // Handle errors and render an error page
        res.render('error', { error });
    }
}



