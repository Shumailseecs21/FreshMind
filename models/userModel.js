//all users with roles

const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const certificationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Doctor', 'Member'],
        required: true
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    docSessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DoctorSession',
        }
    ],
    certifications:certificationSchema,
    bio:{
        type:String
    }
});

module.exports=mongoose.model("User",userSchema);
