const Feedback=require("../models/feedbackModel");

exports.getIndex=(req,res,next)=>{
    res.render("pages/home",{
        user:req.session.user,
    });
};

exports.getContact=(req,res,next)=>{
    res.render("pages/contact",{
        user:req.session.user,
    });
};

exports.getFeedback=(req,res,next)=>{
    res.render("pages/feedback",{
        user:req.session.user,
    });
};

exports.postFeedback=async(req,res,next)=>{
    const { name, email, rating, comments } = req.body;

    try {

        // Create a new feedback object
        const newFeedback = new Feedback({
            name,
            email,
            rating,
            comments,
        });
        // Save to the database
        await newFeedback.save();
        return res.status(201).render("feedback",{
            message:"Thanks for sharing your opinion",
            user:req.session.user,
        });


    } catch (error) {
        console.error('Error submitting feedback:', error);
        return res.status(500).json({ error: 'Feedback not submitted' });
    }
};

exports.getOnlineRes=(req,res,next)=>{
    res.render("pages/online_res",{
        user:req.session.user
    });
};

exports.getBookSession=(req,res,next)=>{
    res.redirect("/auth/login");
};

exports.getQuiz=(req,res,next)=>{
    res.redirect("/auth/login");
};

exports.getCourses=(req,res,next)=>{
    res.redirect("/auth/login");
};